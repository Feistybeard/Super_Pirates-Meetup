import { getMeetup, getUserInfo } from '../../utils/api';
import { useEffect, useState } from 'react';

import AddReview from './AddReview/AddReview.jsx';
import ListReviews from './ListReviews/ListReviews.jsx';
import dayjs from 'dayjs';

export default function Reviews({ id }) {
  const [meetup, setMeetup] = useState([]);
  const [user, setUser] = useState({});
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const data = await getMeetup(id);
      setMeetup(data.data);
    }
    fetchData();
  }, [id, refresh]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getUserInfo();
      setUser(data);
    };

    fetchData();
  }, [refresh]);

  return (
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
                <AddReview meetupId={id} onSubmit={() => setRefresh(!refresh)} />
              </article>
            )}
        </>
      )}
    </section>
  );
}
