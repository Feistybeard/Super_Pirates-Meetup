import { AiOutlineCheckSquare, AiOutlineClockCircle, AiOutlineUser } from 'react-icons/ai';
import MeetupIcon from '../MeetupIcon/MeetupIcon';
import { IoLocationOutline } from 'react-icons/io5';
import { FcAbout } from 'react-icons/fc';
import { BsHash } from 'react-icons/bs';
import { generateHashtag } from '../../utils/helpers';

function MeetupInformation({ time, host, location, attendees, limit, description, keywords }) {
  return (
    <div className='flex flex-col gap-1.5'>
      <h2 className='text-3xl mb-2'>Information</h2>

      <div className='grid grid-cols-1 sm:grid-cols-2 sm:max-grid-cols-2 md:grid-cols-2 gap-4'>
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
            {attendees?.length} of {limit} attendees
          </p>
        </MeetupIcon>

        <MeetupIcon icon={<FcAbout />}>
          <p>{description}</p>
        </MeetupIcon>

        <MeetupIcon icon={<BsHash />}>
          <p>{keywords?.map((word) => generateHashtag(word))}</p>
        </MeetupIcon>
      </div>
    </div>
  );
}

export default MeetupInformation;
