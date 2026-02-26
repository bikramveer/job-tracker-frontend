import { useState } from "react";
import './SearchBar.css';

function SearchBar({ onSearch, onClear }) {
    const [searchType, setSearchType] = useState('all');
    const [searchValue, setSearchValue] = useState('');

    const handleSearch = (e) => {
        e.preventDefault();

        if (searchType === 'all') {
            onClear();
            return;
        }

        onSearch(searchType, searchValue);
    };

    const handleClear = () => {
        setSearchType('all');
        setSearchValue('');
        onClear();
    };

    return (
        <div className="search-bar">
            <form onSubmit={handleSearch}>
                <div className="search-controls">
                    <select
                        value={searchType}
                        onChange={(e) => {
                            setSearchType(e.target.value);
                            if (e.target.value === 'all') {
                                handleClear();
                            }
                        }}
                        className="search-type"
                    >
                        <option value='all'>All Applications</option>
                        <option value='status'>Filter by Status</option>
                        <option value='company'>Search by Company</option>
                        <option value='position'>Search by Position</option>
                    </select>

                    {searchType === 'status' && (
                        <select
                            value={searchValue}
                            onChange={(e) => setSearchValue(e.target.value)}
                            className="search-input"
                        >
                            <option value=''>Select status...</option>
                            <option value='APPLIED'>Applied</option>
                            <option value='PHONE_SCREEN'>Phone Screen</option>
                            <option value='INTERVIEW'>Interview</option>
                            <option value='TECHNICAL_ASSESSMENT'>Technical Assessment</option>
                            <option value='OFFER'>Offer</option>
                            <option value='WITHDRAWN'>Withdrawn</option>
                            <option value='REJECTED'>Rejected</option>
                            <option value='ACCEPTED'>Accepted</option>
                        </select>
                    )}

                    {(searchType === 'company' || searchType === 'position') && (
                        <input
                            type="text"
                            value={searchValue}
                            onChange={(e) => setSearchValue(e.target.value)}
                            placeholder={`Enter ${searchType}...`}
                            className="search-input"
                        />
                    )}

                    {searchType !== 'all' && (
                        <>
                            <button type="submit" className="btn btn-primary">
                                Search
                            </button>
                            <button type="button" className="btn btn-secondary" onClick={handleClear}>
                                Clear
                            </button>
                        </>
                    )}
                </div>
            </form>
        </div>
    );
}

export default SearchBar;