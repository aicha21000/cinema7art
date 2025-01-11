// ActorCard.js
import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

export default function ActorCard({ actor }) {
    return (
        <Link to={`/actors/${actor._id}`}>
            <div className="actor-card">
                <img src={actor.image} alt={actor.name} />
                <h3>{actor.name}</h3>
            </div>
        </Link>
    );
}