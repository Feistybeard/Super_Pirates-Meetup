function SearchInput({ onChange, onClick, value }) {
  return (
    <div className='join justify-center'>
      <div>
        <div>
          <input
            className='input input-bordered join-item'
            placeholder='Search'
            onChange={onChange}
            value={value}
          />
        </div>
      </div>
      <select className='select select-bordered join-item'>
        <option disabled>Filter</option>
        <option>Keyword</option>
      </select>
      <div className='indicator'>
        <button className='btn join-item' onClick={onClick}>
          Search
        </button>
      </div>
    </div>
  );
}

export default SearchInput;
