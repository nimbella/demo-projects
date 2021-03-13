import Cell from './Cell';
import Tooltip from './Tooltip';

import {TABLE_STATISTICS, TABLE_STATISTICS_EXPANDED} from '../constants';

import {InfoIcon} from '@primer/octicons-v2-react';
import classnames from 'classnames';
import equal from 'fast-deep-equal';
import produce from 'immer';
import React, {useCallback} from 'react';

function CountyRow({
  stateCode,
  countyName,
  data,
  isPerMillion,
  regionHighlighted,
  setRegionHighlighted,
  expandTable,
  lastUpdatedTT,
}) {

  const highlightCounty = useCallback(() => {
    if (regionHighlighted.countyName !== countyName) {
      setRegionHighlighted(
        produce(regionHighlighted, (draftRegionHighlighted) => {
          draftRegionHighlighted.stateCode = stateCode;
          draftRegionHighlighted.countyName = countyName;
        })
      );
    }
  }, [regionHighlighted, countyName, setRegionHighlighted, stateCode]);

  const tableStatistics = expandTable
    ? TABLE_STATISTICS_EXPANDED
    : TABLE_STATISTICS;

  return (
    <div
      className={classnames('row', 'county', {
        'is-highlighted': regionHighlighted?.countyName === countyName,
      })}
      onMouseEnter={highlightCounty}
    >
      <div className="cell">
        <div className="state-name">{countyName}</div>
        {data?.meta?.notes && (
          <Tooltip {...{data: data.meta.notes}}>
            <InfoIcon size={16} />
          </Tooltip>
        )}
      </div>

      {tableStatistics.map((statistic) => (
        <Cell
          key={statistic}
          {...{statistic, data, isPerMillion, lastUpdatedTT}}
        />
      ))}
    </div>
  );
}

const isCountyRowEqual = (prevProps, currProps) => {
  if (!equal(prevProps.data?.total, currProps.data?.total)) {
    return false;
  } else if (!equal(prevProps.data?.delta, currProps.data?.delta)) {
    return false;
  } else if (
    !equal(prevProps.data?.['last_updated'], currProps.data?.['last_updated'])
  ) {
    return false;
  } else if (!equal(prevProps.isPerMillion, currProps.isPerMillion)) {
    return false;
  } else if (
    !equal(
      prevProps.regionHighlighted.countyName,
      currProps.regionHighlighted.countyName
    ) &&
    (equal(prevProps.regionHighlighted.countyName, prevProps.countyName) ||
      equal(currProps.regionHighlighted.countyName, currProps.countyName))
  ) {
    return false;
  } else if (!equal(prevProps.expandTable, currProps.expandTable)) {
    return false;
  }
  return true;
};

export default React.memo(CountyRow, isCountyRowEqual);
