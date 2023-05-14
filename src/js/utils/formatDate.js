export const formatDate = (rawDate) => {
    const date = new Date(rawDate) 

    const day = date.getDay().toString().padStart(2, '0')
    const month = date.getMonth().toString().padStart(2, '0')
    const year = date.getFullYear()

    return month + "/" + day + "/"  + year
}

