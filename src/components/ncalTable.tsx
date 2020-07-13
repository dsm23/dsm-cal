import React, { FunctionComponent } from 'react';
import clsx from 'clsx';
import startOfMonth from 'date-fns/startOfMonth';
import { compare } from '../utils';

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

const Table: FunctionComponent<Props> = ({ date }) => (
  <>
    <div className="text-center w-full">
      {date.toLocaleString('default', { month: 'long' })} {date.getFullYear()}
    </div>
    <div className="flex w-full h-48">
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
          { length: 42 },
          (_, i) => i + 2 - startOfMonth(date).getDay(),
        ).map((day: number) => (
          <div
            className="flex-grow h-1/7 w-full inline-flex items-center justify-end"
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
        ))}
      </div>
    </div>
  </>
);

export default Table;
