import { Button } from '../components/Button/Button';
import { PageLayout } from '../components/PageLayout/PageLayout';
import { Link } from 'react-router-dom';
import { baseLink } from '../utils/helpers';

export const Home = () => {
  const userToken = localStorage.getItem('token');

  return (
    <PageLayout>
      <div className='max-w-md'>
        <h1 className='text-5xl font-bold'>Super Pirates</h1>
        <p className='py-6'>
          Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi
          exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.
        </p>
        {!userToken && (
          <div className='flex flex-row justify-center p-4 gap-4'>
            <Link to={`${baseLink}/login`}>
              <Button buttonText='Log In' />
            </Link>
            <Link to={`${baseLink}/signup`}>
              <Button buttonText='Sign Up' />
            </Link>
          </div>
        )}
      </div>
    </PageLayout>
  );
};
