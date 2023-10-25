function Meetup({ id, time, location, description }) {
  function handleOnClick() {
    console.log(id);
  }
  return (
    <li className='card-body'>
      <figure>
        <img src='/public/59904.jpg' alt='' />
      </figure>
      <p>{time}</p>
      <p>{location}</p>
      <p>{description}</p>
      <div className='card-actions'>
        <button onClick={handleOnClick} className='btn btn-primary flex-1'>
          More info
        </button>
      </div>
    </li>
  );
}
export default Meetup;
