import React from "react"

const TableInfos = ({ title, data }) => {
    return (
        <tr>
            <th scope="row">{title}</th>
            <td>
                {data instanceof Array ? (
                    data.length === 0 || data[0] === "" ? (
                        "-"
                    ) : (
                        <ul>
                            {data.map((item) => {
                                return <li key={item}>{item}</li>
                            })}
                        </ul>
                    )
                ) : data ? (
                    data
                ) : (
                    "-"
                )}
            </td>
        </tr>
    )
}

export default TableInfos
