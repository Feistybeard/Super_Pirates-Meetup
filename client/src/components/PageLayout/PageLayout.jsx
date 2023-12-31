export const PageLayout = ({ children }) => {
  return (
    <div className='hero min-h-screen'>
      <div className='hero-content text-center flex flex-col'>{children}</div>
    </div>
  );
};
