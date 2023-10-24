import { Link } from 'react-router-dom';
import { baseLink } from '../../utils/helpers';

export const NavbarLinks = ({navStyle}) => {
  return (
    <ul className={navStyle}>
      <li>
        <Link to={`${baseLink}/signup`}>Sign Up</Link>
      </li>
      <li>
        <Link to={`${baseLink}/`}>Log In</Link>
      </li>
      <li>
        <Link to={`${baseLink}/`}>link3</Link>
      </li>
    </ul>
  );
};
