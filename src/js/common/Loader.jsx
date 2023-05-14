import React, { useState, useEffect } from "react"

const Loader = (props) => {
    
    return (
        <div className="loader container text-center">
            <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>  
        </div>              
    )
}

export default Loader