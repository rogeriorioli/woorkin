import React from 'react';

import NotificationContainer from './styles';

interface NotificationsProps {
  background?: string;
  message: string;
}

const Notifications = ({ background, message }: NotificationsProps) => {
  return (
    <NotificationContainer background={background}>
      {message}
    </NotificationContainer>
  );
};

export default Notifications;
