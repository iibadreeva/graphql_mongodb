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
  }
];

export const userLinks: LinkType[] = [
  {
    exact: true,
    name: 'Отели',
    linkTo: '/host',
    icon: 'fa fa-home'
  },
  {
    name: 'Книги',
    linkTo: '/books'
  }
];
