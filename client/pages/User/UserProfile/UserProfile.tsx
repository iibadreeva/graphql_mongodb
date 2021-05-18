import React, { FC } from 'react';
import block from 'bem-cn-lite';
import { Link } from 'react-router-dom';

import { User as UserData } from '@/lib/graphql/queries/User/__generated__/User';

import './UserProfile.css';

const b = block('user-profile');

type Props = {
  user: UserData['user'];
  isUser: boolean;
};

export const UserProfile: FC<Props> = ({ user, isUser }) => {
  return (
    <div className={b()}>
      <header className={b('header')}>
        <img className={b('avatar')} alt={user.name} src={user.avatar} />
      </header>
      <div className={b('label')}>имя: {user.name}</div>
      <div className={b('label')}>email: {user.contact}</div>
      {isUser && (
        <footer className={b('footer')}>
          <div>Дополнительная информация</div>
          <p>Заинтересованы в том, чтобы создавать свои книги или брони?</p>
          <p>Зарегистрируйся с помощью своей учетной записи</p>
          <Link
            to={{ pathname: 'https://stripe.com/en-us/connect' }}
            target="_blank"
          >
            Регистрация
          </Link>
        </footer>
      )}
    </div>
  );
};
