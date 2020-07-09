import React, { FunctionComponent } from 'react';
import clsx from 'clsx';

interface Props {
  date: Date;
}

enum Week {
  Monday = 'Mo',
  Tuesday = 'Tu',
  Wednesday = 'We',
  Thursday = 'Th',
  Friday = 'Fr',
  Saturday = 'Sa',
  Sunday = 'Su',
}

const Table: FunctionComponent<Props> = ({ date }) => {
  const today = new Date();

  const compare = (day: number) =>
    day === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear();
  return (
    <>
      <div className="flex flex-col w-full h-48">
        <div className="flex-grow w-full inline-flex items-center">
          <div className="text-center w-full">
            {date.toLocaleString('default', { month: 'long' })}{' '}
            {date.getFullYear()}
          </div>
        </div>
        <div className="flex w-full h-full">
          <div className="flex flex-col flex-wrap">
            {Object.values(Week).map((day: Week) => (
              <div
                className="flex-grow h-1/7 w-full inline-flex items-center justify-end"
                key={day}
              >
                <span className="px-2 py-1">{day}</span>
              </div>
            ))}
          </div>
          <div className="flex flex-col flex-wrap">
            {Array.from(
              { length: 35 },
              (_, i) => i - (today.getDate() % 7),
            ).map(day => (
              <div
                className="flex-grow h-1/7 w-full inline-flex items-center justify-end"
                key={`day-${day}`}
              >
                <span
                  className={clsx('px-2 py-1', {
                    'text-gray-900 bg-white rounded': compare(day),
                  })}
                >
                  {day > 0 && day < date.getDate() + 1 && day}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Table;
