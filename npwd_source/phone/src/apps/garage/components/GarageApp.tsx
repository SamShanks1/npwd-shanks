import React from 'react';
import { AppWrapper } from '@ui/components';
import { AppContent } from '@ui/components/AppContent';
import { AppTitle } from '@ui/components/AppTitle';
import { useApp } from '@os/apps/hooks/useApps';
import { VehicleListContainer } from './VehicleListContainer'; 

export const GarageApp: React.FC = () => {
  const garage = useApp('GARAGE');
  return (
      <AppWrapper id="garage-app">
        <AppTitle app={garage} />
        <AppContent>
          <VehicleListContainer/>
        </AppContent>
      </AppWrapper>
  );
};
