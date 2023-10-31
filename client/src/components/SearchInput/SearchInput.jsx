function SearchInput({ disabled, onChange, onClick, value }) {
  return (
    <div className='join justify-center'>
      <form>
        <input
          className='input input-bordered join-item '
          placeholder='Search...'
          onChange={onChange}
          value={value.query}
          name='query'
        />
        <input
          className='input input-bordered join-item '
          onChange={onChange}
          value={value.startDate}
          type='date'
          name='startDate'
        />
        <input
          className='input input-bordered join-item '
          onChange={onChange}
          value={value.endDate}
          type='date'
          name='endDate'
        />
        <div className='indicator'>
          <button disabled={disabled} className='btn join-item' onClick={onClick}>
            Search
          </button>
        </div>
      </form>
    </div>
  );
}

export default SearchInput;
