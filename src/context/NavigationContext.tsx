import React, { createContext, useContext, useState, useEffect } from 'react';

export type PageRoute = 'home' | 'about' | 'services' | 'work' | 'projects' | 'contact' | 'privacy-policy' | 'terms' | 'thank-you' | 'working-with-us';

interface NavigationContextType {
  currentPage: PageRoute;
  setCurrentPage: (page: PageRoute) => void;
  navigate: (page: PageRoute) => void;
}

const NavigationContext = createContext<NavigationContextType | undefined>(undefined);

function resolveRouteFromUrl(): PageRoute {
  // Check pathname first (e.g. /privacy-policy, /terms, /thank-you, /working-with-us)
  const pathname = window.location.pathname.replace(/^\//, '').toLowerCase();
  if (pathname === 'working-with-us' || pathname === 'workingwithus') return 'working-with-us';
  if (pathname === 'thank-you' || pathname === 'thankyou' || pathname === 'thanks') return 'thank-you';
  if (pathname === 'privacy-policy' || pathname === 'privacy') return 'privacy-policy';
  if (pathname === 'terms' || pathname === 'terms-and-conditions') return 'terms';
  if (pathname === 'about') return 'about';
  if (pathname === 'services') return 'services';
  if (pathname === 'work' || pathname === 'projects') return 'work';
  if (pathname === 'contact') return 'contact';

  // Check hash (e.g. #/thank-you, #thank-you, #/working-with-us)
  const hash = window.location.hash.replace(/^#\/?/, '').toLowerCase();
  if (hash === 'working-with-us' || hash === 'workingwithus') return 'working-with-us';
  if (hash === 'thank-you' || hash === 'thankyou' || hash === 'thanks') return 'thank-you';
  if (hash === 'privacy-policy' || hash === 'privacy') return 'privacy-policy';
  if (hash === 'terms' || hash === 'terms-and-conditions') return 'terms';
  if (hash === 'about') return 'about';
  if (hash === 'services') return 'services';
  if (hash === 'work' || hash === 'projects') return 'work';
  if (hash === 'contact') return 'contact';
  if (hash === 'home') return 'home';

  return 'home';
}

export const NavigationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentPage, setCurrentPage] = useState<PageRoute>(resolveRouteFromUrl);

  const navigate = (page: PageRoute) => {
    setCurrentPage(page);
    window.location.hash = page === 'home' ? '' : page;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    const handleUrlChange = () => {
      setCurrentPage(resolveRouteFromUrl());
    };

    window.addEventListener('hashchange', handleUrlChange);
    window.addEventListener('popstate', handleUrlChange);
    return () => {
      window.removeEventListener('hashchange', handleUrlChange);
      window.removeEventListener('popstate', handleUrlChange);
    };
  }, []);

  return (
    <NavigationContext.Provider value={{ currentPage, setCurrentPage, navigate }}>
      {children}
    </NavigationContext.Provider>
  );
};

export const useNavigation = () => {
  const context = useContext(NavigationContext);
  if (!context) {
    throw new Error('useNavigation must be used within a NavigationProvider');
  }
  return context;
};
