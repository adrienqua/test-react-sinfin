import axios from "axios"
import { apiUrl } from "./../../config"
import { formatDate } from "./../utils/formatDate"

const apiEndpoint = apiUrl + "books"

export function getBooks() {
    return axios.get(apiEndpoint + "?pageSize=50").then((response) => {
        return response.data.map((book) => {
            return {
                ...book,
                id: book.url.split("/").pop(),
            }
        })
    })
}

export function getBook(id) {
    return axios.get(apiEndpoint + "/" + id).then((response) => response.data)
}
