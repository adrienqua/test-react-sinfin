import axios from "axios"
import { apiUrl } from "./../../config"

const apiEndpoint = apiUrl + "characters"

export function getCharacters(page, name = "", params = "") {
    return axios
        .get(
            apiEndpoint + "?page=" + page + "&pageSize=10&name=" + name + params
        )
        .then((response) => {
            response.data = response.data.map((character) => {
                return {
                    ...character,
                    id: character.url.split("/").pop(),
                }
            })
            return response
        })
}

export function getCharacter(id) {
    return axios.get(apiEndpoint + "/" + id).then((response) => {
        response.data.id = response.data.url.split("/").pop()

        return response.data
    })
}
