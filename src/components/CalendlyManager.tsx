import React, { useEffect } from 'react';
import { useNavigation } from '../context/NavigationContext';
import { initCalendlyBadge, setCalendlyBadgeVisibility } from '../utils/calendly';

export const CalendlyManager: React.FC = () => {
  const { currentPage } = useNavigation();

  useEffect(() => {
    initCalendlyBadge();
  }, []);

  useEffect(() => {
    // Show badge widget on hero page (home), contact page, and service page
    const isTargetPage =
      currentPage === 'home' ||
      currentPage === 'contact' ||
      currentPage === 'services';

    setCalendlyBadgeVisibility(isTargetPage);
  }, [currentPage]);

  return null;
};
