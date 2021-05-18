import React, { FC, useState, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import block from 'bem-cn-lite';

import './Dropdown.css';

const b = block('dropdown');

export type DropNavType = {
  name: string;
  redirect?: string;
  handler?: () => void;
};

type Props = {
  avatar: string | null;
  nav: DropNavType[];
};

export const Dropdown: FC<Props> = ({ avatar, nav }) => {
  const [isShow, setShow] = useState(false);
  const history = useHistory();

  const handlerToggleNav = useCallback(() => {
    setShow(!isShow);
  }, [isShow]);

  const handlerHideNav = useCallback(() => {
    setShow(false);
  }, []);

  const handlerRedirect = useCallback(
    (name) => {
      history.replace(name);
      setShow(false);
    },
    [history]
  );

  return (
    <div onMouseLeave={handlerHideNav} className={b()}>
      <div
        role="presentation"
        className={b('panel', { avatar: true, active: isShow })}
        onClick={handlerToggleNav}
      >
        <div className={b('avatar')}>
          <img className={b('img')} src={avatar || ''} alt="avatar" />
        </div>
        <div className={b('arrow')} />
      </div>

      <ul className={b('nav', { active: isShow })}>
        {nav.map(({ name, redirect, handler }) => {
          return redirect ? (
            <li
              key={name}
              role="presentation"
              className={b('list')}
              onClick={() => handlerRedirect(redirect)}
            >
              {name}
            </li>
          ) : (
            <li
              key={name}
              role="presentation"
              className={b('list')}
              onClick={handler}
            >
              {name}
            </li>
          );
        })}
      </ul>
    </div>
  );
};
