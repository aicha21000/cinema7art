import { useState, useEffect } from 'react';
import GuessMovieService from '../../../../src/services/guess-movie-service';
import { useRouter } from 'next/router';
import { FaPlus, FaSave } from 'react-icons/fa';

import Link from 'next/link';


export default function AddGuessMovie() {

    const [games, setGames] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [title, setTitle] = useState('');
    const [scenes, setScenes] = useState(['']);
    const [hints, setHints] = useState(['']);
    const [choices, setChoices] = useState([{ text: '', isValid: false }]);
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const movieData = { title, scenes, hints, choices };

        try {
            await GuessMovieService.addGuessMovie(movieData);
            alert('Film ajouté avec succès');
            router.push('/admin/games'); // Redirige vers la page de gestion des jeux
        } catch (error) {
            console.error('Erreur lors de l\'ajout du film:', error);
            alert('Erreur lors de l\'ajout du film');
        }
    };

    const handleChoiceChange = (index, field, value) => {
        const newChoices = [...choices];
        newChoices[index][field] = value;
        setChoices(newChoices);
    };



    useEffect(() => {
        const fetchGames = async () => {
            try {
                const data = await GuessMovieService.getAllGames();
                setGames(data);
            } catch (error) {
                setError('Erreur lors de la récupération des jeux');
                console.error('Error fetching games:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchGames();
    }, []);

    const handleDelete = async (id) => {
        try {
            await GuessMovieService.deleteGame(id);
            setGames(games.filter(game => game.id !== id));
            alert('Jeu supprimé avec succès');
        } catch (error) {
            console.error('Erreur lors de la suppression du jeu:', error);
            alert('Erreur lors de la suppression du jeu');
        }
    };

    if (loading) return <div className="text-center py-8">Chargement des jeux...</div>;

    return (
        <section className="bg-gray-100 min-h-screen">

            <div className="max-w-2xl mx-auto py-8 px-4">
                <h1 className="text-2xl font-bold mb-6 text-center"> إضافة فيلم جديد</h1>
                <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-lg shadow-md">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">العنوان</label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">اللقطات</label>
                        {scenes.map((scene, index) => (
                            <div key={index} className="flex items-center mb-2">
                                <input
                                    type="text"
                                    value={scene}
                                    onChange={(e) => {
                                        const newScenes = [...scenes];
                                        newScenes[index] = e.target.value;
                                        setScenes(newScenes);
                                    }}
                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                    required
                                />
                                <button type="button" onClick={() => setScenes([...scenes, ''])} className="ml-2 text-blue-500">
                                    <FaPlus />
                                </button>
                            </div>
                        ))}
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">مساعدة</label>
                        {hints.map((hint, index) => (
                            <div key={index} className="flex items-center mb-2">
                                <input
                                    type="text"
                                    value={hint}
                                    onChange={(e) => {
                                        const newHints = [...hints];
                                        newHints[index] = e.target.value;
                                        setHints(newHints);
                                    }}
                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                    required
                                />
                                <button type="button" onClick={() => setHints([...hints, ''])} className="ml-2 text-blue-500">
                                    <FaPlus />
                                </button>
                            </div>
                        ))}
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">الاختيارات</label>
                        {choices.map((choice, index) => (
                            <div key={index} className="flex items-center mb-2">
                                <input
                                    type="text"
                                    value={choice.text}
                                    onChange={(e) => handleChoiceChange(index, 'text', e.target.value)}
                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                    required
                                />
                                <input
                                    type="checkbox"
                                    checked={choice.isValid}
                                    onChange={(e) => handleChoiceChange(index, 'isValid', e.target.checked)}
                                    className="ml-2"
                                />
                                <button type="button" onClick={() => setChoices([...choices, { text: '', isValid: false }])} className="ml-2 text-blue-500">
                                    <FaPlus />
                                </button>
                            </div>
                        ))}
                    </div>
                    <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-blue-600">
                        <FaSave />
                        إضافة الفيلم
                    </button>
                </form>
            </div>
            <div className="space-y-6">
                <h1 className="text-3xl font-bold">إدارة الأفلام</h1>

                {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                        {error}
                    </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {games.map(game => (
                        <div key={game.id} className="bg-white rounded-lg shadow-md p-6">
                            <h2 className="text-xl font-bold mb-4">{game.title}</h2>
                            <div className="flex justify-between items-center">
                                <Link href={`/admin/games/guess-movie/edit/${game._id}`}
                                    className="text-blue-500 hover:underline">تعديل
                                </Link>
                                <button
                                    onClick={() => handleDelete(game.id)}
                                    className="text-red-500 hover:underline"
                                >
                                    حذف
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                <Link href="/admin/games/add"
                    className="block bg-blue-500 text-white text-center py-2 rounded mt-6 hover:bg-blue-600">
                    Ajouter un Nouveau Jeu

                </Link>
            </div>
        </section>
    );






} 