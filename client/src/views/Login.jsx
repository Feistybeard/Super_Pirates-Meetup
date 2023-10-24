import { PageLayout } from '../components/PageLayout/PageLayout';
import { UserCredentials } from '../components/UserCredntials/UserCredentials';
import { useState } from 'react';

export const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    console.log(username, password);
    console.log('LOg IN');
  };

  return (
    <PageLayout>
      <UserCredentials
        heading={'Log In'}
        buttonText={'Log In'}
        usernameValue={username}
        passwordValue={password}
        onUsernameChange={(e) => setUsername(e.target.value)}
        onPasswordChange={(e) => setPassword(e.target.value)}
        onLogin={handleLogin}
      />
    </PageLayout>
  );
};
