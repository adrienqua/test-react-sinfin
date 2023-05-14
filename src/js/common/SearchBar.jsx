const SearchBar = ({ handleSearchChange, handleSearchSubmit }) => {
    return (
        <form className="d-flex mb-3">
            <input
                className="form-control me-1"
                type="search"
                placeholder="Search for a Fullname (eg: Jon Snow)"
                aria-label="Search"
                onChange={(e) => handleSearchChange(e)}
            />
            <button
                className="btn btn-primary"
                type="submit"
                onClick={(e) => handleSearchSubmit(e)}
            >
                Search
            </button>
        </form>
    )
}

export default SearchBar
