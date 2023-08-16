import React from 'react';

const DateAgeFormatter = ({ inputDate, specifier = 'ago' }) => {
  const currentDate = new Date();
  const inputDateObj = new Date(inputDate);
  const ageInSeconds = Math.floor((currentDate - inputDateObj) / 1000); // Convert to seconds

  if (ageInSeconds < 60) {
    return <div>{`${ageInSeconds} ${ageInSeconds === 1 ? 'second' : 'seconds'} ${specifier}`}</div>;
  }

  const ageInMinutes = Math.floor(ageInSeconds / 60);
  if (ageInMinutes < 60) {
    return <div>{`${ageInMinutes} ${ageInMinutes === 1 ? 'minute' : 'minutes'} ${specifier}`}</div>;
  }

  const ageInHours = Math.floor(ageInMinutes / 60);
  if (ageInHours < 24) {
    return <div>{`${ageInHours} ${ageInHours === 1 ? 'hour' : 'hours'} ${specifier}`}</div>;
  }

  const ageInDays = Math.floor(ageInHours / 24);
  if (ageInDays < 7) {
    return <div>{`${ageInDays} ${ageInDays === 1 ? 'day' : 'days'} ${specifier}`}</div>;
  }

  const ageInWeeks = Math.floor(ageInDays / 7);
  if (ageInWeeks < 52) {
    return <div>{`${ageInWeeks} ${ageInWeeks === 1 ? 'week' : 'weeks'} ${specifier}`}</div>;
  }

  const ageInYears = Math.floor(ageInWeeks / 52);
  return <div>{`${ageInYears} ${ageInYears === 1 ? 'year' : 'years'} ${specifier}`}</div>;
};

export default DateAgeFormatter;
