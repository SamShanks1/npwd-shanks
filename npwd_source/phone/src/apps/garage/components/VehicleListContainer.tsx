import React from 'react';
import { VehicleList } from './VehicleList';
import { LoadingSpinner } from '@ui/components/LoadingSpinner';

export const VehicleListContainer: React.FC = () => {
  return (
    <React.Suspense fallback={<LoadingSpinner />}>
      <VehicleList />
    </React.Suspense>
  );
};
