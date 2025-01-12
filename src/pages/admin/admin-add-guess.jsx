// client/pages/admin/AdminAddGuess.jsx
import { useState } from 'react';
import axios from 'axios';

export default function AdminAddGuess() {
    const [title, setTitle] = useState('');
    const [scenes, setScenes] = useState(['']);
    const [hints, setHints] = useState(['']);

    const handleAddScene = () => setScenes([...scenes, '']);
    const handleAddHint = () => setHints([...hints, '']);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('/api/guess/add', { title, scenes, hints });
            alert('Jeu ajouté avec succès');
        } catch (error) {
            console.error('Erreur lors de l\'ajout du jeu:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Titre du film" required />
            {scenes.map((scene, index) => (
                <input key={index} type="text" value={scene} onChange={(e) => {
                    const newScenes = [...scenes];
                    newScenes[index] = e.target.value;
                    setScenes(newScenes);
                }} placeholder="URL de la scène" required />
            ))}
            <button type="button" onClick={handleAddScene}>Ajouter une scène</button>
            {hints.map((hint, index) => (
                <input key={index} type="text" value={hint} onChange={(e) => {
                    const newHints = [...hints];
                    newHints[index] = e.target.value;
                    setHints(newHints);
                }} placeholder="Indice" required />
            ))}
            <button type="button" onClick={handleAddHint}>Ajouter un indice</button>
            <button type="submit">Ajouter le jeu</button>
        </form>
    );
}