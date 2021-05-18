import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { useQuery } from '@apollo/react-hooks';
import block from 'bem-cn-lite';

import { USER } from '@/lib/graphql/queries/User';
import {
  User as UserData,
  UserVariables
} from '@/lib/graphql/queries/User/__generated__/User';
import { UserProfile } from '@/pages/User/UserProfile';
import { ViewerType } from '@/lib/types';

import './User.css';

const b = block('user');

type Props = {
  viewer: ViewerType;
};

type MatchParams = {
  id: string;
};

export const User = ({
  viewer,
  match
}: Props & RouteComponentProps<MatchParams>) => {
  const { data, loading, error } = useQuery<UserData, UserVariables>(USER, {
    variables: {
      id: match.params.id
    }
  });

  const user = data ? data.user : null;
  const isUser = viewer.id === match.params.id;

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Пользователя не существует</div>;
  }

  return (
    <div className={b()}>
      {user && <UserProfile user={user} isUser={isUser} />}
    </div>
  );
};
