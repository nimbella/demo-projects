import {useTime} from '../hooks/useTime';

import {DateTime} from 'luxon';
import React from 'react';
const Timer = ({end}) => {
  const now = useTime(1000);
  end = end || DateTime.fromISO('2020-11-03T10:30');
  const diff = end.diff(now);
  const formattedDuration = diff.toFormat(
    "d 'Days' h 'Hours' m 'Minutes' s 'Seconds'"
  );
  return (
      <h1>{formattedDuration}</h1>
  );
};
export default Timer;
