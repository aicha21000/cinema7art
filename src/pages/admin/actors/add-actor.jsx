import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import actorService from '../../../services/actorService';

function AdminAddActor() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [actor, setActor] = useState({
        name: '',
        arabicName: '',
        photo: '',
        biography: '',
        birthDate: '',
        birthPlace: '',
        movies: [],
        awards: [],
        socialMedia: {
            instagram: '',
            twitter: '',
            facebook: ''
        }
    });

    const handleAwardAdd = () => {
        setActor({
            ...actor,
            awards: [...actor.awards, { arabicName: '', year: '' }]
        });
    };

    const handleAwardChange = (index, field, value) => {
        const updatedAwards = [...actor.awards];
        updatedAwards[index][field] = value;
        setActor({ ...actor, awards: updatedAwards });
    };

    const handleAwardRemove = (index) => {
        const updatedAwards = actor.awards.filter((_, i) => i !== index);
        setActor({ ...actor, awards: updatedAwards });
    };

    const handleSocialMediaChange = (platform, value) => {
        setActor({
            ...actor,
            socialMedia: {
                ...actor.socialMedia,
                [platform]: value
            }
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            await actorService.addActor(actor);
            navigate('/admin/actors');
        } catch (error) {
            setError('فشل في إضافة الممثل');
            console.error('Error adding actor:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-3xl mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">إضافة ممثل جديد</h1>
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
                        className="w-full p-2 border rounded h-32"
                        required
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                        <label className="block text-gray-700 mb-2">تاريخ الميلاد</label>
                        <input
                            type="date"
                            value={actor.birthDate}
                            onChange={(e) => setActor({ ...actor, birthDate: e.target.value })}
                            className="w-full p-2 border rounded"
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 mb-2">مكان الميلاد</label>
                        <input
                            type="text"
                            value={actor.birthPlace}
                            onChange={(e) => setActor({ ...actor, birthPlace: e.target.value })}
                            className="w-full p-2 border rounded"
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 mb-2">صورة الممثل</label>
                        <input
                            type="url"
                            value={actor.photo}
                            onChange={(e) => setActor({ ...actor, photo: e.target.value })}
                            className="w-full p-2 border rounded"
                            required
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-gray-700 mb-2">الجوائز</label>
                    <div className="space-y-4">
                        {actor.awards.map((award, index) => (
                            <div key={index} className="flex gap-4 items-start">
                                <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <input
                                        type="text"
                                        value={award.name}
                                        onChange={(e) => handleAwardChange(index, 'name', e.target.value)}
                                        placeholder="اسم الجائزة بالإنجليزية"
                                        className="p-2 border rounded"
                                    />
                                    <input
                                        type="text"
                                        value={award.arabicName}
                                        onChange={(e) => handleAwardChange(index, 'arabicName', e.target.value)}
                                        placeholder="اسم الجائزة بالعربية"
                                        className="p-2 border rounded"
                                    />
                                    <input
                                        type="number"
                                        value={award.year}
                                        onChange={(e) => handleAwardChange(index, 'year', parseInt(e.target.value))}
                                        placeholder="السنة"
                                        className="p-2 border rounded"
                                        min="1900"
                                        max={new Date().getFullYear()}
                                    />
                                </div>
                                <button
                                    type="button"
                                    onClick={() => handleAwardRemove(index)}
                                    className="text-red-600 hover:text-red-800"
                                >
                                    حذف
                                </button>
                            </div>
                        ))}
                        <button
                            type="button"
                            onClick={handleAwardAdd}
                            className="text-blue-600 hover:text-blue-800"
                        >
                            + إضافة جائزة
                        </button>
                    </div>
                </div>

                <div>
                    <label className="block text-gray-700 mb-2">وسائل التواصل الاجتماعي</label>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div>
                            <label className="block text-gray-600 text-sm mb-1">Instagram</label>
                            <input
                                type="text"
                                value={actor.socialMedia.instagram}
                                onChange={(e) => handleSocialMediaChange('instagram', e.target.value)}
                                className="w-full p-2 border rounded"
                                placeholder="معرف Instagram"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-600 text-sm mb-1">Twitter</label>
                            <input
                                type="text"
                                value={actor.socialMedia.twitter}
                                onChange={(e) => handleSocialMediaChange('twitter', e.target.value)}
                                className="w-full p-2 border rounded"
                                placeholder="معرف Twitter"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-600 text-sm mb-1">Facebook</label>
                            <input
                                type="text"
                                value={actor.socialMedia.facebook}
                                onChange={(e) => handleSocialMediaChange('facebook', e.target.value)}
                                className="w-full p-2 border rounded"
                                placeholder="معرف Facebook"
                            />
                        </div>
                    </div>
                </div>

                <div className="flex justify-end space-x-4">
                    <button
                        type="button"
                        onClick={() => router.push('/admin/actors')}
                        className="px-4 py-2 text-gray-600 hover:text-gray-800"
                    >
                        إلغاء
                    </button>
                    <button
                        type="submit"
                        disabled={loading}
                        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:bg-blue-300"
                    >
                        {loading ? 'جاري الإضافة...' : 'إضافة الممثل'}
                    </button>
                </div>
            </form>
        </div>
    );
}

export default AdminAddActor; 