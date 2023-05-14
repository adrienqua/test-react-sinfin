import React, { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import Loader from "../common/Loader"
import TableInfos from "../common/TableInfos"
import { getHouse } from "../services/houseAPI"
import CardListItem from "../common/CardListItem"
import { getCharacter } from "../services/charactersAPI"

const HouseDetails = (props) => {
    const navigate = useNavigate()
    const { id } = useParams()
    const [house, setHouse] = useState([])
    const [characters, setCharacters] = useState([])
    const [charactersRange, setCharactersRange] = useState({})
    const [isLoaded, setIsLoaded] = useState({
        house: false,
        characters: false,
    })

    useEffect(() => {
        fetchHouse()
    }, [])

    useEffect(() => {
        fetchCharacters()
    }, [house])

    /** Fetch a house from the API */
    const fetchHouse = async () => {
        try {
            setHouse(await getHouse(id))
            setIsLoaded((prevState) => ({ ...prevState, house: true }))
        } catch (error) {
            console.log(error)
        }
    }

    /** Fetch characters from the  API */
    const fetchCharacters = async (start = 0, end = 5) => {
        try {
            const promises = house.swornMembers
                .slice(start, end)
                .map((character) => getCharacter(character.split("/").pop()))

            Promise.all(promises).then((response) => {
                setCharacters([...characters].concat(response))
            })

            setCharactersRange({ start: end + 1, end: end + 24 })
            setIsLoaded((prevState) => ({ ...prevState, characters: true }))
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div>
            {!isLoaded.house || !isLoaded.characters ? (
                <Loader />
            ) : (
                <>
                    <div className="house-details text-center ">
                        <button
                            onClick={() => navigate(-1)}
                            className="btn btn-light"
                        >
                            Back
                        </button>
                        <div className="house-title">
                            <h1>{house.name}</h1>
                        </div>
                        <div className="table-infos row col-md-6 d-flex mx-auto">
                            <table className="table rounded-container">
                                <tbody>
                                    <TableInfos
                                        title="Region"
                                        data={house.region}
                                    />
                                    <TableInfos
                                        title="Coat of arms"
                                        data={house.coatOfArms}
                                    />
                                    <TableInfos
                                        title="Words"
                                        data={house.words}
                                    />
                                    <TableInfos
                                        title="Titles"
                                        data={house.titles}
                                    />
                                    <TableInfos
                                        title="Seats"
                                        data={house.seats}
                                    />
                                    <TableInfos
                                        title="Ancestral Weapons"
                                        data={house.ancestralWeapons}
                                    />
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className="house-members text-center">
                        <h3>House's members & Vassals </h3>
                        <div className="row g-2 d-flex">
                            {characters.map((house) => (
                                <CardListItem
                                    id={house.id}
                                    title={house.name}
                                    subtitle={house.coatOfArms}
                                    key={house.id}
                                    type="characters"
                                />
                            ))}
                            {house.swornMembers.length > charactersRange.end ? (
                                <div className="load-more">
                                    <button
                                        onClick={() =>
                                            fetchCharacters(
                                                charactersRange.start,
                                                charactersRange.end
                                            )
                                        }
                                        className="btn btn-primary"
                                    >
                                        Load More
                                    </button>
                                </div>
                            ) : (
                                ""
                            )}
                        </div>
                    </div>
                </>
            )}
        </div>
    )
}

export default HouseDetails
