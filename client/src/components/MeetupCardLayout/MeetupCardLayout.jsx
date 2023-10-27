import MeetupCard from './MeetupCard';
import MeetupInformation from './MeetupInformation';

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
  async function handleClick() {
    // Send request to attend meetup
    console.log(id);
  }

  return (
    <div className='flex flex-col gap-5 px-5 mt-20 -z-100'>
      <MeetupCard time={time} title={title} host={host} onClick={handleClick} />

      <MeetupInformation
        time={time}
        host={host}
        location={location}
        attendees={attendees}
        limit={limit}
        description={description}
        keywords={keywords}
      />
    </div>
  );
}

export default MeetupCardLayout;
