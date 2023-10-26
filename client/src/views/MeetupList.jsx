import { useEffect, useState } from 'react';
import { getMeetups } from '../utils/api';
import Meetup from '../components/Meetup/Meetup';
import SearchInput from '../components/SearchInput/SearchInput';

function MeetupList() {
  const [meetups, setMeetups] = useState([]);
  const [searchResult, setSearchResult] = useState([]);
  const [search, setSearch] = useState('');

  function getMeetupsByQuery(queryStr) {
    const words = queryStr.toLowerCase().split(' ');
    const findMatch = meetups.filter((meetup) => {
      for (const word of words) {
        if (meetup.keywords.includes(word)) {
          return meetup;
        }
      }
    });
    return findMatch;
  }

  useEffect(() => {
    async function fetchData() {
      const data = await getMeetups();
      setMeetups(data.meetups);
      setSearchResult(data.meetups);
    }
    fetchData();
  }, []);

  function handleOnChange(e) {
    setSearch(e.target.value);
  }

  async function handleClick() {
    if (search === '' || search.length < 2) return;
    const query = await getMeetupsByQuery(search);
    setSearchResult(query);
    setSearch('');
  }

  return (
    <div className='flex flex-col mt-20 '>
      <SearchInput onChange={handleOnChange} value={search} onClick={handleClick} />

      <div className='flex justify-center'>
        {!searchResult.length ? (
          <p className='mt-10'>No results found...</p>
        ) : (
          <ul className='grid grid-cols-4 gap-4 bg-base-100 shadow-xl '>
            {searchResult.map((meetup) => (
              <Meetup key={meetup.id} meetup={meetup} />
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default MeetupList;
