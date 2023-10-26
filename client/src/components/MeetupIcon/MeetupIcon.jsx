function MeetupIcon({ icon, children }) {
  return (
    <div className='flex items-center gap-2'>
      <span>{icon}</span>
      {children}
    </div>
  );
}

export default MeetupIcon;
