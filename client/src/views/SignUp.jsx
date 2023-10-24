import { PageLayout } from '../components/PageLayout/PageLayout';
import { UserCredentials } from '../components/UserCredntials/UserCredentials';
import { useState } from 'react';

export const SignUp = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUp = () => {
    console.log(username, password);
    console.log('Sign up');
  };

  return (
    <PageLayout>
      <UserCredentials
        heading={'Sign Up'}
        buttonText={'Sign Up'}
        usernameValue={username}
        passwordValue={password}
        onUsernameChange={(e) => setUsername(e.target.value)}
        onPasswordChange={(e) => setPassword(e.target.value)}
        onSignUp={handleSignUp}
      />
    </PageLayout>
  );
};
