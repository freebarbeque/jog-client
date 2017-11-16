export interface ILink {
  title: string;
  to: string;
}

export const companyLinks: ILink[] = [
  {title: 'How it works', to: '/'},
  {title: 'Contact us', to: '/'},
  {title: 'About us', to: '/'},
  {title: 'Blog', to: '/'}
];

export const legalLinks: ILink[] = [
  {title: 'Terms of Use', to: '/'},
  {title: 'Privacy Policy', to: '/'},
  {title: 'Cookies', to: '/'},
];