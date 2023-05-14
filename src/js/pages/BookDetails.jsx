import React, { useState, useEffect } from "react"
import { getBook } from "../services/booksAPI"
import { useParams, useNavigate } from "react-router-dom"
import Loader from "../common/Loader"
import TableInfos from "../common/TableInfos"
import { formatDate } from "../utils/formatDate"
import { getCharacter } from "./../services/charactersAPI"
import CardListItem from "../common/CardListItem"

const BookDetails = (props) => {
    const navigate = useNavigate()
    const { id } = useParams()
    const [book, setBook] = useState([])
    const [characters, setCharacters] = useState([])
    const [charactersRange, setCharactersRange] = useState({})
    const [isLoaded, setIsLoaded] = useState({
        book: false,
        characters: false,
    })

    useEffect(() => {
        fetchBook()
    }, [])

    useEffect(() => {
        fetchCharacters()
    }, [book])

    /** Fetch and format a book from the API */
    const fetchBook = async () => {
        try {
            const formatedBook = await getBook(id)
            formatedBook.released = formatDate(formatedBook.released)

            setBook(formatedBook)
            setIsLoaded((prevState) => ({ ...prevState, book: true }))
        } catch (error) {
            console.log(error)
        }
    }

    /** Fetch characters from the  API */
    const fetchCharacters = async (start = 0, end = 5) => {
        try {
            const promises = book.characters
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
            {!isLoaded.book || !isLoaded.characters ? (
                <Loader />
            ) : (
                <>
                    <div className="book-details text-center ">
                        <button
                            onClick={() => navigate(-1)}
                            className="btn btn-light"
                        >
                            Back
                        </button>
                        <div className="book-title">
                            <h1>{book.name}</h1>
                        </div>
                        <div className="table-infos row col-md-6 d-flex mx-auto">
                            <table className="table rounded-container">
                                <tbody>
                                    <TableInfos title="Isbn" data={book.isbn} />
                                    <TableInfos
                                        title="Authors"
                                        data={book.authors}
                                    />
                                    <TableInfos
                                        title="Pages"
                                        data={book.numberOfPages}
                                    />
                                    <TableInfos
                                        title="Publisher"
                                        data={book.publisher}
                                    />
                                    <TableInfos
                                        title="Country"
                                        data={book.country}
                                    />
                                    <TableInfos
                                        title="Type"
                                        data={book.mediaType}
                                    />
                                    <TableInfos
                                        title="Release date"
                                        data={book.released}
                                    />
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className="book-characters text-center">
                        <h3>Characters</h3>
                        <div className="row g-2 d-flex">
                            {characters.map((character) => (
                                <CardListItem
                                    id={character.id}
                                    title={character.name}
                                    subtitle={character.titles}
                                    key={character.id}
                                    type="characters"
                                />
                            ))}
                            {book.characters.length > charactersRange.end ? (
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

export default BookDetails
