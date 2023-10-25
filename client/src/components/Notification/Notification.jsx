import { useState, useEffect } from 'react';

export default function Notification({ message, onExit, timer = 3000 }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (message) {
      setVisible(true);

      setTimeout(() => {
        onExit();
        setVisible(false);
      }, timer);
    }
  }, [message]);

  if (visible) {
    return (
      <article className='alert'>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          className='stroke-info shrink-0 w-6 h-6'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth='2'
            d='M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
          ></path>
        </svg>
        <span>{message}</span>
      </article>
    );
  } else {
    return <></>;
  }
}
