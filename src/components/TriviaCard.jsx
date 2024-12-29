function TriviaCard({ trivia }) {
    return (
        <div className="bg-white rounded-lg shadow-lg p-4">
            <div className="flex items-start gap-4">
                <div className="flex-1">
                    <p className="text-gray-800 mb-2">{trivia.content}</p>
                    {trivia.source && (
                        <p className="text-sm text-gray-500">
                            المصدر: {trivia.source}
                        </p>
                    )}
                </div>
                <div className="text-sm text-blue-600">
                    {trivia.category === 'production' && 'إنتاج'}
                    {trivia.category === 'casting' && 'اختيار الممثلين'}
                    {trivia.category === 'script' && 'السيناريو'}
                    {trivia.category === 'effects' && 'المؤثرات'}
                    {trivia.category === 'other' && 'أخرى'}
                </div>
            </div>
        </div>
    );
}

export default TriviaCard; 