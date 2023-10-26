import { useEffect, useState } from 'react';
import { getMeetups, getSearchResult } from '../utils/api';
import Meetup from '../components/Meetup/Meetup';

function MeetupList() {
  const [meetups, setMeetups] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    async function fetchData() {
      const data = await getMeetups();
      setMeetups(data.meetups);
    }
    fetchData();
  }, []);

  function handleOnChange(e) {
    console.log(e.target.value);
    setSearch(e.target.value);
  }

  async function handleClick() {
    const test = await getSearchResult(search);
    console.log(test);
  }

  return (
    <div className='flex flex-col mt-20 '>
      <div className='join justify-center fixed'>
        <div>
          <div>
            <input
              className='input input-bordered join-item'
              placeholder='Search'
              onChange={handleOnChange}
            />
          </div>
        </div>
        <select className='select select-bordered join-item'>
          <option disabled>Filter</option>
          <option>Sci-fi</option>
          <option>Drama</option>
          <option>Action</option>
        </select>
        <div className='indicator'>
          <button className='btn join-item' onClick={handleClick}>
            Search
          </button>
        </div>
      </div>

      <div className='flex justify-center'>
        <ul className='grid grid-cols-4 gap-4 bg-base-100 shadow-xl '>
          {meetups.map((meetup) => (
            <Meetup key={meetup.id} meetup={meetup} />
          ))}
        </ul>
      </div>
    </div>
  );
}

export default MeetupList;
