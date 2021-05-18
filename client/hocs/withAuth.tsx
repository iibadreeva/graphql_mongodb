import React, { useEffect, ComponentType, useState, useRef } from 'react';
import { useMutation } from '@apollo/react-hooks';

import { LOG_IN } from '@/lib/graphql/mutations/LogIn';
import {
  LogIn as LogInData,
  LogInVariables
} from '@/lib/graphql/mutations/LogIn/__generated__/LogIn';
import { NotifyType, ViewerType } from '@/lib/types';

export const initialViewer: ViewerType = {
  id: null,
  token: null,
  avatar: null,
  hasWallet: null,
  didRequest: false
};

const initialNotify: NotifyType = {
  status: false,
  type: '',
  message: ''
};

export const withAuth = <T,>(WrappedComponent: ComponentType<T>) => {
  return (props: T) => {
    const [viewer, setViewer] = useState<ViewerType>(initialViewer);
    const [notify, setNotify] = useState<NotifyType>(initialNotify);
    const [logIn, { error, loading }] = useMutation<LogInData, LogInVariables>(
      LOG_IN,
      {
        onCompleted: (data) => {
          if (data && data.logIn) {
            setViewer(data.logIn);

            if (data.logIn.token) {
              sessionStorage.setItem('token', data.logIn.token);
            } else {
              sessionStorage.removeItem('token');
            }
          }
        }
      }
    );
    const logInFef = useRef(logIn);

    useEffect(() => {
      const history = window.location.pathname;
      if (history && history !== '/login') {
        logInFef.current();
      }
    }, []);

    if (loading) {
      return (
        <div className="app">
          <div>Loading...</div>
        </div>
      );
    }
    if (error) {
      return (
        <div className="app">
          <div>Произошла ошибка</div>
        </div>
      );
    }

    return (
      <WrappedComponent
        {...props}
        notify={notify}
        viewer={viewer}
        setViewer={setViewer}
        setNotify={setNotify}
      />
    );
  };
};
