import React, { FC, useEffect, useRef } from 'react';
import { Redirect } from 'react-router-dom';
import { useApolloClient, useMutation } from '@apollo/react-hooks';

import { ViewerType, NotifyType } from '@/lib/types';
import { AUTH_URL } from '@/lib/graphql/queries/AuthUrl';
import { LOG_IN } from '@/lib/graphql/mutations/LogIn';
import { AuthUrl as AuthUrlData } from '@/lib/graphql/queries/AuthUrl/__generated__/AuthUrl';
import {
  LogIn as LogInData,
  LogInVariables
} from '@/lib/graphql/mutations/LogIn/__generated__/LogIn';
import { Types } from '@/components/Notification';

import logo from './images/google_logo.jpg';
import './Login.css';

type Props = {
  setViewer: (viewer: ViewerType) => void;
  setNotify: (notify: NotifyType) => void;
};

export const Login: FC<Props> = ({ setViewer, setNotify }) => {
  const client = useApolloClient();
  const [logIn, { data: logInData, loading: LogInLoading, error: logInError }] =
    useMutation<LogInData, LogInVariables>(LOG_IN, {
      onCompleted: (data) => {
        if (data?.logIn?.token) {
          setViewer(data.logIn);

          setNotify({
            status: true,
            type: Types.Success,
            message: 'Успешно залогинились'
          });
        }
      }
    });
  const logInRef = useRef(logIn);

  const handleAuth = async () => {
    try {
      const { data } = await client.query<AuthUrlData>({
        query: AUTH_URL
      });
      window.location.href = data.authUrl;
    } catch (_e) {
      setNotify({
        status: true,
        type: Types.Error,
        message: 'Ошибка, попробйте позденее'
      });
    }
  };

  useEffect(() => {
    const code = new URL(window.location.href).searchParams.get('code');

    if (code) {
      logInRef.current({
        variables: {
          input: { code }
        }
      });
    }
  }, []);

  if (logInError) {
    setNotify({
      status: true,
      type: Types.Error,
      message: 'Ошибка, попробйте позденее'
    });
  }

  if (LogInLoading) {
    return <div>...loading</div>;
  }

  if (logInData && logInData.logIn) {
    const { id: viewerId } = logInData.logIn;
    return <Redirect to={`/profile/${viewerId}`} />;
  }

  return (
    <aside>
      <div className="log-in">
        <h3 className="log-in__title">Вход</h3>
        <button className="log-in__button">
          <img className="log-in__button__img" src={logo} alt="" />
          <span className="log-in__button__text" onClick={handleAuth}>
            Войти через Google
          </span>
        </button>
        <p className="log-in__info">Вход с помощью Google аккаунт</p>
      </div>
    </aside>
  );
};
