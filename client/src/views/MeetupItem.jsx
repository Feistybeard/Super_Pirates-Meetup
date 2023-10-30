import { useParams } from 'react-router-dom';
import { getMeetup, getUserInfo } from '../utils/api';
import { useEffect, useState } from 'react';
import MeetupCardLayout from '../components/MeetupCardLayout/MeetupCardLayout';
import { PageLayout } from '../components/PageLayout/PageLayout';
import AddReview from '../components/AddReview/AddReview.jsx';
import ListReviews from '../components/ListReviews/ListReviews.jsx';
import dayjs from 'dayjs';

function MeetupItem() {
  const [meetup, setMeetup] = useState([]);
  const [user, setUser] = useState({});
  const { id } = useParams();

  useEffect(() => {
    async function fetchData() {
      const data = await getMeetup(id);
      setMeetup(data.data);
    }
    fetchData();
  }, [id]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getUserInfo();
      setUser(data);
    };

    fetchData();
  }, []);

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
      <section className='flex flex-col justify-start border-t-2 border-neutral w-full'>
        {!!meetup?.reviews?.length && (
          <section className='w-full pt-4'>
            {meetup.reviews && <ListReviews reviews={meetup.reviews} />}
          </section>
        )}
        {dayjs().isAfter(meetup?.time) && (
          <>
            {!!user?.data?.filter((meetup) => meetup.id === id).length &&
              !meetup?.reviews?.filter((review) => review.username === user.username)?.length && (
                <article>
                  <AddReview meetupId={id} />
                </article>
              )}
          </>
        )}
      </section>
    </PageLayout>
  );
}

export default MeetupItem;
