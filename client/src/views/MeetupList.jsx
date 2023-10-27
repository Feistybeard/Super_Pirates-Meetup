import { useEffect, useState } from 'react';
import { getMeetups } from '../utils/api';
import Meetup from '../components/Meetup/Meetup';

function MeetupList() {
  const [meetups, setMeetups] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const data = await getMeetups();
      setMeetups(data.meetups);
      setIsLoading(false);
    }
    fetchData();
  }, []);

  if (isLoading) return <p className='flex justify-center items-center h-screen'>Loading...</p>;

  if (!meetups.length)
    return <p className='flex justify-center items-center h-screen'>No meetups...</p>;

  return (
    <div className='flex justify-center'>
      <ul className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 bg-base-100 shadow-xl'>
        {meetups.map((meetup) => (
          <Meetup
            key={meetup.id}
            id={meetup.id}
            location={meetup.location}
            host={meetup.host}
            time={meetup.time}
          />
        ))}
      </ul>
    </div>
  );
}

export default MeetupList;
