import { useState } from 'react';
import { Button } from '../Button/Button';
import { useNavigate } from 'react-router-dom';
import { baseLink } from '../../utils/helpers';
import { submitToApi } from '../../utils/apiHelper';
import { useLocation } from 'react-router-dom';
import Notification from '../Notification/Notification.jsx';

export const UserForm = ({ heading, buttonText }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [notification, setNotification] = useState('');

  const timer = 3000;

  // const userToken = localStorage.getItem('token');
  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = { username, password };
    const method = 'POST';
    let link;
    let message;
    let redirect;

    if (location.pathname === `${baseLink}/login`) {
      link = 'user/login';
      message = 'Login';
      redirect = `${baseLink}/meetups`;
    } else if (location.pathname === `${baseLink}/signup`) {
      link = 'user/signup';
      message = 'Signup';
      redirect = `${baseLink}/login`;
    }

    const response = await submitToApi(data, method, link);

    if (response.success == true) {
      // console.log(message + ' successful');
      setUsername('');
      setPassword('');
      setNotification(message + ' successful!');
      setTimeout(() => {
        navigate(redirect);
        // window.location.reload();
      }, timer);
    } else {
      console.log(message + ' failed');
      setNotification(`Error: ${response.message}`);
    }
  };

  return (
    <>
      <form className='flex flex-col w-64 mx-auto p-4 gap-4 h-full' onSubmit={handleSubmit}>
        <h1 className='text-2xl'>{heading}</h1>
        <input
          type='text'
          placeholder='username'
          className='input input-bordered input-primary w-full max-w-xs'
          onChange={(e) => setUsername(e.target.value)}
          value={username}
        />
        <input
          type='password'
          placeholder='password'
          className='input input-bordered input-primary w-full max-w-xs'
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
        <Button buttonText={buttonText} disabled={!!notification} />
      </form>
      <Notification message={notification} onExit={() => setNotification('')} timer={timer} />
    </>
  );
};
