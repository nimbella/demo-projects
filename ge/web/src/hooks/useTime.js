//
// useTime hook
//
import {DateTime} from 'luxon';
import {useEffect, useState} from 'react';

export const getTime = () => {
  // This implementation uses Luxon: https://moment.github.io/luxon/
  return DateTime.local();

  // You can also use moment: https://momentjs.com
  // return moment();

  // Or just use native Date objects (in general, not a good move)
  // return new Date();

  // Or just use unix epoch timestamps (integers, no timezones)
  // return (new Date()).getTime();
};

export const useTime = (refreshCycle = 100) => {
  // Returns the current time
  // and queues re-renders every `refreshCycle` milliseconds (default: 100ms)

  const [now, setNow] = useState(getTime());

  useEffect(() => {
    // Regularly set time in state
    // (this will cause your component to re-render frequently)
    const intervalId = setInterval(() => setNow(getTime()), refreshCycle);

    // Cleanup interval
    return () => clearInterval(intervalId);

    // Specify dependencies for useEffect
  }, [refreshCycle, setNow]);

  return now;
};
