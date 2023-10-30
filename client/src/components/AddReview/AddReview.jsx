import { useState } from 'react';
import { submitReview } from '../../utils/api.js';
import Notification from '../Notification/Notification.jsx';
import Score from './Score/Score.jsx';

export default function AddReview({ meetupId }) {
  const [data, setData] = useState({ comment: '', score: 0 });
  const [notification, setNotification] = useState('');

  const onSubmit = async (event) => {
    event.preventDefault();

    const result = await submitReview(data, meetupId);

    if (result.success) {
      setData({ comment: '', score: 0 });
      setNotification('');
    } else {
      setNotification(result.message);
    }
  };

  const tooltip = () => {
    for (const key of Object.keys(data)) {
      if (!data[key]) {
        const part = key.substring(0, 1).toUpperCase() + key.substring(1);
        return `${part} required`;
      }
    }
  };

  return (
    <article className='card  m-x-0 p-x-0'>
      <form className='card-body pt-4 px-0' onSubmit={onSubmit}>
        <textarea
          className='textarea textarea-bordered resize-none w-full max-w-full'
          placeholder='Comment here...'
          value={data.comment}
          onChange={(event) => setData({ ...data, comment: event.currentTarget.value })}
        ></textarea>
        <Score onClick={(score) => setData({ ...data, score })} />
        <div className='tooltip flex' data-tip={tooltip()}>
          <button className='btn btn-primary flex-1' disabled={tooltip()}>
            Submit review
          </button>
        </div>
        <Notification message={notification} onExit={() => setNotification('')} />
      </form>
    </article>
  );
}
