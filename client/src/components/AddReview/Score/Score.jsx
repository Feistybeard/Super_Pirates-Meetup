import { useState } from 'react';

export default function Score({ maxScore = 5, onClick = () => {} }) {
  const [score, setScore] = useState(0);

  return (
    <ul className='steps bg-base-200 rounded-lg my-2 p-4'>
      {Array.from({ length: maxScore }, (_, number) => number + 1).map((index) => (
        <li
          className={'step hover:step-primary' + (index <= score ? ' step-neutral' : '')}
          key={index}
          onClick={() => {
            setScore(index);
            onClick(index);
          }}
        ></li>
      ))}
    </ul>
  );
}
