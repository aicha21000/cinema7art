import { useState, useEffect } from 'react';
import GuessMovieService from '../../src/services/guess-movie-service';
import Link from 'next/link';

export default function Games() {
    const [games, setGames] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

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
            setGames(games.filter(game => game._id !== id));
            alert('Jeu supprimé avec succès');
        } catch (error) {
            console.error('Erreur lors de la suppression du jeu:', error);
            alert('Erreur lors de la suppression du jeu');
        }
    };

    if (loading) return <div className="text-center py-8">Chargement des jeux...</div>;

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold">إدارة الألعاب</h1>

            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                    {error}
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {games.map(game => (
                    <div key={game._id} className="bg-white rounded-lg shadow-md p-6">
                        <h2 className="text-xl font-bold mb-4">{game.title}</h2>
                        <div className="flex justify-between items-center">
                            <Link href={`/admin/games/guess-movie/edit/${game._id}`}
                                className="text-blue-500 hover:underline">تعديل
                            </Link>
                            <button
                                onClick={() => handleDelete(game._id)}
                                className="text-red-500 relative group"
                            >
                                حذف
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            <Link href="/admin/games/add"
                className="block bg-blue-500 text-white text-center py-2 rounded mt-6 hover:bg-blue-600">
                إضافة لعبة جديدة
            </Link>
        </div>
    );
}
