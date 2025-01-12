import { useState, useEffect } from 'react';
import GuessMovieService from '../../../../../src/services/guess-movie-service';
import { useRouter } from 'next/router';

export default function EditGuessMovie() {
    const router = useRouter();
    const { id } = router.query;
    const [title, setTitle] = useState('');
    const [scenes, setScenes] = useState(['']);
    const [hints, setHints] = useState(['']);
    const [choices, setChoices] = useState([{ text: '', isValid: false }]);
    const [imagePreview, setImagePreview] = useState('');

    useEffect(() => {
        if (id) {
            // Fetch the movie data by ID
            GuessMovieService.getGuessMovieById(id).then(data => {
                setTitle(data.title);
                setScenes(data.scenes);
                setHints(data.hints);
                setChoices(data.choices);
            }).catch(error => {
                console.error('Erreur lors de la récupération du film:', error);
            });
        }
    }, [id]);

    const handleSceneChange = (index, value) => {
        const newScenes = [...scenes];
        newScenes[index] = value;
        setScenes(newScenes);
        setImagePreview(value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const movieData = { title, scenes, hints, choices };

        try {
            await GuessMovieService.updateGuessMovie(id, movieData);
            alert('Film mis à jour avec succès');
            router.push('/admin/games'); // Redirige vers la page de gestion des jeux
        } catch (error) {
            console.error('Erreur lors de la mise à jour du film:', error);
            alert('Erreur lors de la mise à jour du film');
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
                    <div key={index} className="mb-2">
                        <input
                            type="text"
                            value={scene}
                            onChange={(e) => handleSceneChange(index, e.target.value)}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
                            required
                        />
                        {scene && (
                            <img src={scene} alt={`Aperçu de la scène ${index + 1}`} className="mt-2 max-w-xs" />
                        )}
                    </div>
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
            <div>
                <label className="block text-sm font-medium text-gray-700">Choix</label>
                {choices.map((choice, index) => (
                    <input
                        key={index}
                        type="text"
                        value={choice.text}
                        onChange={(e) => {
                            const newChoices = [...choices];
                            newChoices[index] = { ...newChoices[index], text: e.target.value };
                            setChoices(newChoices);
                        }}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm mb-2"
                        required
                    />
                ))}
                <button type="button" onClick={() => setChoices([...choices, { text: '', isValid: false }])} className="text-blue-500">Ajouter un choix</button>
            </div>
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Mettre à jour le film</button>
        </form>
    );
} 