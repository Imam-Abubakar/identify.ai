import React from 'react';

const DateAgeFormatter = ({ inputDate }) => {
  const currentDate = new Date();
  const inputDateObj = new Date(inputDate);
  const ageInSeconds = Math.floor((currentDate - inputDateObj) / 1000); // Convert to seconds

  if (ageInSeconds < 60) {
    return <div>{`${ageInSeconds} ${ageInSeconds === 1 ? 'second' : 'seconds'} ago`}</div>;
  }

  const ageInMinutes = Math.floor(ageInSeconds / 60);
  if (ageInMinutes < 60) {
    return <div>{`${ageInMinutes} ${ageInMinutes === 1 ? 'minute' : 'minutes'} ago`}</div>;
  }

  const ageInHours = Math.floor(ageInMinutes / 60);
  if (ageInHours < 24) {
    return <div>{`${ageInHours} ${ageInHours === 1 ? 'hour' : 'hours'} ago`}</div>;
  }

  const ageInDays = Math.floor(ageInHours / 24);
  if (ageInDays < 7) {
    return <div>{`${ageInDays} ${ageInDays === 1 ? 'day' : 'days'} ago`}</div>;
  }

  const ageInWeeks = Math.floor(ageInDays / 7);
  if (ageInWeeks < 52) {
    return <div>{`${ageInWeeks} ${ageInWeeks === 1 ? 'week' : 'weeks'} ago`}</div>;
  }

  const ageInYears = Math.floor(ageInWeeks / 52);
  return <div>{`${ageInYears} ${ageInYears === 1 ? 'year' : 'years'} ago`}</div>;
};

export default DateAgeFormatter;
