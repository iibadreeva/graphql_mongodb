import React, { FC, useState, useRef, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useMutation } from '@apollo/react-hooks';

import { LOG_OUT } from '@/lib/graphql/mutations/LogOut';
import { LogOut as LogOutData } from '@/lib/graphql/mutations/LogOut/__generated__/LogOut';
import { ViewerType, NotifyType } from '@/lib/types';
import { Types } from '@/components/Notification';
import { Dropdown, DropNavType } from '@/components/Dropdown';

import logo from './images/logo.png';
import { overLinks, userLinks } from './data';
import './Header.css';

type Props = {
  viewer: ViewerType;
  setViewer: (viewer: ViewerType) => void;
  setNotify: (notify: NotifyType) => void;
};

export const Header: FC<Props> = ({ viewer, setViewer, setNotify }) => {
  const [logOut] = useMutation<LogOutData>(LOG_OUT, {
    onCompleted: (data) => {
      if (data?.logOut) {
        setViewer(data.logOut);
        sessionStorage.removeItem('token');
        setNotify({
          status: true,
          type: Types.Success,
          message: 'Успешно разлогинились'
        });
      }
    },
    onError: () => {
      setNotify({
        status: true,
        type: Types.Error,
        message: 'Ошибка, попробйте позденее'
      });
    }
  });
  const [links, setLinks] = useState(overLinks);
  const logOutRef = useRef(logOut);

  const handleLogOUt = () => {
    logOutRef.current();
  };

  const dropLists: DropNavType[] = [
    {
      redirect: '/profile/' + viewer.id,
      name: 'Профиль'
    },
    {
      name: 'Выйти',
      handler: handleLogOUt
    }
  ];

  useEffect(() => {
    if (viewer.id) {
      setLinks(userLinks);
    }
  }, [viewer]);

  return (
    <header className="header">
      <div className="header__logo-search">
        <Link to="/">
          <img className="header__logo" src={logo} alt="logo" />
        </Link>
      </div>
      <nav className="header__nav">
        {links.map(({ exact, name, linkTo, icon }) => (
          <li key={name} className="header__list">
            {icon && <i className={icon}></i>}
            <NavLink
              exact={!!exact}
              activeClassName="header__link_active"
              className="header__link"
              to={linkTo}
            >
              {name}
            </NavLink>
          </li>
        ))}

        {viewer.id ? (
          <Dropdown avatar={viewer.avatar} nav={dropLists} />
        ) : (
          <Link to="/login" className="header__button">
            Войти
          </Link>
        )}
      </nav>
    </header>
  );
};
