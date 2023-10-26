// import { useState } from 'react';
import { Link } from 'react-router-dom';
import { baseLink } from '../../utils/helpers';
import { NavbarLinks } from './NavbarLinks';
import { Button } from '../Button/Button';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const userToken = localStorage.getItem('token');

  const handleClick = () => {
    navigate(`${baseLink}/user/profile`);
  };

  useEffect(() => {
    setIsLoggedIn(!!userToken);
  }, [userToken]);

  return (
    <div className='navbar bg-base-100 fixed top-0 left-0'>
      <div className='navbar-start'>
        <div className='dropdown'>
          <label tabIndex={0} className='btn btn-ghost lg:hidden'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-5 w-5'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M4 6h16M4 12h8m-8 6h16'
              />
            </svg>
          </label>
          <NavbarLinks
            tabIndex={0}
            navStyle={
              'menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52'
            }
          />
        </div>
        <Link to={`${baseLink}/`} className='btn btn-ghost normal-case text-xl'>
          Super Pirates
        </Link>
      </div>
      <div className='navbar-center hidden lg:flex'>
        <NavbarLinks navStyle={'menu menu-horizontal px-1'} />
      </div>
      <div className='navbar-end'>
        {isLoggedIn && <Button buttonText='Profile' onClick={handleClick} />}
      </div>
    </div>
  );
};
