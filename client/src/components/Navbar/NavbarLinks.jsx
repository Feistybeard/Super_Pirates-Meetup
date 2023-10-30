import { Link } from 'react-router-dom';
import { siteLinks as links } from '../../utils/helpers';
import { isTokenExpired } from '../../utils/helpers';

export const NavbarLinks = ({ navStyle }) => {
  const tokenExpired = isTokenExpired();
  const siteLinks = [...links];

  if (!tokenExpired) {
    siteLinks.pop(siteLinks.find((link) => link.title === 'Log In'));
    siteLinks.pop(siteLinks.find((link) => link.title === 'Sign Up'));
  }
  return (
    <ul className={navStyle}>
      {siteLinks.map((link, index) => (
        <li key={index}>{<Link to={link.url}>{link.title}</Link>}</li>
      ))}
    </ul>
  );
};
