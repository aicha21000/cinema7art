import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import actorService from '../../services/actorService';

function AdminActors() {
    const [actors, setActors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);

    useEffect(() => {
        if (typeof searchTerm !== 'string') {
            setSearchTerm('');
        }
        fetchActors();
    }, [page, searchTerm]);

    const fetchActors = async () => {
        try {
            const response = await actorService.getAllActors();
            if (Array.isArray(response)) {
                setActors(response);
            } else {
                setError('Les données des acteurs ne sont pas au format attendu');
            }
        } catch (error) {
            setError('فشل في تحميل الممثلين');
            console.error('Error fetching actors:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('هل أنت متأكد من حذف هذا الممثل؟')) {
            try {
                await actorService.deleteActor(id);
                fetchActors();
            } catch (error) {
                setError('فشل في حذف الممثل');
            }
        }
    };

    const handleSearch = (e) => {
        e.preventDefault();
        setPage(1);
        fetchActors();
    };

    if (loading) return <div className="text-center py-8">جاري التحميل...</div>;

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold">إدارة الممثلين</h1>
                <Link className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600" to="/admin/actors/add-actor">
                    إضافة ممثل جديد
                </Link>
            </div>

            <form onSubmit={handleSearch} className="flex gap-2">
                <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="ابحث عن ممثل..."
                    className="flex-1 p-2 border rounded-md"
                />
                <button
                    type="submit"
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                    بحث
                </button>
            </form>

            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                    {error}
                </div>
            )}

            <div className="grid grid-cols-1 gap-4">
                {actors.map(actor => (
                    <div key={actor._id} className="bg-white rounded-lg shadow-md p-6">
                        <div className="flex justify-between items-start">
                            <div className="flex gap-4">
                                <img
                                    src={actor.photo}
                                    alt={actor.arabicName}
                                    className="w-24 h-24 object-cover rounded-full"
                                />
                                <div>
                                    <h2 className="text-xl font-bold mb-2">{actor.arabicName}</h2>
                                    <p className="text-gray-600">{actor.name}</p>
                                    <p className="text-gray-600">{actor.id}</p>
                                </div>
                            </div>
                            <div className="flex gap-2">
                                <Link className="text-blue-600 hover:text-blue-800" to={`/admin/edit-actor/${actor.id}`}>
                                    تعديل
                                </Link>
                                <button
                                    onClick={() => handleDelete(actor.id)}
                                    className="text-red-600 hover:text-red-800"
                                >
                                    حذف
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {actors.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                    لا يوجد ممثلون {searchTerm && 'مطابقون لبحثك'}
                </div>
            )}

            {totalPages > 1 && (
                <div className="flex justify-center gap-2 mt-8">
                    {[...Array(totalPages)].map((_, i) => (
                        <button
                            key={i}
                            onClick={() => setPage(i + 1)}
                            className={`px-4 py-2 rounded ${page === i + 1 ? 'bg-blue-600 text-white' : 'bg-gray-200'
                                }`}
                        >
                            {i + 1}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}

export default AdminActors; 