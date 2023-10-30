import { useParams } from 'react-router-dom';
import { getMeetup } from '../utils/api';
import { useEffect, useState } from 'react';
import MeetupCardLayout from '../components/MeetupCardLayout/MeetupCardLayout';
import { PageLayout } from '../components/PageLayout/PageLayout';
import Reviews from '../components/Reviews/Reviews.jsx';

function MeetupItem() {
  const [meetup, setMeetup] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    async function fetchData() {
      const data = await getMeetup(id);
      setMeetup(data.data);
    }
    fetchData();
  }, [id]);

  return (
    <PageLayout>
      <MeetupCardLayout
        attendees={meetup.attendees}
        limit={meetup.limit}
        location={meetup.location}
        host={meetup.host}
        time={meetup.time}
        description={meetup.description}
        title={meetup.title}
        id={meetup.id}
        keywords={meetup.keywords}
      />
      <Reviews id={id} />
    </PageLayout>
  );
}

export default MeetupItem;
