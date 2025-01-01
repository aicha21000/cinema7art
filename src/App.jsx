import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import Home from './pages/Home.jsx';
import Movies from './pages/Movies.jsx';
import MovieDetails from './pages/MovieDetails.jsx';
import TopMovies from './pages/TopMovies.jsx';
import NewReleases from './pages/NewReleases.jsx';
import Search from './pages/Search.jsx';
import Actors from './pages/Actors.jsx';
import ActorDetails from './pages/ActorDetails.jsx';
import News from './pages/News.jsx';
import NewsDetails from './pages/NewsDetails.jsx';
import Trivia from './pages/Trivia.jsx';
import AdminLogin from './pages/admin/AdminLogin.jsx';
import AdminDashboard from './pages/admin/AdminDashboard.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import AdminMovies from './pages/admin/AdminMovies.jsx';
import AdminAddMovie from './pages/admin/AdminAddMovie.jsx';
import AdminEditMovie from './pages/admin/AdminEditMovie.jsx';
import AdminActors from './pages/admin/AdminActors.jsx';
import AdminAddActor from './pages/admin/AdminAddActor.jsx';
import AdminEditActor from './pages/admin/AdminEditActor.jsx';
import AdminNews from './pages/admin/AdminNews.jsx';
import AdminAddNews from './pages/admin/AdminAddNews.jsx';
import AdminEditNews from './pages/admin/AdminEditNews.jsx';
import AdminTrivia from './pages/admin/AdminTrivia.jsx';
import AdminAddTrivia from './pages/admin/AdminAddTrivia.jsx';
import AdminEditTrivia from './pages/admin/AdminEditTrivia.jsx';
import AdminUnvalidatedNews from './pages/admin/AdminUnvalidatedNews';
import AdSpace from './components/AdSpace';
import Footer from './components/Footer';
import MovieQuiz from './pages/games/MovieQuiz';
import GuessMovie from './pages/games/GuessMovie';
import TriviaChallenge from './pages/games/TriviaChallenge';
import GameSection from './components/GameSection';
import MovieQuotes from './pages/games/MovieQuotes';
import NewsDetail from './pages/NewsDetail';
import CookieConsent from './components/CookieConsent';
import Privacy from './pages/Privacy';
import { HelmetProvider } from 'react-helmet-async';
import SEOHead from './components/SEOHead';

function App() {
    return (
        <HelmetProvider>
            <Router>
                <SEOHead
                    title="الرئيسية"
                    description="موقع عربي متخصص في السينما الأمريكية"
                    keywords="أفلام أمريكية, سينما, هوليوود, أخبار الأفلام, نقد سينمائي"
                />
                <div dir="rtl" className="min-h-screen bg-gray-100 flex flex-col">
                    <header role="banner">
                        <Navbar />
                    </header>

                    <main role="main" className="flex-grow">
                        <div className="mb-8">
                            <AdSpace size="large" provider="adsense" />
                        </div>

                        <div className="flex-1">
                            <Routes>
                                <Route path="/home" element={<Home />} />
                                <Route path="/movies" element={<Movies />} />
                                <Route path="/movies/:title" element={<MovieDetails />} />
                                <Route path="/top-movies" element={<TopMovies />} />
                                <Route path="/new-releases" element={<NewReleases />} />
                                <Route path="/search/:query" element={<Search />} />
                                <Route path="/actors" element={<Actors />} />
                                <Route path="/actors/:name" element={<ActorDetails />} />
                                <Route path="/news" element={<News />} />
                                <Route path="/news/:id" element={<NewsDetails />} />
                                <Route path="/movies/:id/trivia" element={<Trivia />} />
                                <Route path="/admin/login" element={<AdminLogin />} />
                                <Route path="/admin" element={
                                    <ProtectedRoute>
                                        <AdminDashboard />
                                    </ProtectedRoute>
                                } />
                                <Route path="/admin/movies" element={
                                    <ProtectedRoute>
                                        <AdminMovies />
                                    </ProtectedRoute>
                                } />
                                <Route path="/admin/movies/add" element={
                                    <ProtectedRoute>
                                        <AdminAddMovie />
                                    </ProtectedRoute>
                                } />
                                <Route path="/admin/movies/edit/:id" element={
                                    <ProtectedRoute>
                                        <AdminEditMovie />
                                    </ProtectedRoute>
                                } />
                                <Route path="/admin/actors" element={
                                    <ProtectedRoute>
                                        <AdminActors />
                                    </ProtectedRoute>
                                } />
                                <Route path="/admin/actors/add" element={
                                    <ProtectedRoute>
                                        <AdminAddActor />
                                    </ProtectedRoute>
                                } />
                                <Route path="/admin/actors/edit/:id" element={
                                    <ProtectedRoute>
                                        <AdminEditActor />
                                    </ProtectedRoute>
                                } />
                                <Route path="/admin/news" element={
                                    <ProtectedRoute>
                                        <AdminNews />
                                    </ProtectedRoute>
                                } />
                                <Route path="/admin/news/add" element={
                                    <ProtectedRoute>
                                        <AdminAddNews />
                                    </ProtectedRoute>
                                } />
                                <Route path="/admin/news/edit/:id" element={
                                    <ProtectedRoute>
                                        <AdminEditNews />
                                    </ProtectedRoute>
                                } />
                                <Route path="/admin/news/unvalidated" element={<AdminUnvalidatedNews />} />
                                <Route path="/admin/trivia" element={
                                    <ProtectedRoute>
                                        <AdminTrivia />
                                    </ProtectedRoute>
                                } />
                                <Route path="/admin/trivia/add" element={
                                    <ProtectedRoute>
                                        <AdminAddTrivia />
                                    </ProtectedRoute>
                                } />
                                <Route path="/admin/trivia/edit/:id" element={
                                    <ProtectedRoute>
                                        <AdminEditTrivia />
                                    </ProtectedRoute>
                                } />
                                <Route path="/games" element={<GameSection />} />
                                <Route path="/games/movie-quiz" element={<MovieQuiz />} />
                                <Route path="/games/guess-movie" element={<GuessMovie />} />
                                <Route path="/games/trivia-challenge" element={<TriviaChallenge />} />
                                <Route path="/games/movie-quotes" element={<MovieQuotes />} />
                                <Route path="/privacy" element={<Privacy />} />
                            </Routes>
                        </div>
                    </main>

                    <div className="container mx-auto px-4 py-8">
                        <AdSpace size="large" provider="propeller" />
                    </div>

                    <CookieConsent />
                    <footer role="contentinfo">
                        <Footer />
                    </footer>
                </div>
            </Router>
        </HelmetProvider>
    );
}

export default App; 