import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import ActorService from '../../../services/actorService';


function AdminEditActor() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState('');
    const [name, setName] = useState('');
    const [arabicName, setArabicName] = useState('');
    const [photo, setPhoto] = useState('');
    const [biography, setBiography] = useState('');
    const [birthDate, setBirthDate] = useState('');
    const [birthPlace, setBirthPlace] = useState('');
    const [socialMedia, setSocialMedia] = useState({
        instagram: '',
        twitter: '',
        facebook: ''
    });

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
                setLoading(true);
                // Charger l'acteur à éditer
                const actor = await ActorService.getActorById(id);
                console.log('Article chargé:', actor);
                if (!actor) {
                    setError('لم يتم العثور على الممثل');
                    return;
                }
                setActor(actor);
                console.log('État actor après setActor:', actor);

            } catch (error) {
                setError('فشل في تحميل البيانات');
                console.error('Error fetching news:', error);
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
            await ActorService.updateActor(actor.id, actor);
            navigate('/admin/actors');
        } catch (error) {
            setError('فشل في تحديث بيانات الممثل');
        } finally {
            setSaving(false);
        }
    };

    if (loading) return <div className="text-center py-8">جاري التحميل...</div>;

    return (
        <div className="max-w-3xl mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">تعديل بيانات الممثل</h1>
            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                    {error}
                </div>
            )}
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-gray-700 mb-2">الاسم</label>
                    <input
                        type="text"
                        value={actor.name}
                        onChange={(e) => setActor({ ...actor, name: e.target.value })}
                        className="w-full p-2 border rounded"
                        required
                    />
                </div>
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