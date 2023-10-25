export const Button = ({ buttonText, onClick }) => {
  return <button className='btn btn-primary' onClick={onClick}>{buttonText}</button>;
};
