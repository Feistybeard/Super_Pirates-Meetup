import { useEffect, useState } from 'react';
import { getMeetups } from '../utils/api';
import Meetup from '../components/Meetup/Meetup';
import SearchInput from '../components/SearchInput/SearchInput';
import { PageLayout } from '../components/PageLayout/PageLayout';

function MeetupList() {
  const [meetups, setMeetups] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
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
      setIsLoading(false);
    }
    fetchData();
  }, []);

  function handleOnChange(e) {
    setSearch(e.target.value);
  }

  async function handleClick() {
    if (search === '' || search.length < 2) return;
    const query = getMeetupsByQuery(search);
    setSearchResult(query);
    setSearch('');
  }

  if (isLoading)
    return (
      <PageLayout>
        <p>Loading...</p>
      </PageLayout>
    );

  if (!meetups.length)
    return (
      <PageLayout>
        <p>No meetups...</p>;
      </PageLayout>
    );

  return (
    <PageLayout>
      <div className='flex flex-col gap-5 justify-center items-center pt-10 z-10000000000'>
        <SearchInput onChange={handleOnChange} value={search} onClick={handleClick} />

        {!searchResult.length ? (
          <p>No results found...</p>
        ) : (
          <ul className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 bg-base-100 shadow-xl'>
            {searchResult.map((meetup) => (
              <Meetup
                key={meetup.id}
                id={meetup.id}
                location={meetup.location}
                host={meetup.host}
                time={meetup.time}
              />
            ))}
          </ul>
        )}
      </div>
    </PageLayout>
  );
}

export default MeetupList;
