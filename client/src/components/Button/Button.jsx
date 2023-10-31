export const Button = ({ buttonText, onClick, disabled }) => {
  return (
    <button className='btn btn-primary' onClick={onClick} disabled={disabled}>
      {buttonText}
    </button>
  );
};
