import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

// Client-side fallback only — production traffic never reaches this
// component because vercel.json 301-redirects /contact to /#contact at the
// edge. It stays as a safety net for hosts/environments that skip that
// server-level redirect (e.g. `vite preview`, other static hosts).
const ContactRedirect = () => {
    const navigate = useNavigate();

    useEffect(() => {
        // Navigate to home first with hash
        navigate('/#contact', { replace: true });

        // Wait for page to load then scroll
        const scrollTimer = setTimeout(() => {
            const el = document.getElementById('contact');
            if (el) {
                el.scrollIntoView({ behavior: 'smooth' });
            }
        }, 800);

        return () => clearTimeout(scrollTimer);
    }, [navigate]);

    return (
        <Helmet>
            {/* Never a canonical destination in its own right — keep it out of the index. */}
            <meta name="robots" content="noindex, follow" />
        </Helmet>
    );
};

export default ContactRedirect;
