import React, { FC, useEffect } from 'react';

import './Notification.css';

export enum Types {
  Success = 'success',
  Error = 'error'
}

type Props = {
  type: Types;
  message: string;
  onClose: () => void;
};

export const Notification: FC<Props> = ({
  type,
  message,
  onClose
}): JSX.Element => {
  const cl = ['notification'];
  cl.push(type);

  useEffect(() => {
    if (message) {
      setTimeout(onClose, 3000);
    }
  }, [message, onClose]);

  return (
    <div className={cl.join(' ')}>
      <span className="notification__close" onClick={onClose}>
        &#10006;
      </span>
      <div className="notification__title">{message}</div>
    </div>
  );
};
