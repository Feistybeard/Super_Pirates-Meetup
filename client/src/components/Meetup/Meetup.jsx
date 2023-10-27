import MeetupIcon from '../MeetupIcon/MeetupIcon';
import meetupImg from '/59904.jpg';
import { AiOutlineClockCircle, AiOutlineUser } from 'react-icons/ai';
import { IoLocationOutline } from 'react-icons/io5';
import { useLocation, useNavigate } from 'react-router-dom';

function Meetup({ location, host, id, time }) {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  function handleClick() {
    navigate(`${pathname}/${id}`); // => <MeetupItem/>
  }

  return (
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
  );
}
export default Meetup;
