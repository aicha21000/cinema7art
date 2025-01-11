// Actors.js

import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle, faChevronDown, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import ActorCard from '../components/ActorCard';
import LoadingSpinner from '../components/LoadingSpinner.js';
import ErrorMessage from '../components/ErrorMessage.js';
import actorService from '../services/actorService.js';

export default function Actors() {
    const [searchParams, setSearchParams] = useSearchParams();
    const [actors, setActors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [searchTerm, setSearchTerm] = useState(searchParams.get('search') || '');
    const [openLetter, setOpenLetter] = useState(null);

    useEffect(() => {
        const fetchActors = async () => {
            try {
                const response = await actorService.searchActors(searchTerm);
                const sortedActors = response.sort((a, b) =>
                    a.name.toLowerCase().localeCompare(b.name.toLowerCase())
                );
                setActors(sortedActors);
            } catch (error) {
                setError('فشل في تحميل الممثلين');
                console.error('Error fetching actors:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchActors();

        const params = new URLSearchParams();
        if (searchTerm) params.set('search', searchTerm);
        setSearchParams(params);
    }, [searchTerm]);

    const normalizeLetter = (letter) => {
        return letter.normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .toUpperCase()
            .replace(/[ÀÁÂÃÄÅ]/, 'A')
            .replace(/[ÈÉÊË]/, 'E')
            .replace(/[ÌÍÎÏ]/, 'I')
            .replace(/[ÒÓÔÕÖØ]/, 'O')
            .replace(/[ÙÚÛÜ]/, 'U')
            .replace(/[Ý]/, 'Y');
    };

    const groupedActors = actors.reduce((groups, actor) => {
        const firstLetter = normalizeLetter(actor.name.charAt(0));
        if (!groups[firstLetter]) {
            groups[firstLetter] = [];
        }
        groups[firstLetter].push(actor);
        return groups;
    }, {});

    const toggleLetter = (letter) => {
        if (openLetter === letter) {
            setOpenLetter(null);
        } else {
            setOpenLetter(letter);
        }
    };

    if (loading) return <LoadingSpinner />;

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold">الممثلون</h1>
                <input
                    type="search"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="ابحث عن ممثل..."
                    className="p-2 border rounded-md w-64"
                />
            </div>

            {error && <ErrorMessage message={error} />}

            <div className="space-y-4">
                {Object.entries(groupedActors).map(([letter, actorGroup]) => (
                    <div key={letter} className="border rounded-lg overflow-hidden">
                        <button
                            onClick={() => toggleLetter(letter)}
                            className="w-full flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 transition-colors"
                        >
                            <h2 className="text-2xl font-bold">{letter}</h2>
                            <FontAwesomeIcon
                                icon={openLetter === letter ? faChevronDown : faChevronRight}
                                className="text-gray-500"
                            />
                        </button>

                        {openLetter === letter && (
                            <div className="p-4">
                                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                                    {actorGroup.map(actor => (
                                        <Link
                                            to={`/actors/${actor.name}`}
                                            key={actor.name}
                                            className="p-2 border rounded-md hover:bg-gray-50 transition-colors duration-200 flex flex-col items-center"
                                        >
                                            {actor.photo ? (
                                                <img
                                                    src={actor.photo}
                                                    alt={actor.name}
                                                    className="w-12 h-12 rounded-full mb-2 object-cover"
                                                    onError={(e) => {
                                                        e.target.onerror = null;
                                                        e.target.parentNode.innerHTML = '<i class="fas fa-user-circle w-12 h-12 text-gray-400 flex justify-center"></i>';
                                                    }}
                                                />
                                            ) : (
                                                <FontAwesomeIcon
                                                    icon={faUserCircle}
                                                    className="w-12 h-12 text-gray-400 mb-2"
                                                />
                                            )}
                                            <p className="text-sm text-blue-600 hover:text-blue-800">{actor.name}</p>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>

            {actors.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                    لا يوجد ممثلون {searchTerm && 'مطابقون للبحث'}
                </div>
            )}
        </div>
    );
}