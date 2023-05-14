import React, { useState, useEffect } from "react"
import TableList from "../common/TableList"
import Loader from "../common/Loader"
import { getCharacters } from "../services/charactersAPI"
import { formatDate } from "../utils/formatDate"
import Pagination from "../common/Pagination"
import SearchBar from "../common/SearchBar"
import Filters from "../common/Filters"

const Characters = (props) => {
    const [characters, setCharacters] = useState([])
    const [isLoaded, setIsLoaded] = useState(false)
    const [numberOfPages, setNumberOfPages] = useState(0)
    const [currentPage, setCurrentPage] = useState(1)
    const [pages, setPages] = useState([])
    const [formData, setFormData] = useState("")
    const [filter, setFilter] = useState({
        isAlive: "&isAlive=false",
        gender: "",
    })
    const [tableHeader, setTableHeader] = useState([
        { label: "Name", value: "name" },
        { label: "Gender", value: "gender" },
        { label: "Played by", value: "playedBy" },
        { label: "Titles", value: "titles" },
        {
            label: "",
            value: "details",
            urlPath: "/characters/",
            btnLabel: "Details",
        },
    ])

    useEffect(() => {
        fetchCharacters(currentPage)
    }, [])

    /** Fetch the characters from the API */
    const fetchCharacters = async (page, name = "", params = "") => {
        try {
            const datas = await getCharacters(page, name, params)
            const header = datas.headers.link
                .replace(/rel=|[^a-zA-Z0-9:./?&=, ]/g, "")
                .split(",")

            //get page count from header
            let lastIndex = header.pop()
            lastIndex = parseInt(lastIndex.split("page=")[1].match(/\d+/)[0])
            setNumberOfPages(lastIndex)

            setCurrentPage(page)

            const firstPage = page - 5 > 0 ? page - 5 : 1
            const lastPage = page + 5 > lastIndex ? lastIndex + 1 : page + 5
            setPages([...Array(lastPage).keys()].slice(firstPage))

            setCharacters(datas.data)
            setIsLoaded(true)
        } catch (error) {
            console.log(error)
        }
    }

    const handleSearchChange = (e) => {
        setFormData(e.target.value)
        if (e.target.value.length === 0) {
            fetchCharacters(1)
        }
    }
    const handleSearchSubmit = (e) => {
        e.preventDefault()
        fetchCharacters(1, formData)
    }

    const handleFilter = (e) => {
        let filterData = { ...filter }
        if (e.target.id === "isAlive") {
            filterData["isAlive"] = "&isAlive=" + e.target.checked
        }
        if (e.target.id === "gender") {
            filterData["gender"] = "&gender=" + e.target.value
        }
        setFilter(filterData)
    }

    const handleSubmitFilter = (e) => {
        let filterString = Object.values(filter).join("")
        fetchCharacters(1, "", filterString)
    }

    const handleRemoveFilter = (e) => {
        fetchCharacters(1, "", "")
    }

    return (
        <div className="homepage text-center">
            <h1>Characters</h1>
            {!isLoaded ? (
                <Loader />
            ) : (
                <>
                    <SearchBar
                        handleSearchChange={handleSearchChange}
                        handleSearchSubmit={handleSearchSubmit}
                    />
                    <Filters
                        handleFilter={handleFilter}
                        handleSubmitFilter={handleSubmitFilter}
                        handleRemoveFilter={handleRemoveFilter}
                    />
                    <TableList headerDatas={tableHeader} datas={characters} />
                    <Pagination
                        pages={pages}
                        fetchData={fetchCharacters}
                        currentPage={currentPage}
                        numberOfPages={numberOfPages}
                    />
                </>
            )}
        </div>
    )
}

export default Characters
