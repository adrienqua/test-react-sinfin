const Pagination = ({ pages, fetchData, currentPage, numberOfPages }) => {
    return (
        <ul className="pagination justify-content-center">
            <li onClick={() => fetchData(1)} className="btn btn-light mx-1">
                First
            </li>
            {pages.map((page) => (
                <li
                    key={page}
                    onClick={() => fetchData(page)}
                    className={`btn btn-light mx-1 ${
                        page === currentPage && " active"
                    }`}
                >
                    {page}
                </li>
            ))}
            <li
                onClick={() => fetchData(numberOfPages)}
                className="btn btn-light mx-1"
            >
                Last
            </li>
        </ul>
    )
}

export default Pagination
