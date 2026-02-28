import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

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

    return null;
};

export default ContactRedirect;
