import { CompareType } from '../types';

export const capitaliseFirstLetter = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const compare = ({ date, day }: CompareType) => {
  const today = new Date();

  return (
    day === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
  );
};
