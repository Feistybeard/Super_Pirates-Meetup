import { Link } from 'react-router-dom';
import { siteLinks } from '../../utils/helpers';

export const NavbarLinks = ({ navStyle }) => {
  return (
    <ul className={navStyle}>
      {siteLinks.map((link, index) => (
        <li key={index}>
          <Link to={link.url}>{link.title}</Link>
        </li>
      ))}
    </ul>
  );
};
