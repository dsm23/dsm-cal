import React, { FunctionComponent } from 'react';
import clsx from 'clsx';
import startOfMonth from 'date-fns/startOfMonth';
import { compare } from '../utils';

interface Props {
  date: Date;
}

enum Week {
  Sunday = 'Su',
  Monday = 'Mo',
  Tuesday = 'Tu',
  Wednesday = 'We',
  Thursday = 'Th',
  Friday = 'Fr',
  Saturday = 'Sa',
}

const Table: FunctionComponent<Props> = ({ date }) => (
  <>
    <div className="w-full text-center">
      {date.toLocaleString('default', { month: 'long' })} {date.getFullYear()}
    </div>
    <div className="flex flex-col">
      <div className="flex flex-wrap flex-grow w-full">
        {Object.values(Week).map((day: Week, index) => {
          const threes = index % 7 < 3;
          const fours = index % 7 > 2;

          return (
            <div
              className={clsx(
                'flex-grow sm:w-1/7 inline-flex items-center sm:justify-end',
                {
                  'w-1/3': threes,
                  'w-1/4': fours,
                  'justify-around': threes,
                  'justify-end': fours,
                },
              )}
              key={day}
            >
              <span className="px-2 py-1">{day}</span>
            </div>
          );
        })}
      </div>
      <div className="flex flex-wrap flex-grow w-full">
        {Array.from(
          { length: 42 },
          (_, i) => i + 1 - startOfMonth(date).getDay(),
        ).map((day: number, index) => {
          const threes = index % 7 < 3;
          const fours = index % 7 > 2;

          return (
            <div
              className={clsx(
                'flex-grow sm:w-1/7 inline-flex items-center sm:justify-end',
                {
                  'w-1/3': threes,
                  'w-1/4': fours,
                  'justify-around': threes,
                  'justify-end': fours,
                },
              )}
              key={`day-${day}`}
            >
              <span
                className={clsx('px-2 py-1', {
                  'text-gray-900 bg-white rounded': compare({ date, day }),
                })}
              >
                {day > 0 && day < date.getDate() + 1 && day}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  </>
);

export default Table;
