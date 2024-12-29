import { Link, useNavigate } from 'react-router-dom';

export default function AdminNavbar() {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('adminToken');
        navigate('/admin/login');
    };

    return (
        <nav className="bg-gray-800 text-white p-4">
            <div className="container mx-auto flex justify-between items-center">
                <div className="flex space-x-4">
                    <Link to="/admin" className="hover:text-gray-300">لوحة التحكم</Link>
                    <Link to="/admin/news" className="hover:text-gray-300">الأخبار</Link>
                    <Link to="/admin/news/unvalidated" className="hover:text-gray-300">
                        الأخبار غير المصادق عليها
                    </Link>
                    <Link to="/admin/movies" className="hover:text-gray-300">الأفلام</Link>
                    <Link to="/admin/actors" className="hover:text-gray-300">الممثلون</Link>
                </div>

                <button
                    onClick={handleLogout}
                    className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded"
                >
                    تسجيل الخروج
                </button>
            </div>
        </nav>
    );
} 