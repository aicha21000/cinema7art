import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';

function SearchBar({ darkMode = false }) {
    const [query, setQuery] = useState('');
    const navigate = useNavigate();
    const location = useLocation();
    const [isFocused, setIsFocused] = useState(false);
    const [isRTL, setIsRTL] = useState(false);

    // Déterminer si le texte est en RTL (ex. : arabe, hébreu)
    useEffect(() => {
        const htmlDir = document.documentElement.getAttribute('dir');
        setIsRTL(htmlDir === 'rtl');
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (query.trim()) {
            const searchPath = `/search/${encodeURIComponent(query.trim())}`;
                navigate(searchPath);
                window.location.reload();
        }
        setQuery('');
    };

    return (
        <form
            role="search"
            onSubmit={handleSubmit}
            className={`flex items-center relative transition-all duration-300 ${isFocused ? 'ring-2 ring-blue-400' : ''}`}
        >
            <label htmlFor="search" className="sr-only">بحث</label>
            <input
                id="search"
                type="search"
                name="search"
                aria-label="بحث عن الأفلام والممثلين"
                placeholder="ابحث عن الأفلام والممثلين..."
                className={`w-full ${isRTL ? 'pl-4 pr-10' : 'pl-10 pr-4'} py-2 rounded-lg ${isFocused ? 'ring-2' : ''} text-black`}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
            />
            <button
                type="submit"
                className={`absolute ${isRTL ? 'right-3' : 'left-3'} text-gray-500 hover:text-blue-600 transition-colors duration-300`}
                aria-label="بحث"
            >
                <FaSearch className="w-4 h-4" />
            </button>
        </form>
    );
}

export default SearchBar; 