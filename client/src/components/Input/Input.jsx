export const Input = ({ type, placeholder, value, onChange }) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      className='input input-bordered input-primary w-full max-w-xs'
      value={value} 
      onChange={onChange}
    />
  );
};
