import React from 'react';

const DateAgeFormatter = ({ inputDate }) => {
  const currentDate = new Date();
  const inputDateObj = new Date(inputDate);
  const ageInMilliseconds = currentDate - inputDateObj;

  const millisecondsInYear = 1000 * 60 * 60 * 24 * 365;
  const millisecondsInWeek = 1000 * 60 * 60 * 24 * 7;
  const millisecondsInDay = 1000 * 60 * 60 * 24;

  const years = Math.floor(ageInMilliseconds / millisecondsInYear);
  const weeks = Math.floor(ageInMilliseconds / millisecondsInWeek);
  const days = Math.floor(ageInMilliseconds / millisecondsInDay);

  let ageString = '';

  if (years >= 1) {
    ageString = `${years} ${years === 1 ? 'year' : 'years'} old`;
  } else if (weeks >= 1) {
    ageString = `${weeks} ${weeks === 1 ? 'week' : 'weeks'} old`;
  } else {
    ageString = `${days} ${days === 1 ? 'day' : 'days'} old`;
  }

  return <div>{ageString}</div>;
};

export default DateAgeFormatter;
