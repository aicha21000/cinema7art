import { Link, useLocation } from 'react-router-dom';
import SearchBar from './SearchBar';
import cinemaLogo from '../assets/cinema-logo.png';

export default function Navbar() {
    const location = useLocation();

    const links = [
        { path: '/', label: 'الرئيسية' },
        { path: '/movies', label: 'الأفلام' },
        { path: '/actors', label: 'الممثلون' },
        { path: '/news', label: 'الأخبار' },
        { path: '/new-releases', label: 'أحدث الأفلام' },
        { path: '/games', label: 'ألعاب وتحديات' }
    ];

    return (
        <nav
            role="navigation"
            aria-label="Navigation principale"
            className="bg-black text-white shadow-md"
        >
            <div className="max-w-7xl mx-auto px-4">
                <div className="flex justify-between items-center h-20">
                    {/* Logo et Titre */}
                    <Link
                        to="/"
                        className="flex items-center space-x-3 rtl:space-x-reverse"
                        aria-label="الصفحة الرئيسية"
                    >
                        <div className="group relative">
                            {/* Effets lumineux */}
                            <div className="absolute inset-0 bg-blue-500 rounded-full blur-xl opacity-40"></div>
                            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-blue-400 rounded-full opacity-30"></div>
                            {/* Container du logo */}
                            <div className="relative bg-gradient-to-tr from-black via-gray-900 to-gray-800 p-1 rounded-full flex items-center justify-center"
                                style={{
                                    width: '44px',
                                    height: '44px',
                                    boxShadow: 'inset 0 0 15px rgba(59, 130, 246, 0.5)'
                                }}>
                                <img
                                    src={cinemaLogo}
                                    alt="شعار سينما أمريكية"
                                    className="h-10 w-10 transition-transform duration-300 group-hover:rotate-12 relative z-10"
                                    onError={(e) => {
                                        console.error('Erreur de chargement du logo:', e);
                                        e.target.style.display = 'none';
                                        e.target.parentElement.innerHTML = '🎬';
                                    }}
                                />
                            </div>
                        </div>
                        <span className="font-bold text-2xl text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600">
                            سينما أمريكية
                        </span>
                    </Link>

                    {/* Navigation Links */}
                    <div className="hidden md:flex space-x-8 rtl:space-x-reverse">
                        {links.map(link => (
                            <Link
                                key={link.path}
                                to={link.path}
                                className={`transition-all duration-300 relative group ${location.pathname === link.path ||
                                        (link.path === '/games' && location.pathname.startsWith('/games/'))
                                        ? 'text-blue-400 font-bold'
                                        : 'text-gray-100 hover:text-blue-400'
                                    }`}
                                aria-current={location.pathname === link.path ? 'page' : undefined}
                            >
                                {link.label}
                                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-400 transition-all duration-300 group-hover:w-full"></span>
                            </Link>
                        ))}
                    </div>

                    {/* Search Bar */}
                    <div className="w-72">
                        <SearchBar darkMode={true} />
                    </div>
                </div>
            </div>
        </nav>
    );
} 