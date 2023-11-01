import MeetupCard from './MeetupCard';
import MeetupInformation from './MeetupInformation';
import { useEffect, useState } from 'react';
import { isTokenExpired } from '../../utils/helpers';
import { useParams } from 'react-router-dom';
import Notification from '../Notification/Notification';

function MeetupCardLayout({
  attendees,
  limit,
  location,
  host,
  time,
  description,
  title,
  id,
  keywords,
}) {
  const [btnActive, setBtnActive] = useState(false);
  const [btnText, setBtnText] = useState();
  const [noticeText, setNoticeText] = useState('');
  const meetupId = useParams().id;
  const [attendeesInfo, setAttendeesInfo] = useState();

  async function checkIfSignedUp() {
    const tokenExpired = isTokenExpired();
    if (tokenExpired) {
      setBtnActive(false);
      setBtnText('login to join');
      setNoticeText('Please log in to join meetups!');
    } else {
      const token = localStorage.getItem('token');
      const meetupUrl = `https://rh0ztvnh0m.execute-api.eu-north-1.amazonaws.com/api/meetups/${meetupId}`;
      const userUrl = `https://rh0ztvnh0m.execute-api.eu-north-1.amazonaws.com/api/user/profile`;

      try {
        const [meetupResponse, userResponse] = await Promise.all([
          fetch(meetupUrl, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
          }),
          fetch(userUrl, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
          }),
        ]);

        const [meetupData, userData] = await Promise.all([
          meetupResponse.json(),
          userResponse.json(),
        ]);

        if (meetupData.success && userData.success) {
          const user = userData.userId;
          const meetup = meetupData.data;

          const usersAttending = meetup.attendees.map((meetup) => meetup.id);
          if (usersAttending.includes(user)) {
            setBtnActive(true);
            setBtnText('leave meetup');
            setAttendeesInfo(meetup.attendees);
          } else {
            setBtnActive(true);
            setBtnText('join meetup');
            setAttendeesInfo(meetup.attendees);
          }

          if (meetup.spotsAvailable === 0 && !usersAttending.includes(user)) {
            setBtnActive(false);
            setBtnText('meetup is full');
            setAttendeesInfo(meetup.attendees);
          }

          const date = new Date(meetup.time);
          const now = new Date();
          if (date < now) {
            setBtnActive(false);
            setBtnText('meetup has ended');
            setAttendeesInfo(meetup.attendees);
          }
        }
      } catch (error) {
        console.log(error);
      }
    }
  }

  useEffect(() => {
    checkIfSignedUp();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function handleClick() {
    const token = localStorage.getItem('token');
    try {
      if (btnText === 'leave meetup') {
        const url = `https://rh0ztvnh0m.execute-api.eu-north-1.amazonaws.com/api/meetups/${meetupId}`;
        const response = await fetch(url, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();

        if (data.success) {
          checkIfSignedUp();
          setNoticeText('Successfully left meetup!');
        }
      } else {
        const url = `https://rh0ztvnh0m.execute-api.eu-north-1.amazonaws.com/api/meetups/attend/${meetupId}`;
        const response = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();

        if (data.success) {
          checkIfSignedUp();
          setNoticeText('Successfully joined meetup!');
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className='flex flex-col gap-5 px-5 mt-20 -z-100'>
      <MeetupCard
        time={time}
        title={title}
        host={host}
        onClick={handleClick}
        btnActive={btnActive}
        btnText={btnText}
        btnColor={btnText === 'leave meetup' ? 'leave' : ''}
      />

      <MeetupInformation
        time={time}
        host={host}
        location={location}
        attendees={attendeesInfo}
        limit={limit}
        description={description}
        keywords={keywords}
      />
      <Notification message={noticeText} onExit={() => {}} />
    </div>
  );
}

export default MeetupCardLayout;
