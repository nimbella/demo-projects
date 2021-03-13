import Cell from './Cell';
import CountyRow from './CountyRow';
import HeaderCell from './HeaderCell';
import Tooltip from './Tooltip';

import {
  STATE_NAMES,
  STATISTIC_CONFIGS,
  TABLE_STATISTICS,
  TABLE_STATISTICS_EXPANDED,
  UNKNOWN_COUNTY_KEY,
} from '../constants';
import {
  capitalize,
  formatLastUpdated,
  getTableStatistic,
} from '../utils/commonFunctions';

import {
  AlertIcon,
  ClockIcon,
  FilterIcon,
  FoldUpIcon,
  GraphIcon,
  InfoIcon,
} from '@primer/octicons-v2-react';
import classnames from 'classnames';
import equal from 'fast-deep-equal';
import produce from 'immer';
import React, {useState, useCallback, useRef} from 'react';
import {useHistory} from 'react-router-dom';
import {useSessionStorage} from 'react-use';

function Row({
  data,
  stateCode,
  countyName,
  isPerMillion,
  regionHighlighted,
  setRegionHighlighted,
  expandTable,
  lastUpdatedTT,
}) {
  const [showCounties, setShowCounties] = useState(false);
  const [sortData, setSortData] = useSessionStorage('countySortData', {
    sortColumn: 'republican',
    isAscending: false,
    delta: false,
  });

  const history = useHistory();

  const rowElement = useRef();

  const handleSortClick = useCallback(
    (statistic) => {
      setSortData(
        produce(sortData, (draftSortData) => {
          draftSortData.isAscending = !sortData.isAscending;
          draftSortData.sortColumn = statistic;
        })
      );
    },
    [sortData, setSortData]
  );

  const sortingFunction = useCallback(
    (countyNameA, countyNameB) => {
      if (sortData.sortColumn !== 'countyName') {
        const statisticConfig = STATISTIC_CONFIGS[sortData.sortColumn];
        const dataType =
          sortData.delta && !statisticConfig.hideDelta ? 'delta' : 'total';

        const statisticA = getTableStatistic(
          data.counties[countyNameA],
          sortData.sortColumn,
          isPerMillion,
          lastUpdatedTT
        )[dataType];
        const statisticB = getTableStatistic(
          data.counties[countyNameB],
          sortData.sortColumn,
          isPerMillion,
          lastUpdatedTT
        )[dataType];
        return sortData.isAscending
          ? statisticA - statisticB
          : statisticB - statisticA;
      } else {
        return sortData.isAscending
          ? countyNameA.localeCompare(countyNameB)
          : countyNameB.localeCompare(countyNameA);
      }
    },
    [sortData, data, isPerMillion, lastUpdatedTT]
  );

  const highlightState = useCallback(() => {
    if (stateCode) {
      if (regionHighlighted.stateCode !== stateCode) {
        setRegionHighlighted(
          produce(regionHighlighted, (draftRegionHighlighted) => {
            draftRegionHighlighted.stateCode = stateCode;
            draftRegionHighlighted.countyName = null;
          })
        );
      }
    } else if (countyName) {
      if (
        regionHighlighted.countyName !== countyName ||
        regionHighlighted.stateCode !== data.stateCode
      ) {
        setRegionHighlighted(
          produce(regionHighlighted, (draftRegionHighlighted) => {
            draftRegionHighlighted.stateCode = data.stateCode;
            draftRegionHighlighted.countyName = countyName;
          })
        );
      }
    }
  }, [
    data.stateCode,
    countyName,
    regionHighlighted,
    setRegionHighlighted,
    stateCode,
  ]);

  let countyNameStr = countyName;
  if (countyName === UNKNOWN_COUNTY_KEY) {
    countyNameStr = `${UNKNOWN_COUNTY_KEY} [${STATE_NAMES[data.stateCode]}]`;
  }

  const handleStatePageClick = useCallback(
    (stateCode) => {
      history.push(`state/${stateCode}`);
    },
    [history]
  );

  const handleCollapse = useCallback(() => {
    setShowCounties(false);
    rowElement.current.scrollIntoView({
      block: 'start',
    });

    // eslint-disable-next-line
    const faux = stateCode;
  }, [stateCode]);

  const tableStatistics = expandTable
    ? TABLE_STATISTICS_EXPANDED
    : TABLE_STATISTICS;

  return (
    <React.Fragment>
      <div
        className={classnames(
          'row',
          {'is-total': stateCode === 'TT'},
          {
            'is-highlighted':
              (stateCode && regionHighlighted?.stateCode === stateCode) ||
              (countyName &&
                regionHighlighted?.countyName === countyName &&
                regionHighlighted?.stateCode === data.stateCode),
          }
        )}
        onMouseEnter={highlightState}
        // onClick={_setShowCounty}
        ref={rowElement}
      >
        <div className="cell">
          <div className="state-name fadeInUp">
            {STATE_NAMES[stateCode] || countyNameStr}
          </div>
          {data?.meta?.notes && (
            <Tooltip {...{data: data.meta.notes}}>
              <InfoIcon size={16} />
            </Tooltip>
          )}
        </div>

        {tableStatistics.map((statistic) => (
          <Cell
            key={statistic}
            {...{data, statistic, isPerMillion, lastUpdatedTT}}
          />
        ))}
      </div>

      {showCounties && (
        <React.Fragment>
          <div className="state-meta">
            <div className="state-meta-top">
              {data?.meta?.['last_updated'] && (
                <p className="last-updated">
                  <ClockIcon />
                  {capitalize(
                    `${formatLastUpdated(
                      (data || ''.meta || '').last_updated
                    )} ${'ago'}`
                  )}
                </p>
              )}
              <div
                className="state-page"
                onClick={handleStatePageClick.bind(this, stateCode)}
              >
                <GraphIcon />
                <span>
                  {
                    ('See more details on {{state}}',
                    {
                      state: stateCode,
                    })
                  }
                </span>
              </div>
            </div>

            {data.counties && UNKNOWN_COUNTY_KEY in data.counties && (
              <div className="state-meta-bottom">
                <div className={classnames('disclaimer')}>
                  <AlertIcon />
                  <span>
                    {'County-wise data not available in state bulletin'}
                  </span>
                </div>
              </div>
            )}
          </div>

          <div className={classnames('row', 'heading')}>
            <div
              className="cell heading"
              onClick={handleSortClick.bind(this, 'countyName')}
            >
              <div className="county-name">{'County'}</div>
              {sortData.sortColumn === 'countyName' && (
                <div
                  className={classnames('sort-icon', {
                    invert: !sortData.isAscending,
                  })}
                >
                  <FilterIcon size={10} />
                </div>
              )}
            </div>

            {tableStatistics.map((statistic) => (
              <HeaderCell
                key={statistic}
                {...{statistic, sortData, setSortData}}
                handleSort={handleSortClick.bind(this, statistic)}
              />
            ))}
          </div>
        </React.Fragment>
      )}

      {showCounties &&
        Object.keys(data.counties || {})
          .sort((a, b) => sortingFunction(a, b))
          .map((countyName) => (
            <CountyRow
              data={data.counties[countyName]}
              key={countyName}
              {...{
                countyName,
                regionHighlighted,
                setRegionHighlighted,
                stateCode,
                isPerMillion,
                expandTable,
                lastUpdatedTT,
              }}
            />
          ))}

      {showCounties && (
        <div className="spacer-row">
          <div className="spacer">
            <p>{`End of ${STATE_NAMES[stateCode]}'s counties`}</p>
            <div className="fold" onClick={handleCollapse}>
              <FoldUpIcon />
            </div>
          </div>
        </div>
      )}
    </React.Fragment>
  );
}

const isEqual = (prevProps, currProps) => {
  if (!equal(prevProps.data?.total, currProps.data?.total)) {
    return false;
  } else if (!equal(prevProps.data?.delta, currProps.data?.delta)) {
    return false;
  } else if (!equal(prevProps.isPerMillion, currProps.isPerMillion)) {
    return false;
  } else if (
    (!equal(
      prevProps.regionHighlighted.stateCode,
      currProps.regionHighlighted.stateCode
    ) &&
      equal(prevProps.regionHighlighted.stateCode, prevProps.stateCode)) ||
    equal(currProps.regionHighlighted.stateCode, currProps.stateCode)
  ) {
    return false;
  } else if (
    (!equal(
      prevProps.regionHighlighted.countyName,
      currProps.regionHighlighted.countyName
    ) &&
      equal(prevProps.regionHighlighted.countyName, prevProps.countyName)) ||
    equal(currProps.regionHighlighted.countyName, currProps.countyName)
  ) {
    return false;
  } else if (!equal(prevProps.expandTable, currProps.expandTable)) {
    return false;
  } else return true;
};

export default React.memo(Row, isEqual);
