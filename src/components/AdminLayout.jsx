import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminNavbar from './AdminNavbar';

export default function AdminLayout({ children }) {
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('adminToken');
        if (!token) {
            navigate('/admin/login');
        }
    }, [navigate]);

    return (
        <div className="min-h-screen bg-gray-100">
            <AdminNavbar />
            <main className="container mx-auto px-4 py-8">
                {children}
            </main>
        </div>
    );
} 