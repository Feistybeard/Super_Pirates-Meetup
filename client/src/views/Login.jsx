import { PageLayout } from '../components/PageLayout/PageLayout';
import { UserForm } from '../components/UserForm/UserForm';

export const Login = () => {
  return (
    <PageLayout>
      <UserForm heading={'Log In'} buttonText={'Log In'} />
    </PageLayout>
  );
};
