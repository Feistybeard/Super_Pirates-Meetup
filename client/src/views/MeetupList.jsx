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
    <div className='flex justify-center'>
      <ul className='grid grid-cols-4 gap-4 bg-base-100 shadow-xl '>
        {meetups.map((meetup) => (
          <Meetup key={meetup.id} meetup={meetup} />
        ))}
      </ul>
    </div>
  );
}

export default MeetupList;
