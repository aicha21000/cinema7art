import { useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

function AdminLayout({ children }) {
    const navigate = useNavigate();
    const location = useLocation();
    const adminToken = localStorage.getItem('adminToken');

    useEffect(() => {
        if (!adminToken && location.pathname !== '/admin/login') {
            navigate('/admin/login');
        }
    }, [adminToken, navigate, location]);

    const menuItems = [
        { path: '/admin/dashboard', label: 'لوحة التحكم', icon: 'dashboard' },
        { path: '/admin/movies', label: 'الأفلام', icon: 'movie' },
        { path: '/admin/actors', label: 'الممثلون', icon: 'person' },
        { path: '/admin/news', label: 'الأخبار', icon: 'article' }
    ];

    const handleLogout = () => {
        localStorage.removeItem('adminToken');
        navigate('/admin/login');
    };

    if (!adminToken && location.pathname !== '/admin/login') {
        return null;
    }

    return (
        <div className="min-h-screen flex">
            {/* Sidebar */}
            <aside className="w-64 bg-gray-800 text-white">
                <div className="p-4">
                    <h1 className="text-xl font-bold">لوحة الإدارة</h1>
                </div>
                <nav className="mt-4">
                    {menuItems.map(item => (
                        <Link
                            key={item.path}
                            to={item.path}
                            className={`flex items-center gap-3 px-4 py-3 hover:bg-gray-700 ${location.pathname === item.path ? 'bg-gray-700' : ''
                                }`}
                        >
                            <span className="material-icons">{item.icon}</span>
                            {item.label}
                        </Link>
                    ))}
                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-700 text-red-400 hover:text-red-300"
                    >
                        <span className="material-icons">logout</span>
                        تسجيل الخروج
                    </button>
                </nav>
            </aside>

            {/* Main content */}
            <main className="flex-1 p-8 bg-gray-100">
                {children}
            </main>
        </div>
    );
}

export default AdminLayout; 