import { Link } from 'react-router-dom';
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube } from 'react-icons/fa';

export default function Footer() {
    const currentYear = new Date().getFullYear();

    const sections = [
        {
            title: 'روابط سريعة',
            links: [
                { label: 'الرئيسية', path: '/' },
                { label: 'الأفلام', path: '/movies' },
                { label: 'الممثلون', path: '/actors' },
                { label: 'أحدث الأفلام', path: '/new-releases' }
            ]
        },

        {
            title: 'معلومات',
            links: [
                { label: 'من نحن', path: '/about' },
                { label: 'اتصل بنا', path: '/contact' },
                { label: 'الخصوصية', path: '/privacy' },
                { label: 'الشروط والأحكام', path: '/terms' }
            ]
        }
    ];

    const socialLinks = [
        {
            icon: <FaFacebookF />,
            path: '#',
            label: 'Facebook',
            hoverClass: 'hover:text-[#4267B2]'
        },
        {
            icon: <FaTwitter />,
            path: '#',
            label: 'Twitter',
            hoverClass: 'hover:text-[#1DA1F2]'
        },
        {
            icon: <FaInstagram />,
            path: '#',
            label: 'Instagram',
            hoverClass: 'hover:text-[#E4405F]'
        },
        {
            icon: <FaYoutube />,
            path: '#',
            label: 'Youtube',
            hoverClass: 'hover:text-[#FF0000]'
        }
    ];

    return (
        <footer className="bg-black text-white py-8">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {sections.map((section, index) => (
                        <div key={index} className="mb-6 md:mb-0">
                            <h3 className="text-xl font-bold mb-4 text-blue-500">
                                {section.title}
                            </h3>
                            <nav>
                                <ul role="list" className="space-y-2">
                                    {section.links.map((link, linkIndex) => (
                                        <li key={linkIndex} role="listitem">
                                            <Link className={`transition-colors duration-300 hover:text-blue-500`} to={link.path}>
                                                {link.label}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </nav>
                        </div>
                    ))}
                </div>

                {/* Réseaux sociaux */}
                <div className="flex justify-center gap-6 mt-8">
                    {socialLinks.map((social, index) => (
                        <a
                            key={index}
                            href={social.path}
                            className={`text-white text-xl transition-colors duration-300 ${social.hoverClass}`}
                            aria-label={social.label}
                        >
                            {social.icon}
                        </a>
                    ))}
                </div>

                {/* Copyright */}
                <div className="text-center mt-8 text-sm text-gray-400">
                    <p> جميع الحقوق محفوظة © {currentYear}</p>
                </div>
            </div>
        </footer>
    );
} 