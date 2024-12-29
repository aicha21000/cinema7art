export default function ActorAwards({ awards }) {
    if (!awards?.length) return null;

    return (
        <div className="space-y-4">
            <h2 className="text-2xl font-bold">الجوائز</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {awards.map((award, index) => (
                    <div
                        key={index}
                        className="bg-white rounded-lg shadow-md p-4 flex items-center gap-4"
                    >
                        <span className="material-icons text-yellow-500 text-3xl">
                            emoji_events
                        </span>
                        <div>
                            <h3 className="font-bold">{award.arabicName}</h3>
                            <p className="text-sm text-gray-600">{award.year}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
} 