import { Button } from '../Button/Button';
import { Input } from '../Input/Input';

export const UserCredentials = ({ buttonText, heading, usernameValue, passwordValue, onUsernameChange, onPasswordChange, onLogin }) => {
  return (
      <div className='flex flex-col w-64 mx-auto p-4 gap-4 h-full'>
        <h1 className='text-2xl'>{heading}</h1>
        <Input type='text' placeholder='Username' value={usernameValue} onChange={onUsernameChange} />
        <Input
          type='password'
          placeholder='Password'
          value={passwordValue}
          onChange={onPasswordChange}
        />
        <Button buttonText={buttonText} onClick={onLogin} />
      </div>
  );
};
