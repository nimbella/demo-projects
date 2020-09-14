import ActionsPanel from './ActionsPanel';

import {fetcher} from '../utils/commonFunctions';

import React, {useState, useEffect, lazy, Suspense} from 'react';
import {useLocalStorage} from 'react-use';
import useSWR from 'swr';

const Updates = lazy(() => import('./Updates'));

const Actions = ({setYear, years}) => {
  const [showUpdates, setShowUpdates] = useState(false);
  const [newUpdate, setNewUpdate] = useLocalStorage('newUpdate', false);
  const [lastViewedLog, setLastViewedLog] = useLocalStorage('lastViewedLog', 0);
  const [isTimelineMode, setIsTimelineMode] = useState(false);
  const {data: updates} = useSWR(
    'https://apigcp.nimbella.io/api/v1/web/raichand-8kehpaun1bf/ge2020/newz',
    fetcher,
    {
      revalidateOnFocus: true,
    }
  );

  useEffect(() => {
    if (updates) {
      const lastTimestamp = updates.slice().reverse()[0].created;
      if (lastTimestamp !== lastViewedLog) {
        setNewUpdate(true);
        setLastViewedLog(lastTimestamp);
      }
    }
  }, [lastViewedLog, updates, setLastViewedLog, setNewUpdate]);

  return (
    <React.Fragment>
      <ActionsPanel
        {...{
          lastViewedLog,
          newUpdate,
          isTimelineMode,
          setIsTimelineMode,
          showUpdates,
          setYear,
          years,
          setNewUpdate,
          setShowUpdates,
        }}
      />

      {showUpdates && (
        <Suspense fallback={<div />}>
          <Updates {...{updates}} />
        </Suspense>
      )}
    </React.Fragment>
  );
};

const isEqual = (prevProps, currProps) => {
  return true;
};

export default React.memo(Actions, isEqual);
