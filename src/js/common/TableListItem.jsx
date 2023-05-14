import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"

const TableListItem = ({ data, headerDatas }) => {
    return (
        <tr className="book-list-item">
            {headerDatas.map((column) => (
                <td scope="col">
                    {
                        //format array
                        data[`${column.value}`] instanceof Array ? (
                            data[`${column.value}`][0] === "" ? (
                                "-"
                            ) : (
                                <ul>
                                    {data[`${column.value}`].map((item) => {
                                        return <li key={item}>{item}</li>
                                    })}
                                </ul>
                            )
                        ) : (
                            //show content
                            <>
                                {column.value === "details" ? (
                                    <Link
                                        to={`${column.urlPath}${data.id}`}
                                        className="btn btn-primary"
                                    >
                                        {column.btnLabel}
                                    </Link>
                                ) : data[`${column.value}`] ? (
                                    data[`${column.value}`]
                                ) : (
                                    "-"
                                )}
                            </>
                        )
                    }
                </td>
            ))}
        </tr>
    )
}

export default TableListItem
