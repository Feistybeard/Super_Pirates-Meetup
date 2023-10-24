import { PageLayout } from '../components/PageLayout/PageLayout';
import { UserForm } from '../components/userForm/userForm';

export const Login = () => {
  return (
    <PageLayout>
      <UserForm heading={'Log In'} buttonText={'Log In'} />
    </PageLayout>
  );
};
