import React from "react"
import { Link } from "react-router-dom"

const CardListItem = ({ id, title, subtitle, type }) => {
    return (
        <div className="col-lg-4 col-md-6">
            <Link
                to={`/${type}/${id}`}
                className="character-list-item rounded-container m-0 "
            >
                <h6>{title}</h6>
                <p>
                    {subtitle instanceof Array ? subtitle[0] : subtitle}
                    {}
                </p>
            </Link>
        </div>
    )
}

export default CardListItem
