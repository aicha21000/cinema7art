export default function ActorSocial({ socialMedia }) {
    if (!Object.values(socialMedia).some(value => value)) return null;

    const socialLinks = [
        {
            platform: 'instagram',
            icon: 'photo_camera',
            color: 'text-pink-600 hover:text-pink-700',
            url: id => `https://instagram.com/${id}`
        },
        {
            platform: 'twitter',
            icon: 'chat',
            color: 'text-blue-400 hover:text-blue-500',
            url: id => `https://twitter.com/${id}`
        },
        {
            platform: 'facebook',
            icon: 'thumb_up',
            color: 'text-blue-600 hover:text-blue-700',
            url: id => `https://facebook.com/${id}`
        }
    ];

    return (
        <div className="flex justify-center gap-4">
            {socialLinks.map(({ platform, icon, color, url }) => (
                socialMedia[platform] && (
                    <a
                        key={platform}
                        href={url(socialMedia[platform])}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={color}
                    >
                        <span className="material-icons">{icon}</span>
                    </a>
                )
            ))}
        </div>
    );
} 