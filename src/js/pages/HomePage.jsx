import React, { useState, useEffect } from "react"
import TableList from "../common/TableList"
import Loader from "../common/Loader"
import { getBooks } from "../services/booksAPI"
import { formatDate } from "../utils/formatDate"
import * as echarts from "echarts"
import ReactECharts from "echarts-for-react"
import Characters from "./Characters"

const HomePage = (props) => {
    const [books, setBooks] = useState([])
    const [isLoaded, setIsLoaded] = useState(false)
    const [tableHeader, setTableHeader] = useState([
        { label: "Name", value: "name" },
        { label: "Pages", value: "numberOfPages" },
        { label: "Author", value: "authors" },
        { label: "Release date", value: "released" },
        {
            label: "",
            value: "details",
            urlPath: "/books/",
            btnLabel: "Details",
        },
    ])
    const booksTitle = books.map((book) => book.name)
    const booksPages = books.map((book) => book.numberOfPages)
    const booksCharacters = books.map((book) => ({
        value: book.characters.length,
        name: book.name,
    }))

    useEffect(() => {
        fetchBooks()
    }, [])

    /** Fetch and format the books from the API */
    const fetchBooks = async () => {
        try {
            const formatedBooks = await getBooks()

            formatedBooks.forEach((book) => {
                return (book.released = formatDate(book.released))
            })

            setBooks(formatedBooks)
            setIsLoaded(true)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="homepage text-center">
            <h1>Home</h1>
            <div className="stats d-flex">
                <ReactECharts
                    echarts={echarts}
                    option={{
                        title: {
                            text: "Number of pages by release date",
                        },
                        tooltip: {
                            trigger: "axis",
                            axisPointer: {
                                type: "shadow",
                            },
                        },
                        xAxis: {
                            type: "category",
                            data: booksTitle,
                            axisLabel: { interval: 0, rotate: 30 },
                        },
                        yAxis: {
                            type: "value",
                        },
                        series: [
                            {
                                data: booksPages,
                                type: "bar",
                            },
                        ],
                    }}
                    style={{
                        height: "450px",
                        width: "50%",
                        marginBottom: "25px",
                    }}
                />
                <ReactECharts
                    echarts={echarts}
                    option={{
                        title: {
                            text: "Number of characters per Book",
                        },
                        tooltip: {
                            trigger: "item",
                        },

                        series: [
                            {
                                type: "pie",
                                radius: ["40%", "70%"],
                                avoidLabelOverlap: false,
                                itemStyle: {
                                    borderRadius: 10,
                                    borderColor: "#fff",
                                    borderWidth: 2,
                                },
                                label: {
                                    show: false,
                                    position: "center",
                                },
                                emphasis: {
                                    label: {
                                        show: true,
                                        fontSize: 20,
                                        fontWeight: "bold",
                                    },
                                },
                                labelLine: {
                                    show: true,
                                },
                                data: booksCharacters,
                            },
                        ],
                    }}
                    style={{
                        height: "450px",
                        width: "50%",
                        marginBottom: "25px",
                    }}
                />
            </div>
            {!isLoaded ? (
                <Loader />
            ) : (
                <TableList headerDatas={tableHeader} datas={books} />
            )}
        </div>
    )
}

export default HomePage
