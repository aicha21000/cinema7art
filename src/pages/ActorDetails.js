import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import actorService from '../services/actorService.js';
import LoadingSpinner from '../components/LoadingSpinner.js';
import ErrorMessage from '../components/ErrorMessage.js';


function ActorDetails() {
    const { name } = useParams();
    const [actor, setActor] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchActor = async () => {
            try {
                const actorData = await actorService.getActor(decodeURIComponent(name));
                setActor(actorData);
            } catch (error) {
                setError('فشل في تحميل بيانات الممثل');
                console.error('Error fetching actor:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchActor();
    }, [name]);

    if (loading) return <LoadingSpinner />;
    if (!actor) return <ErrorMessage message="لم يتم العثور على الممثل" />;

    return (
        <div className="max-w-6xl mx-auto space-y-8">
            <div className="md:flex gap-8">
                <div className="md:w-1/3">
                    {actor.photo ? (
                        <img
                            src={actor.photo}
                            alt={actor.name}
                            className="w-full rounded-lg shadow-lg"
                            onError={(e) => {
                                e.target.onerror = null;
                                e.target.style.display = 'none';
                                e.target.parentNode.innerHTML = '<div class="w-full aspect-[2/3] flex items-center justify-center bg-gray-100 rounded-lg shadow-lg"><i class="fas fa-user-circle text-8xl text-gray-400"></i></div>';
                            }}
                        />
                    ) : (
                        <div className="w-full aspect-[2/3] flex items-center justify-center bg-gray-100 rounded-lg shadow-lg">
                            <FontAwesomeIcon
                                icon={faUserCircle}
                                className="text-8xl text-gray-400"
                            />
                        </div>
                    )}
                </div>
                <div className="md:w-2/3 space-y-4">
                    <h1 className="text-3xl font-bold">{actor.name}</h1>
                    {actor.birthDate && (
                        <p className="text-gray-600">
                            تاريخ الميلاد: {new Date(actor.birthDate).toLocaleDateString('ar-EG')}
                        </p>
                    )}
                    {actor.birthPlace && (
                        <p className="text-gray-600">
                            مكان الميلاد: {actor.birthPlace}
                        </p>
                    )}
                    <div className="prose max-w-none">
                        <p className="whitespace-pre-line">{actor.biography}</p>
                    </div>
                </div>
            </div>


        </div>
    );
}

export default ActorDetails; 