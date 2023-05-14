const Filters = ({ handleFilter, handleSubmitFilter, handleRemoveFilter }) => {
    return (
        <div className="filters mb-4">
            <h3>Filters</h3>
            <div className="form-check form-switch  d-inline-block px-2">
                <input
                    className="form-check-input"
                    type="checkbox"
                    id="isAlive"
                    onClick={(e) => handleFilter(e)}
                />
                <label className="form-check-label" htmlFor="isAlive">
                    Is alive
                </label>
            </div>
            <div className="d-inline-block px-2">
                <select
                    className="form-select"
                    id="gender"
                    onChange={(e) => handleFilter(e)}
                >
                    <option value="">Select a gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                </select>
            </div>
            <button
                className="btn btn-primary mx-2"
                onClick={() => handleSubmitFilter()}
            >
                Apply filters
            </button>
            <button
                className="btn btn-primary mx-2"
                onClick={() => handleRemoveFilter()}
            >
                Remove filters
            </button>
        </div>
    )
}

export default Filters
