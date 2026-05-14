import React, { useEffect, useState } from 'react';

type LogoProps = React.ImgHTMLAttributes<HTMLImageElement> & {
  src: string;
  alt?: string;
};

export default function Logo({ src, alt = 'Logo', style, ...rest }: LogoProps) {
  const [isDark, setIsDark] = useState(() =>
    typeof document !== 'undefined' ? document.documentElement.classList.contains('dark') : false
  );

  useEffect(() => {
    const check = () => setIsDark(document.documentElement.classList.contains('dark'));
    const observer = new MutationObserver(check);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);

  // The source assets are white-on-transparent. We want them to appear white in dark mode
  // and dark in light mode. Apply an invert filter when NOT in dark mode.
  const filter = !isDark ? 'invert(1) brightness(0.9)' : undefined;

  return <img src={src} alt={alt} style={{ filter, ...(style as React.CSSProperties) }} {...rest} />;
}
