import { useEffect, useState } from 'react';
import { getMeetups } from '../utils/api';
import Meetup from '../components/Meetup/Meetup';
import SearchInput from '../components/SearchInput/SearchInput';
import { PageLayout } from '../components/PageLayout/PageLayout';
import { Link } from 'react-router-dom';
import MeetupIcon from '../components/MeetupIcon/MeetupIcon';
import { IoMdArrowBack } from 'react-icons/io';
import dayjs from 'dayjs';

function MeetupList() {
  const [meetups, setMeetups] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchResult, setSearchResult] = useState([]);
  const [formData, setFormData] = useState({ query: '', startDate: '', endDate: '' });

  function getMeetupsByQuery(queryStr) {
    const words = queryStr.toLowerCase().split(' ');

    const meetupsByDate = meetups.filter((meetup) => {
      if (
        dayjs(meetup.time).isAfter(formData.startDate || '1900-01-01') &&
        dayjs(meetup.time).isBefore(`${formData.endDate || '9999-12-31'} 23:59:59`)
      ) {
        return meetup;
      }
    });

    const findMatch = meetupsByDate.filter((meetup) => {
      const keywords = meetup.keywords.map((keyword) => keyword.toLowerCase());

      for (const word of words) {
        for (const key of keywords) {
          if (key.includes(word) || meetup.location.toLowerCase().includes(word)) {
            return meetup;
          }
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
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  async function handleClick(event) {
    event.preventDefault();
    const query = getMeetupsByQuery(formData.query);
    setSearchResult(query);
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
      <div className='flex flex-col gap-5 justify-center items-center mt-20'>
        <SearchInput onChange={handleOnChange} value={formData} onClick={handleClick} />

        {!searchResult.length ? (
          <div className='flex flex-col items-center gap-3'>
            <p>No results found...</p>
            <MeetupIcon icon={<IoMdArrowBack />}>
              <Link className='link link-primary>' to='.' onClick={() => setSearchResult(meetups)}>
                Go back
              </Link>
            </MeetupIcon>
          </div>
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
