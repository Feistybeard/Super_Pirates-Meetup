import { useState, useEffect } from 'react';
function UserProfile() {
  const [meetups, setMeetups] = useState([]);
  const [selectedMeetup, setSelectedMeetup] = useState('');

  const fetchMeetups = async () => {
    const token = localStorage.getItem('token');
    const url =
      'https://corsproxy.io/?' +
      encodeURIComponent(
        'https://r5ihbddcq0.execute-api.eu-north-1.amazonaws.com/api/user/profile',
      );
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();

    return setMeetups(data.data);
  };

  useEffect(() => {
    fetchMeetups();
  }, []);

  return (
    <>
      <h1>User Profile</h1>
      <h2>Upcomming Meetups</h2>
      {meetups.length > 0 && (
        <ul>
          {meetups.map((meetup, i) => (
            <li key={i}>
              <button className='btn' onClick={() => setSelectedMeetup(i)}>
                {meetup.description}
              </button>
            </li>
          ))}
        </ul>
      )}
      <hr />
      <h2>Past Meetups</h2>
      {meetups.length === 0 && <p>No meetups yet. Create one or join one!</p>}

      <div className='meetup_details'>
        <div>
          <h2>{meetups[selectedMeetup]?.location}</h2>
          <p>{meetups[selectedMeetup]?.description}</p>
          <p>{meetups[selectedMeetup]?.time}</p>
          {meetups[selectedMeetup]?.attendees && (
            <p>{meetups[selectedMeetup]?.attendees.length} people attending</p>
          )}
        </div>
      </div>
    </>
  );
}

export default UserProfile;
