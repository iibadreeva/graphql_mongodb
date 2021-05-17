export type LinkType = {
  exact?: boolean;
  name: string;
  linkTo: string;
  icon?: string;
};

export const overLinks: LinkType[] = [
  {
    exact: true,
    name: 'Отели',
    linkTo: '/host',
    icon: 'fa fa-home'
  },
  {
    name: 'Игра',
    linkTo: '/f'
  },
  {
    name: 'Лидеры',
    linkTo: '/d'
  }
];

export const userLinks: LinkType[] = [
  {
    exact: true,
    name: 'Главная',
    linkTo: '/'
  },
  {
    name: 'Игра',
    linkTo: '/'
  },
  {
    name: 'Лидеры',
    linkTo: '/'
  },
  {
    name: 'Форум',
    linkTo: '/'
  }
];
