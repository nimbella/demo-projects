import {formatNumber} from '../utils/commonFunctions';

import React from 'react';

function StateMeta({stateCode, data}) {
  return (
    <React.Fragment>
      <div className="StateMeta population">
        <div className="meta-item population">
          <h3>Total</h3>
          <h1>{formatNumber(data[stateCode]?.meta?.total)}</h1>
        </div>
      </div>
    </React.Fragment>
  );
}

const isEqual = (prevProps, currProps) => {
  if (currProps.timeseries && !prevProps.timeseries) {
    return false;
  } else if (prevProps.stateCode !== currProps.stateCode) {
    return false;
  }
  return true;
};

export default React.memo(StateMeta, isEqual);
