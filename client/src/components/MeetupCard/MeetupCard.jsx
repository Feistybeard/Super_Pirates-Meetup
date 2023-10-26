import { AiFillStar } from 'react-icons/ai';
import IconItem from '../MeetupIcon/MeetupIcon';
import { FcAbout } from 'react-icons/fc';

function MeetupCard({ meetupImg, title, description }) {
  return (
    <div className='card w-50 bg-base-100 shadow-xl image-full'>
      <figure>
        <img src={meetupImg} />
      </figure>
      <div className='card-body'>
        <h2 className='card-title'>{title}</h2>
        <IconItem icon={<FcAbout />}>
          <p>{description}</p>
        </IconItem>
        <p></p>
        <div className='card-actions justify-end'>
          <button className='btn btn-primary'>
            <AiFillStar style={{ fill: 'yellow' }} />
            interested
          </button>
        </div>
      </div>
    </div>
  );
}

export default MeetupCard;
