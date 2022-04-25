import React from 'react';
import { AppWrapper } from '@ui/components';
import { AppContent } from '@ui/components/AppContent';
import { Switch, Route } from 'react-router-dom';
import { MyHouses } from './houses/MyHouses';
import { MyKeys } from './keys/MyKeys';
import { AppTitle } from '@ui/components/AppTitle';
import { useApp } from '@os/apps/hooks/useApps';
import { HouseThemeProvider } from '../providers/HouseThemePrvoider';
import { NavigationBar } from './navigation/NavigationBar';
import AddHouseModal from './houses/HouseModal';
import ModalBackground from './ModalBackground';

export const HouseApp: React.FC = () => {
  const HouseApp = useApp('HOUSE');

  return (
    <HouseThemeProvider>
      <AppWrapper id="house-app">
        <AppTitle app={HouseApp} />
        <AddHouseModal/>
        <ModalBackground />
        <AppContent>
          <Switch>
            <Route path="/house" exact component={MyHouses} />
            <Route path="/house/keys" component={MyKeys} />
          </Switch>
        </AppContent>
        <NavigationBar />
      </AppWrapper>
    </HouseThemeProvider>
  );
};
