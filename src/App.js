import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import AdminLayout from './components/admin/AdminLayout';
import Home from './pages/Home';
import Movies from './pages/Movies';
import MovieDetails from './pages/MovieDetails';
import TopMovies from './pages/TopMovies';
import NewReleases from './pages/NewReleases';
import Search from './pages/Search';
import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminMovies from './pages/admin/AdminMovies';
import AdminAddMovie from './pages/admin/AdminAddMovie';
import AdminEditMovie from './pages/admin/AdminEditMovie';
import AdminActors from './pages/admin/AdminActors';
import AdminAddActor from './pages/admin/AdminAddActor';
import AdminEditActor from './pages/admin/AdminEditActor';
import AdminNews from './pages/admin/AdminNews';
import AdminAddNews from './pages/admin/AdminAddNews';
import AdminEditNews from './pages/admin/AdminEditNews';

function App() {
    return (
        <Router>
            <Routes>
                {/* Public routes */}
                <Route
                    path="/*"
                    element={
                        <div dir="rtl" className="min-h-screen bg-gray-100">
                            <Navbar />
                            <main className="container mx-auto px-4 py-8">
                                <Routes>
                                    <Route path="/home" element={<Home />} />
                                    <Route path="/movies" element={<Movies />} />
                                    <Route path="/movies/:id" element={<MovieDetails />} />
                                    <Route path="/top-movies" element={<TopMovies />} />
                                    <Route path="/new-releases" element={<NewReleases />} />
                                    <Route path="/search/:query" element={<Search />} />
                                </Routes>
                            </main>
                        </div>
                    }
                />

                {/* Admin routes */}
                <Route path="/admin/login" element={<AdminLogin />} />
                <Route
                    path="/admin/*"
                    element={
                        <AdminLayout>
                            <Routes>
                                <Route path="dashboard" element={<AdminDashboard />} />
                                <Route path="movies" element={<AdminMovies />} />
                                <Route path="movies/add" element={<AdminAddMovie />} />
                                <Route path="movies/edit/:id" element={<AdminEditMovie />} />
                                <Route path="actors" element={<AdminActors />} />
                                <Route path="actors/add" element={<AdminAddActor />} />
                                <Route path="actors/edit/:id" element={<AdminEditActor />} />
                                <Route path="news" element={<AdminNews />} />
                                <Route path="news/add" element={<AdminAddNews />} />
                                <Route path="news/edit/:id" element={<AdminEditNews />} />
                            </Routes>
                        </AdminLayout>
                    }
                />
            </Routes>
        </Router>
    );
}

export default App; 