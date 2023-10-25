import { PageLayout } from '../components/PageLayout/PageLayout';
import { UserForm } from '../components/userForm/userForm';

export const SignUp = () => {
  return (
    <PageLayout>
      <UserForm heading={'Sign Up'} buttonText={'Sign Up'} />
    </PageLayout>
  );
};
