import React, { useEffect } from 'react';
import { AppWrapper } from '@ui/components';
import { AppContent } from '@ui/components/AppContent';
import { AppTitle } from '@ui/components/AppTitle';
import { useApp } from '@os/apps/hooks/useApps';
import MailList from './list/MailList';
import { MailModal } from './modal/MailModal';
import { MailThemeProvider } from './providers/MailThemeProvider';
import { Route } from 'react-router-dom';
import { useSetModalVisible, useSetSelectedMail } from './hooks/state';
import { LoadingSpinner } from '@ui/components/LoadingSpinner';
import { useQueryParams } from '@common/hooks/useQueryParams';
import { AddMailExportData } from '@typings/mail';

export const MailApp: React.FC = () => {
  const mailApp = useApp('MAIL');
  const SetSelectedMail = useSetSelectedMail();
  const setModalVisible = useSetModalVisible();

  const { subject, message } = useQueryParams<AddMailExportData>({ subject: '', message: '' });

  useEffect(() => {
    // Althought this interface kinda blows for readability,
    // whenever we have
    if (subject || message) {
      setModalVisible(true);
      SetSelectedMail({ subject, message });
    } else {
      setModalVisible(false);
      SetSelectedMail(null);
    }
  }, [setModalVisible, subject, message, SetSelectedMail]);

  return (
    <MailThemeProvider>
      <AppWrapper id="mail-app">
        <AppTitle app={mailApp} />
        <MailModal />
        <AppContent>
          <React.Suspense fallback={<LoadingSpinner />}>
            <Route path="/mail" component={MailList} />
          </React.Suspense>
        </AppContent>

      </AppWrapper>
    </MailThemeProvider>
  );
};
