import { Fragment } from 'react';
import { AiFillStar, AiOutlineUser } from 'react-icons/ai';

export default function ListReviews({ reviews, maxScore = 5 }) {
  return (
    <aside className='flex flex-col'>
      {reviews.map((review, index) => (
        <Fragment key={review.id}>
          <article className='card bg-base-300 rounded-box'>
            <div className='card-body'>
              <header className='flex flex-row'>
                <AiOutlineUser size={28} />
                <h2 className='card-title pl-2'>{review.username}</h2>
              </header>

              <section className='flex flex-row'>
                {Array.from({ length: maxScore }, (_, number) => number + 1).map((index) => (
                  <AiFillStar fill={index <= review.score ? 'yellow' : 'gray'} key={index} />
                ))}
              </section>

              <p className='text-start italic'>"{review.comment}"</p>
            </div>
          </article>
          {reviews.length > 1 && reviews.length - 1 !== index && <div className='divider'></div>}
        </Fragment>
      ))}
    </aside>
  );
}
