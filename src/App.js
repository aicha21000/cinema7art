import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Actors from './pages/Actors';
import Movies from './pages/Movies';
import Games from './pages/games';
import News from './pages/News';
import Privacy from './pages/Privacy';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Carousel from './components/Carousel';
import NewReleases from './pages/NewReleases';
import CookieConsent from './components/CookieConsent';
import NewsDetails from './pages/NewsDetails';
import NewsComponent from './pages/NewsComponent';
import ActorDetails from './pages/ActorDetails';
import MovieDetails from './pages/MovieDetails';
import GameSection from './components/game-section';
import GuessScene from './components/games/guess-scene';
import MovieQuiz from './components/games/movie-quiz';
import MovieQuotes from './components/games/movie-quotes';
import TriviaChallenge from './components/games/trivia-challenge';

import Dashboard from './pages/admin/dashboard';
import Login from './pages/admin/login';
import AdminMovies from './pages/admin/movies';
import AdminActors from './pages/admin/actors';
import EditActor from './pages/admin/actors/edit-actor';  
import addActor from './pages/admin/actors/add-actor';
import AdminNews from './pages/admin/news';
import EditNews from './pages/admin/news/edit-news';
import AddNews from './pages/admin/news/add-news';
import Search from './pages/Search';

import './index.css';

function App() {
  return (
    <div className="rtl">
      <Router>
        <Navbar />
        <div className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/carousel" element={<Carousel />} />
            <Route path="/actors" element={<Actors />} />
            <Route path="/movies" element={<Movies />} />
            <Route path="/games" element={<Games />} />
            <Route path="/news" element={<News />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/new-releases" element={<NewReleases />} />
            <Route path="/news/:id" element={<NewsDetails />} />
            <Route path="/news-component" element={<NewsComponent />} />
            <Route path="/actors/:name" element={<ActorDetails />} />
            <Route path="/movies/:id" element={<MovieDetails />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/news" element={<News />} />
            <Route path="/actors" element={<Actors />} />
            <Route path="/movies" element={<Movies />} />
            <Route path="/games" element={<Games />} />
            <Route path="/games/game-section" element={<GameSection />} />
            <Route path="/games/guess-scene" element={<GuessScene />} />
            <Route path="/games/movie-quiz" element={<MovieQuiz />} />
            <Route path="/games/movie-quotes" element={<MovieQuotes />} />
            <Route path="/games/trivia-challenge" element={<TriviaChallenge />} />
            <Route path="/admin/login" element={<Login />} />
            <Route path="/admin/dashboard" element={<Dashboard />} />
            <Route path="/admin/movies" element={<AdminMovies />} />
            <Route path="/admin/actors" element={<AdminActors />} />
            <Route path="/admin/edit-actor/:id" element={<EditActor />} />
            <Route path="/admin/add-actor" element={<addActor />} />
            <Route path="/admin/news" element={<AdminNews />} />
            <Route path="/admin/edit-news/:id" element={<EditNews />} />
            <Route path="/admin/add-news" element={<AddNews />} />
            <Route path="/search/:query" element={<Search />} />
          </Routes>
        </div>
        <Footer />
        <CookieConsent />
      </Router>
    </div>
  );
}

export default App; 