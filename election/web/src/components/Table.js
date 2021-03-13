import HeaderCell from './HeaderCell';
import TableLoader from './loaders/Table';
import TableDeltaHelper from './snippets/TableDeltaHelper';

import {TABLE_FADE_IN, TABLE_FADE_OUT} from '../animations';
import {
  COUNTY_TABLE_COUNT,
  STATE_NAMES,
  STATISTIC_CONFIGS,
  TABLE_STATISTICS,
  TABLE_STATISTICS_EXPANDED,
  UNASSIGNED_STATE_CODE,
} from '../constants';
import {getTableStatistic, parseUSADate} from '../utils/commonFunctions';

import {
  FilterIcon,
  FoldDownIcon,
  InfoIcon,
  OrganizationIcon,
  QuestionIcon,
} from '@primer/octicons-v2-react';
import classnames from 'classnames';
import {max} from 'date-fns';
import equal from 'fast-deep-equal';
import produce from 'immer';
import React, {useCallback, useEffect, useMemo, useState, lazy} from 'react';
import {useTrail, useTransition, animated, config} from 'react-spring';
import {useSessionStorage} from 'react-use';
// eslint-disable-next-line
import worker from 'workerize-loader!../workers/getCounties';

const Row = lazy(() => import('./Row'));

function Table({
  data: states,
  date: timelineDate,
  regionHighlighted,
  setRegionHighlighted,
  expandTable,
  setExpandTable,
}) {
  const [sortData, setSortData] = useSessionStorage('sortData', {
    sortColumn: 'republican',
    isAscending: false,
    delta: false,
  });

  const handleSortClick = useCallback(
    (statistic) => {
      if (sortData.sortColumn !== statistic) {
        setSortData(
          produce(sortData, (draftSortData) => {
            draftSortData.sortColumn = statistic;
          })
        );
      } else {
        setSortData(
          produce(sortData, (draftSortData) => {
            draftSortData.isAscending = !sortData.isAscending;
          })
        );
      }
    },
    [sortData, setSortData]
  );

  const trail = useTrail(3, {
    from: {transform: 'translate3d(0, 10px, 0)', opacity: 0},
    to: {transform: 'translate3d(0, 0px, 0)', opacity: 1},
    config: config.wobbly,
  });

  const [counties, setCounties] = useState();

  const [tableOption, setTableOption] = useState('States');
  const [isPerMillion] = useState(false);
  const [isInfoVisible, setIsInfoVisible] = useState(false);

  const lastUpdatedTT = useMemo(() => {
    const updatedDates = [
      states['TT']?.meta?.['last_updated'] || timelineDate,
      states['TT']?.meta?.constitution?.['last_updated'],
    ];
    return max(
      updatedDates.filter((date) => date).map((date) => parseUSADate(date))
    );
  }, [states, timelineDate]);

  const sortingFunction = useCallback(
    (regionKeyA, regionKeyB) => {
      if (sortData.sortColumn !== 'regionName') {
        const statisticConfig = STATISTIC_CONFIGS[sortData.sortColumn];
        const dataType =
          sortData.delta && !statisticConfig.hideDelta ? 'delta' : 'total';

        const statisticA = getTableStatistic(
          counties?.[regionKeyA] || states[regionKeyA],
          sortData.sortColumn,
          isPerMillion,
          lastUpdatedTT
        )[dataType];
        const statisticB = getTableStatistic(
          counties?.[regionKeyB] || states[regionKeyB],
          sortData.sortColumn,
          isPerMillion,
          lastUpdatedTT
        )[dataType];
        return sortData.isAscending
          ? statisticA - statisticB
          : statisticB - statisticA;
      } else {
        const regionNameA =
          counties?.[regionKeyA]?.countyName || STATE_NAMES[regionKeyA];
        const regionNameB =
          counties?.[regionKeyB]?.countyName || STATE_NAMES[regionKeyB];
        return sortData.isAscending
          ? regionNameA.localeCompare(regionNameB)
          : regionNameB.localeCompare(regionNameA);
      }
    },
    [
      counties,
      isPerMillion,
      lastUpdatedTT,
      sortData.delta,
      sortData.isAscending,
      sortData.sortColumn,
      states,
    ]
  );

  const _setTableOption = useCallback(() => {
    setTableOption((prevTableOption) =>
      prevTableOption === 'States' ? 'Counties' : 'States'
    );
  }, []);

  useEffect(() => {
    const workerInstance = worker();
    workerInstance.getCounties(states);
    workerInstance.addEventListener('message', (message) => {
      if (message.data.type !== 'RPC') {
        setCounties(message.data);
        workerInstance.terminate();
      }
    });
  }, [tableOption, states]);

  const transition = useTransition(isInfoVisible, null, {
    from: TABLE_FADE_OUT,
    enter: TABLE_FADE_IN,
    leave: TABLE_FADE_OUT,
  });

  const tableStatistics = expandTable
    ? TABLE_STATISTICS_EXPANDED
    : TABLE_STATISTICS;

  return (
    <React.Fragment>
      <div className="table-top">
        <animated.div
          className={classnames('option-toggle', {
            'is-highlighted': tableOption === 'Counties',
          })}
          onClick={_setTableOption}
          style={trail[0]}
        >
          <OrganizationIcon size={14} />
        </animated.div>

        <animated.div
          className={classnames('info-toggle', {
            'is-highlighted': isInfoVisible,
          })}
          onClick={setIsInfoVisible.bind(this, !isInfoVisible)}
          style={trail[0]}
        >
          <QuestionIcon size={14} />
        </animated.div>

        <animated.div
          className={classnames('expand-table-toggle', {
            'is-highlighted': expandTable,
          })}
          style={trail[1]}
          onClick={setExpandTable.bind(this, !expandTable)}
        >
          <FoldDownIcon size={16} />
        </animated.div>
      </div>

      {transition.map(({item, key, props}) =>
        item ? (
          <animated.div key={key} className="table-helper" style={props}>
            <div className="helper-top">
              <div className="helper-left">
                <div className="info-item">
                  <span>
                    <OrganizationIcon size={14} />
                  </span>
                  <p>{`Toggle between States/Counties`}</p>
                </div>
                <div className="info-item sort">
                  <span>
                    <FilterIcon size={14} />
                  </span>
                  <p>Sort by Descending</p>
                </div>

                <div className="info-item sort invert">
                  <span>
                    <FilterIcon size={14} />
                  </span>
                  <p>Sort by Ascending</p>
                </div>

                <div className="info-item sort">
                  <TableDeltaHelper />
                </div>

                <div className="info-item notes">
                  <span>
                    <InfoIcon size={15} />
                  </span>
                  <p>Notes</p>
                </div>
              </div>
              <div className="helper-right">
                <div className="info-item">
                  <p>Units</p>
                </div>
                {Object.entries({'1K': 3, '1M': 6, '1B': 9}).map(
                  ([abbr, exp]) => (
                    <div className="info-item" key={abbr}>
                      <h5>{abbr}</h5>
                      <p>
                        10
                        <sup
                          style={{
                            verticalAlign: 'baseline',
                            position: 'relative',
                            top: '-.4em',
                          }}
                        >
                          {exp}
                        </sup>
                      </p>
                    </div>
                  )
                )}
              </div>
            </div>

            <h5 className="text">
              {'Compiled from MIT Election Data'},{' '}
              <a href="https://electionlab.mit.edu/">{'know more'}!</a>
            </h5>
          </animated.div>
        ) : null
      )}

      <div className="table-container">
        <div
          className="table fadeInUp"
          style={{
            gridTemplateColumns: `repeat(${tableStatistics.length + 1}, auto)`,
          }}
        >
          <div className="row heading">
            <div
              className="cell heading"
              onClick={handleSortClick.bind(this, 'regionName')}
            >
              <div>{tableOption === 'States' ? 'State' : 'County'}</div>
              {sortData.sortColumn === 'regionName' && (
                <div
                  className={classnames('sort-icon', {
                    invert: sortData.isAscending,
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

          {tableOption === 'States' &&
            Object.keys(states)
              .filter(
                (stateCode) =>
                  stateCode !== 'TT' &&
                  !(stateCode === UNASSIGNED_STATE_CODE && isPerMillion)
              )
              .sort((a, b) => sortingFunction(a, b))
              .map((stateCode) => {
                return (
                  <Row
                    key={stateCode}
                    data={states[stateCode]}
                    {...{
                      stateCode,
                      isPerMillion,
                      regionHighlighted,
                      setRegionHighlighted,
                      expandTable,
                      lastUpdatedTT,
                    }}
                  />
                );
              })}

          {tableOption === 'Counties' && !counties && <TableLoader />}

          {tableOption === 'Counties' &&
            counties &&
            Object.keys(counties)
              .sort((a, b) => sortingFunction(a, b))
              .slice(0, COUNTY_TABLE_COUNT)
              .map((countyKey) => {
                return (
                  <Row
                    key={countyKey}
                    data={counties[countyKey]}
                    countyName={counties[countyKey].countyName}
                    {...{
                      isPerMillion,
                      regionHighlighted,
                      setRegionHighlighted,
                      expandTable,
                      lastUpdatedTT,
                    }}
                  />
                );
              })}

          <Row
            key={'TT'}
            data={states['TT']}
            stateCode={'TT'}
            {...{
              isPerMillion,
              regionHighlighted,
              setRegionHighlighted,
              expandTable,
              lastUpdatedTT,
            }}
          />
        </div>
      </div>
    </React.Fragment>
  );
}

const isEqual = (prevProps, currProps) => {
  if (
    !equal(
      prevProps.regionHighlighted?.countyName,
      currProps.regionHighlighted?.countyName
    )
  ) {
    return false;
  } else if (
    !equal(
      prevProps.regionHighlighted?.stateCode,
      currProps.regionHighlighted?.stateCode
    )
  ) {
    return false;
  } else if (!equal(prevProps.date, currProps.date)) {
    return false;
  } else if (
    !equal(
      prevProps.data['TT'].total.republican,
      currProps.data['TT'].total.republican
    )
  ) {
    return false;
  } else if (!equal(prevProps.expandTable, currProps.expandTable)) {
    return false;
  } else return true;
};

export default React.memo(Table, isEqual);
