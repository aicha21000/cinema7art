import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';

function SearchBar({ darkMode = false }) {
    const navigate = useNavigate();
    const [query, setQuery] = useState('');
    const [isFocused, setIsFocused] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (query.trim()) {
            navigate(`/search/${encodeURIComponent(query.trim())}`);
        }
    };

    return (
        <form
            role="search"
            onSubmit={handleSubmit}
            className={`flex items-center relative transition-all duration-300 ${isFocused ? 'ring-2 ring-blue-400' : ''
                }`}
        >
            <label htmlFor="search" className="sr-only">بحث</label>
            <input
                id="search"
                type="search"
                name="search"
                aria-label="بحث عن الأفلام والممثلين"
                placeholder="ابحث عن الأفلام والممثلين..."
                className={`w-full px-4 py-2 rounded-lg ${darkMode
                        ? 'bg-gray-800 text-white placeholder-gray-400 border border-gray-700'
                        : 'bg-white text-gray-900 placeholder-gray-500 border border-gray-300'
                    }`}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
            />
            <button
                type="submit"
                className={`absolute left-3 rtl:left-auto rtl:right-3 ${darkMode
                        ? 'text-gray-400 hover:text-blue-400'
                        : 'text-gray-500 hover:text-blue-600'
                    } transition-colors duration-300`}
                aria-label="بحث"
            >
                <FaSearch className="w-4 h-4" />
            </button>
        </form>
    );
}

export default SearchBar; 