import { CiCalendarDate } from 'react-icons/ci';
import MeetupIcon from '../MeetupIcon/MeetupIcon';
import { PiSubtitlesThin } from 'react-icons/pi';
import { AiFillStar, AiOutlineUser } from 'react-icons/ai';
import meetupImg from '/59904.jpg';

function MeetupCard({ time, title, host, onClick }) {
  return (
    <div className='card w-15 sm:max-w-lg md:max-w-xl lg:max-w-2xl bg-base-100 shadow-xl image-full'>
      <figure>
        <img src={meetupImg} alt='meetup' />
      </figure>
      <div className='card-body flex-col '>
        <MeetupIcon icon={<CiCalendarDate />}>
          <h2 className='card-title '>{time}</h2>
        </MeetupIcon>

        <MeetupIcon icon={<PiSubtitlesThin />}>
          <h2 className='card-title'>{title}</h2>
        </MeetupIcon>

        <MeetupIcon icon={<AiOutlineUser />}>
          <h2 className='card-title'>{host}</h2>
        </MeetupIcon>
        <div className='card-actions justify-end mt-auto'>
          <button className='btn btn-secondary' onClick={onClick}>
            <AiFillStar fill='yellow' />
            sign me up
          </button>
        </div>
      </div>
    </div>
  );
}

export default MeetupCard;
