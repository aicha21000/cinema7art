import { useState } from 'react';
import GuessMovieService from '../../src/services/guess-movie-service';
import { useRouter } from 'next/router';

export default function AdminAddMovie() {
    const [title, setTitle] = useState('');
    const [scenes, setScenes] = useState(['']);
    const [hints, setHints] = useState(['']);
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const movieData = { title, scenes, hints };

        try {
            await GuessMovieService.addGuessMovie(movieData);
            alert('Film ajouté avec succès');
            router.push('/admin/games'); // Redirige vers la page de gestion des jeux
        } catch (error) {
            console.error('Erreur lors de l\'ajout du film:', error);
            alert('Erreur lors de l\'ajout du film');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label className="block text-sm font-medium text-gray-700">Titre</label>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
                    required
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700">Scènes</label>
                {scenes.map((scene, index) => (
                    <input
                        key={index}
                        type="text"
                        value={scene}
                        onChange={(e) => {
                            const newScenes = [...scenes];
                            newScenes[index] = e.target.value;
                            setScenes(newScenes);
                        }}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm mb-2"
                        required
                    />
                ))}
                <button type="button" onClick={() => setScenes([...scenes, ''])} className="text-blue-500">Ajouter une scène</button>
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700">Indices</label>
                {hints.map((hint, index) => (
                    <input
                        key={index}
                        type="text"
                        value={hint}
                        onChange={(e) => {
                            const newHints = [...hints];
                            newHints[index] = e.target.value;
                            setHints(newHints);
                        }}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm mb-2"
                        required
                    />
                ))}
                <button type="button" onClick={() => setHints([...hints, ''])} className="text-blue-500">Ajouter un indice</button>
            </div>
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Ajouter le film</button>
        </form>
    );
}