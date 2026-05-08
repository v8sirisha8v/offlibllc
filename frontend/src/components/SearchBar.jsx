export default function SearchBar({ query, setQuery, isLoading, onSearch }) {
    return (
        <div className="mb-3">
            <label htmlFor="book-search" className="visually-hidden">
                Search books
            </label>

            <div className="position-relative">
                <input
                    id="book-search"
                    type="search"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && onSearch()}
                    placeholder="Search by title or author..."
                    className="form-control form-control-lg pe-5 shadow-sm rounded-3"
                    aria-label="Search books by title or author"
                />

                {/* Search button (icon) */}
                <button
                    type="button"
                    onClick={onSearch}
                    disabled={isLoading}
                    className="btn p-0 border-0 bg-transparent position-absolute top-50 end-0 translate-middle-y me-3"
                    aria-label="Search"
                >
                    {isLoading ? (
                        <div
                            className="spinner-border spinner-border-sm text-secondary"
                            role="status"
                        >
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    ) : (
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            fill="currentColor"
                            className="bi bi-search text-muted"
                            viewBox="0 0 16 16"
                        >
                            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                        </svg>
                    )}
                </button>
            </div>
        </div>
    );
}
