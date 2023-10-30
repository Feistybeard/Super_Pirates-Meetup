import { Fragment } from 'react';
import { AiFillStar, AiOutlineUser } from 'react-icons/ai';

export default function ListReviews({ reviews, maxScore = 5 }) {
  return (
    <aside className='flex flex-col'>
      {reviews.map((review, index) => (
        <Fragment key={review.id}>
          <article className='card bg-base-300 rounded-box'>
            <div className='card-body flex flex-row gap-4'>
              <aside>
                <header className='flex flex-row'>
                  <AiOutlineUser size={28} />
                  <h2 className='card-title pl-2'>{review.username}</h2>
                </header>
              </aside>

              <aside className='border-l border-neutral pl-4 flex flex-col'>
                <p className='text-start italic'>"{review.comment}"</p>
                <section className='flex flex-row pt-2'>
                  {Array.from({ length: maxScore }, (_, number) => number + 1).map((index) => (
                    <AiFillStar fill={index <= review.score ? 'yellow' : 'gray'} key={index} />
                  ))}
                </section>
              </aside>
            </div>
          </article>
          {reviews.length > 1 && reviews.length - 1 !== index && <div className='divider'></div>}
        </Fragment>
      ))}
    </aside>
  );
}
