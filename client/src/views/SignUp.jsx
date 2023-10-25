import { PageLayout } from '../components/PageLayout/PageLayout';
import { UserForm } from '../components/UserForm/UserForm';

export const SignUp = () => {
  return (
    <PageLayout>
      <UserForm heading={'Sign Up'} buttonText={'Sign Up'} />
    </PageLayout>
  );
};
