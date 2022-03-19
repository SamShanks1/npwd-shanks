import React from 'react';
import { LoadingSpinner } from '@ui/components/LoadingSpinner';

export const MyKeys: React.FC = () => {
  return (
    <React.Suspense fallback={<LoadingSpinner />}>
      <div>keys</div>
    </React.Suspense>
  );
};
