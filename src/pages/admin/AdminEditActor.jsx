import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

function AdminEditActor() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState('');
    const [actor, setActor] = useState({
        name: '',
        arabicName: '',
        photo: '',
        biography: '',
        birthDate: '',
        birthPlace: '',
        socialMedia: {
            instagram: '',
            twitter: '',
            facebook: ''
        }
    });

    useEffect(() => {
        const fetchActor = async () => {
            try {
                const token = localStorage.getItem('adminToken');
                const response = await axios.get(`/api/actors/${id}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });

                // Formater la date pour l'input date
                const actorData = response.data;
                if (actorData.birthDate) {
                    actorData.birthDate = new Date(actorData.birthDate).toISOString().split('T')[0];
                }

                setActor(actorData);
            } catch (error) {
                setError('فشل في تحميل بيانات الممثل');
            } finally {
                setLoading(false);
            }
        };

        fetchActor();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);
        setError('');

        try {
            const token = localStorage.getItem('adminToken');
            await axios.put(`/api/actors/${id}`, actor, {
                headers: { Authorization: `Bearer ${token}` }
            });
            navigate('/admin/actors');
        } catch (error) {
            setError(error.response?.data?.message || 'حدث خطأ في تحديث بيانات الممثل');
        } finally {
            setSaving(false);
        }
    };

    if (loading) return <div className="text-center py-8">جاري التحميل...</div>;

    return (
        <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold mb-6">تعديل بيانات الممثل</h1>

            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                    {error}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-gray-700 mb-2">الاسم بالعربية</label>
                        <input
                            type="text"
                            value={actor.arabicName}
                            onChange={(e) => setActor({ ...actor, arabicName: e.target.value })}
                            className="w-full p-2 border rounded"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 mb-2">الاسم بالإنجليزية</label>
                        <input
                            type="text"
                            value={actor.name}
                            onChange={(e) => setActor({ ...actor, name: e.target.value })}
                            className="w-full p-2 border rounded"
                            required
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-gray-700 mb-2">السيرة الذاتية</label>
                    <textarea
                        value={actor.biography}
                        onChange={(e) => setActor({ ...actor, biography: e.target.value })}
                        className="w-full p-2 border rounded"
                        rows="4"
                        required
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-gray-700 mb-2">تاريخ الميلاد</label>
                        <input
                            type="date"
                            value={actor.birthDate || ''}
                            onChange={(e) => setActor({ ...actor, birthDate: e.target.value })}
                            className="w-full p-2 border rounded"
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 mb-2">مكان الميلاد</label>
                        <input
                            type="text"
                            value={actor.birthPlace || ''}
                            onChange={(e) => setActor({ ...actor, birthPlace: e.target.value })}
                            className="w-full p-2 border rounded"
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-gray-700 mb-2">رابط الصورة</label>
                    <input
                        type="url"
                        value={actor.photo}
                        onChange={(e) => setActor({ ...actor, photo: e.target.value })}
                        className="w-full p-2 border rounded"
                        required
                    />
                </div>

                <div className="space-y-4">
                    <h3 className="text-lg font-semibold">وسائل التواصل الاجتماعي</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                            <label className="block text-gray-700 mb-2">Instagram</label>
                            <input
                                type="url"
                                value={actor.socialMedia?.instagram || ''}
                                onChange={(e) => setActor({
                                    ...actor,
                                    socialMedia: { ...actor.socialMedia, instagram: e.target.value }
                                })}
                                className="w-full p-2 border rounded"
                            />
                        </div>

                        <div>
                            <label className="block text-gray-700 mb-2">Twitter</label>
                            <input
                                type="url"
                                value={actor.socialMedia?.twitter || ''}
                                onChange={(e) => setActor({
                                    ...actor,
                                    socialMedia: { ...actor.socialMedia, twitter: e.target.value }
                                })}
                                className="w-full p-2 border rounded"
                            />
                        </div>

                        <div>
                            <label className="block text-gray-700 mb-2">Facebook</label>
                            <input
                                type="url"
                                value={actor.socialMedia?.facebook || ''}
                                onChange={(e) => setActor({
                                    ...actor,
                                    socialMedia: { ...actor.socialMedia, facebook: e.target.value }
                                })}
                                className="w-full p-2 border rounded"
                            />
                        </div>
                    </div>
                </div>

                <div className="flex justify-end space-x-4">
                    <button
                        type="button"
                        onClick={() => navigate('/admin/actors')}
                        className="px-4 py-2 text-gray-600 hover:text-gray-800"
                    >
                        إلغاء
                    </button>
                    <button
                        type="submit"
                        disabled={saving}
                        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:bg-blue-300"
                    >
                        {saving ? 'جاري الحفظ...' : 'حفظ التغييرات'}
                    </button>
                </div>
            </form>
        </div>
    );
}

export default AdminEditActor; 