import { useTranslation } from 'react-i18next';
import { useNotifications } from '@os/notifications/hooks/useNotifications';
import { mailInt } from '@typings/mail';
import { useApp } from '@os/apps/hooks/useApps';
import { INotification } from '@os/notifications/providers/NotificationsProvider';

const NOTIFICATION_ID = 'mail:broadcast';

export const useMailNotifications = () => {
  const { addNotificationAlert } = useNotifications();
  const { icon, notificationIcon } = useApp('MAIL');

  const setNotification = (mail: mailInt) => {

    const id = `${NOTIFICATION_ID}:${mail.mailid}`;

    const notification: INotification = {
      app: 'MAIL',
      id,
      title: 'New Mail',
      content: mail.subject,
      icon,
      notificationIcon,
    };

    addNotificationAlert(notification);
  };

  return { setNotification };
};
