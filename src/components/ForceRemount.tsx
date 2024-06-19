import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ForceRemount: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();

  useEffect(() => {
    // Empty effect to force re-render on location change
  }, [location.pathname]);

  return <>{children}</>;
};
