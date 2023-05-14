import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"

const TableHeader = ({data}) => {

    return (
            <th scope="col">{data.label}</th>
    )
}

export default TableHeader;