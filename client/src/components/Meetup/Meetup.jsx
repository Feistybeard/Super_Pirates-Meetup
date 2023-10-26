import { useState } from 'react';
import { generateHashtag } from '../../utils/helpers';
import Modal from '../Modal/Modal';
import MeetupCard from '../MeetupCard/MeetupCard';
import MeetupIcon from '../MeetupIcon/MeetupIcon';
import meetupImg from '/59904.jpg';
import { AiOutlineClockCircle, AiOutlineUser, AiOutlineCheckSquare } from 'react-icons/ai';
import { IoLocationOutline } from 'react-icons/io5';
import { BsHash } from 'react-icons/bs';

function Meetup({ meetup }) {
  const [showMeetup, setShowMeetup] = useState(false);
  const { attendees, limit, location, host, time, description, title, keywords } = meetup;

  function handleClick() {
    setShowMeetup((showMeetup) => !showMeetup);
  }

  return (
    <>
      <li className='card-body w-80'>
        <figure>
          <img src={meetupImg} alt='' />
        </figure>
        <MeetupIcon icon={<AiOutlineClockCircle />}>
          <p>{time}</p>
        </MeetupIcon>
        <MeetupIcon icon={<IoLocationOutline />}>
          <p>{location}</p>
        </MeetupIcon>
        <MeetupIcon icon={<AiOutlineUser />}>
          <p>
            Event by <strong>{host}</strong>
          </p>
        </MeetupIcon>
        <div className='card-actions'>
          <button onClick={handleClick} className='btn btn-primary flex-1'>
            More info
          </button>
        </div>
      </li>

      {showMeetup && (
        <Modal>
          <div className='flex flex-col gap-2'>
            <div className='flex justify-end'>
              <button onClick={handleClick} className='btn btn-ghost'>
                x
              </button>
            </div>

            <MeetupCard meetupImg={meetupImg} title={title} description={description} />

            <MeetupIcon icon={<AiOutlineClockCircle />}>
              <p>{time}</p>
            </MeetupIcon>

            <MeetupIcon icon={<AiOutlineUser />}>
              <p>
                Event by <strong>{host}</strong>
              </p>
            </MeetupIcon>

            <MeetupIcon icon={<IoLocationOutline />}>
              <p>{location}</p>
            </MeetupIcon>

            <MeetupIcon icon={<AiOutlineCheckSquare />}>
              <p>
                {attendees.length} of {limit} attendees
              </p>
            </MeetupIcon>

            <MeetupIcon icon={<BsHash />}>
              <p>{keywords.map((word) => generateHashtag(word))}</p>
            </MeetupIcon>
          </div>
        </Modal>
      )}
    </>
  );
}
export default Meetup;
