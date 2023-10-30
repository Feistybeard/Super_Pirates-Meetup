import { useState, useEffect } from 'react';
import { Button } from '../components/Button/Button';
import { Link, useNavigate } from 'react-router-dom';
import { baseLink, isTokenExpired } from '../utils/helpers';
import { PageLayout } from '../components/PageLayout/PageLayout';
import { LoadingSpinner } from '../components/LoadingSpinner/LoadingSpinner';
import dayjs from 'dayjs';

export const UserProfile = () => {
  const [meetups, setMeetups] = useState([]);
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(false);
  const pastMeetups = [];
  const futureMeetups = [];
  const navigate = useNavigate();

  const fetchMeetups = async () => {
    setLoading(true);
    const tokenExpired = isTokenExpired();
    if (tokenExpired) {
      navigate(`${baseLink}/login`);
    } else {
      const url = import.meta.env.VITE_BASE_URL + 'user/profile';
      const token = localStorage.getItem('token');
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();

      setUsername(data.username);
      setLoading(false);
      setMeetups(data.data);
    }
  };
  meetups.forEach((meetup) => {
    if (dayjs(meetup.time).isBefore(dayjs())) {
      pastMeetups.push(meetup);
    } else {
      futureMeetups.push(meetup);
    }
  });

  useEffect(() => {
    fetchMeetups();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <PageLayout>
      <div className='flex flex-col place-items-center'>
        <h1 className='text-5xl font-bold'>Hello {username}!</h1>
        <div className='max-w-s flex flex-col place-items-center'>
          <h2 className='pt-10 text-2xl'>Upcoming Meetups</h2>
          {loading && <LoadingSpinner />}
          {futureMeetups.length === 0 && <p>No upcoming meetups.</p>}
          {futureMeetups.length > 0 && (
            <ul>
              {futureMeetups.map((meetup, i) => (
                <li key={i}>
                  <div className='collapse w-96 bg-base-200 mt-3 text-center'>
                    <input type='radio' name={`meetup`} />
                    <div className='collapse-title font-medium p-0 pt-4'>{meetup.title}</div>
                    <div className='collapse-content'>
                      <p>{meetup.description}</p>
                      <p>{meetup.time}</p>
                      {meetup.attendees && (
                        <p className='pb-3'>{meetup.attendees.length} people attending</p>
                      )}
                      <Link to={`${baseLink}/meetups/${meetup.id}`}>
                        <Button buttonText='More Details' />
                      </Link>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
          <h2 className='pt-10 text-2xl'>Past Meetups</h2>
          {loading && <LoadingSpinner />}
          {pastMeetups.length === 0 && <p>No past meetups.</p>}
          {pastMeetups.length > 0 && (
            <ul>
              {pastMeetups.map((meetup, i) => (
                <li key={i}>
                  <div className='collapse w-96 bg-base-200 mt-3 text-center '>
                    <input type='radio' name={`meetup`} />
                    <div className='collapse-title text-xl font-medium p-0 pt-4'>
                      {meetup.title}
                    </div>
                    <div className='collapse-content'>
                      <p>{meetup.description}</p>
                      <p>{meetup.time}</p>
                      {meetup.attendees && (
                        <p className='pb-3'>{meetup.attendees.length} people attending</p>
                      )}
                      <Link to={`${baseLink}/meetups/${meetup.id}`}>
                        <Button buttonText='More Details' />
                      </Link>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </PageLayout>
  );
};
