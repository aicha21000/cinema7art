import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { FaFacebookSquare } from 'react-icons/fa';

export default function NewsCard({ news }) {
    const shareOnFacebook = () => {
        // URL de production ou URL locale pour les tests
        const baseUrl = process.env.NODE_ENV === 'production'
            ? 'https://cinema7art.com'
            : 'http://localhost:5173';

        const url = `${baseUrl}/news/${news._id}`;

        

        // Pour le développement local, on peut aussi utiliser l'URL de production
        const shareUrl = process.env.NODE_ENV === 'production'
            ? url
            : `https://cinema7art.com/news/${news._id}`;

        window.open(
            `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
            'facebook-share-dialog',
            'width=626,height=436'
        );
    };
    return (
      <Link to={`/news/${news._id}`}> 
          
            <article className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                {news.image && (
                    <div className="aspect-video">
                        <img
                            src={news.image}
                            alt={news.arabicTitle}
                            className="w-full h-full object-cover"
                            loading="lazy"
                        />
                    </div>
                )}
                <div className="p-4">
                    <div className="flex items-center justify-between mb-2">
                        <span className={`px-2 py-1 rounded text-sm ${news.reliability === 'reliable'
                            ? 'bg-green-100 text-green-800'
                            : news.reliability === 'unconfirmed'
                                ? 'bg-yellow-100 text-yellow-800'
                                : 'bg-red-100 text-red-800'
                            }`}>
                            {news.reliability === 'reliable' ? 'موثوق'
                                : news.reliability === 'unconfirmed' ? 'غير مؤكد'
                                    : 'شائعة'}
                        </span>
                        <span className="text-sm text-gray-500">{news.source}</span>
                    </div>



                    <h2 className="text-xl font-bold mb-2 text-right line-clamp-2">
                        {news.arabicTitle}
                    </h2>

                    <p className="text-gray-600 mb-4 text-right line-clamp-3">
                        {news.arabicContent}
                    </p>

                    {news.isExclusive && (
                        <div className="text-blue-600 text-sm font-medium text-right mb-2">
                            حصري
                        </div>
                    )}

                    <div className="mt-4 flex justify-end">
                        <button
                            onClick={(e) => {
                                e.preventDefault();
                                shareOnFacebook();
                            }}
                            className="text-blue-600 hover:text-blue-800 flex items-center gap-2"
                            aria-label="مشاركة على فيسبوك"
                        >
                            <FaFacebookSquare size={20} />
                            <span>مشاركة</span>
                        </button>
                    </div>
                </div>
            </article>
        </Link>
    );
}

NewsCard.propTypes = {
    news: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        image: PropTypes.string,
        arabicTitle: PropTypes.string.isRequired,
        arabicContent: PropTypes.string.isRequired,
        reliability: PropTypes.string.isRequired,
        source: PropTypes.string.isRequired,
        isExclusive: PropTypes.bool,
    }).isRequired,
}; 