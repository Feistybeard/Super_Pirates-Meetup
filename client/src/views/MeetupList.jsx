import { useEffect, useState } from 'react';
import { getMeetups } from '../utils/api';
import Meetup from '../components/Meetup/Meetup';

function MeetupList() {
  const [meetups, setMeetups] = useState([]);
  useEffect(() => {
    async function fetchData() {
      const data = await getMeetups();
      setMeetups(data.meetups);
    }
    fetchData();
  }, []);

  return (
    <ul className='card w-64 bg-base-100 shadow-xl'>
      {meetups.map((meetup) => (
        <Meetup
          key={meetup.id}
          id={meetup.id}
          time={meetup.time}
          location={meetup.location}
          description={meetup.description}
        />
      ))}
    </ul>
  );
}

export default MeetupList;
