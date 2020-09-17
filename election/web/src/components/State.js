import DeltaBarGraph from './DeltaBarGraph';
import Footer from './Footer';
import Level from './Level';
import MapSwitcher from './MapSwitcher';
import StateHeader from './StateHeader';
import StateMeta from './StateMeta';

import {API_ROOT_URL, STATE_NAMES} from '../constants';
import useIsVisible from '../hooks/useIsVisible';
import {fetcher, formatNumber, getStatistic} from '../utils/commonFunctions';

import classnames from 'classnames';
import React, {
  useMemo,
  useState,
  useEffect,
  lazy,
  Suspense,
  useRef,
} from 'react';
import {Helmet} from 'react-helmet';
import {useParams} from 'react-router-dom';
import {useSessionStorage} from 'react-use';
import useSWR from 'swr';

const TimeseriesExplorer = lazy(() => import('./TimeseriesExplorer'));
const MapExplorer = lazy(() => import('./MapExplorer'));
const Minigraphs = lazy(() => import('./Minigraphs'));

function State() {
  const stateCode = useParams().stateCode.toUpperCase();

  const [mapStatistic, setMapStatistic] = useSessionStorage(
    'mapStatistic',
    'democrat'
  );
  const [showAllCounties, setShowAllCounties] = useState(false);
  const [regionHighlighted, setRegionHighlighted] = useState({
    stateCode: stateCode,
    countyName: null,
  });

  useEffect(() => {
    if (regionHighlighted.stateCode !== stateCode) {
      setRegionHighlighted({
        stateCode: stateCode,
        countyName: null,
      });
      setShowAllCounties(false);
    }
  }, [regionHighlighted.stateCode, stateCode]);

  const {data: timeseries, error: timeseriesResponseError} = useSWR(
    `${API_ROOT_URL}/timeseries${stateCode ? `?state=${stateCode}` : ''}`,
    fetcher,
    {
      revalidateOnMount: true,
      refreshInterval: 100000,
    }
  );

  const {data} = useSWR(`${API_ROOT_URL}/counties`, fetcher, {
    revalidateOnMount: true,
    refreshInterval: 100000,
  });

  const toggleShowAllCounties = () => {
    setShowAllCounties(!showAllCounties);
  };

  const handleSort = (countyNameA, countyNameB) => {
    const countyA = data[stateCode].counties[countyNameA];
    const countyB = data[stateCode].counties[countyNameB];
    return (
      getStatistic(countyB, 'total', mapStatistic) -
      getStatistic(countyA, 'total', mapStatistic)
    );
  };

  const gridRowCount = useMemo(() => {
    if (!data) return;
    const gridColumnCount = window.innerWidth >= 540 ? 3 : 2;
    const countyCount = data[stateCode]?.counties
      ? Object.keys(data[stateCode].counties).filter(
          (countyName) => countyName !== 'Unknown'
        ).length
      : 0;
    const gridRowCount = Math.ceil(countyCount / gridColumnCount);
    return gridRowCount;
  }, [data, stateCode]);

  const stateMetaElement = useRef();
  const isStateMetaVisible = useIsVisible(stateMetaElement, {once: true});

  const trail = useMemo(() => {
    const styles = [];

    [0, 0, 0, 0].map((element, index) => {
      styles.push({
        animationDelay: `${index * 250}ms`,
      });
      return null;
    });
    return styles;
  }, []);

  const lookback = showAllCounties ? (window.innerWidth >= 540 ? 10 : 8) : 6;

  return (
    <React.Fragment>
      <Helmet>
        <title>
          General Election 2020 {STATE_NAMES[stateCode]} - ge2020usa.org
        </title>
        <meta
          name="title"
          content={`General Election 2020 ${STATE_NAMES[stateCode]}: Updates`}
        />
      </Helmet>

      <div className="State">
        <div className="state-left">
          <StateHeader data={data?.[stateCode]} stateCode={stateCode} />

          <div style={{position: 'relative'}}>
            <MapSwitcher {...{mapStatistic, setMapStatistic}} />
            <Level data={data?.[stateCode]} />
            <Minigraphs
              timeseries={timeseries?.[stateCode]?.years}
              {...{stateCode}}
              forceRender={!!timeseriesResponseError}
            />
          </div>

          {data && (
            <Suspense fallback={<div style={{minHeight: '50rem'}} />}>
              <MapExplorer
                {...{
                  stateCode,
                  data,
                  regionHighlighted,
                  setRegionHighlighted,
                  mapStatistic,
                  setMapStatistic,
                }}
              ></MapExplorer>
            </Suspense>
          )}

          <span ref={stateMetaElement} />

          {data && isStateMetaVisible && (
            <StateMeta
              {...{
                stateCode,
                data,
              }}
              timeseries={timeseries?.[stateCode]?.years}
            />
          )}
        </div>

        <div className="state-right">
          <React.Fragment>
            <div
              className="county-bar"
              style={!showAllCounties ? {display: 'flex'} : {}}
            >
              <div className="county-bar-top">
                <div className="county-bar-left">
                  <h2
                    className={classnames(mapStatistic, 'fadeInUp')}
                    style={trail[0]}
                  >
                    Top counties
                  </h2>
                  <div
                    className={`counties fadeInUp ${
                      showAllCounties ? 'is-grid' : ''
                    }`}
                    style={
                      showAllCounties
                        ? {
                            gridTemplateRows: `repeat(${gridRowCount}, 2rem)`,
                            ...trail[1],
                          }
                        : trail[1]
                    }
                  >
                    {Object.keys(data?.[stateCode]?.counties || {})
                      .filter((countyName) => countyName !== 'Unknown')
                      .sort((a, b) => handleSort(a, b))
                      .slice(0, showAllCounties ? undefined : 5)
                      .map((countyName) => {
                        const total = getStatistic(
                          data[stateCode].counties[countyName],
                          'total',
                          mapStatistic
                        );
                        const delta = getStatistic(
                          data[stateCode].counties[countyName],
                          'delta',
                          mapStatistic
                        );
                        return (
                          <div key={countyName} className="county">
                            <h2>{formatNumber(total)}</h2>
                            <h5>{countyName}</h5>
                            {mapStatistic !== 'democrat' && (
                              <div className="delta">
                                <h6 className={mapStatistic}>
                                  {delta > 0
                                    ? '\u2191' + formatNumber(delta)
                                    : ''}
                                </h6>
                              </div>
                            )}
                          </div>
                        );
                      })}
                  </div>
                </div>

                <div className="county-bar-right fadeInUp" style={trail[2]}>
                  {timeseries &&
                    (mapStatistic === 'republican' ||
                      mapStatistic === 'libertarian') && (
                      <div className="happy-sign">
                        {Object.keys(timeseries[stateCode]?.years || {})
                          .slice(-lookback)
                          .every(
                            (date) =>
                              getStatistic(
                                timeseries[stateCode].years[date],
                                'delta',
                                mapStatistic
                              ) === 0
                          ) && (
                          <div
                            className={`alert ${
                              mapStatistic === 'republican' ? 'is-green' : ''
                            }`}
                          ></div>
                        )}
                      </div>
                    )}
                  <DeltaBarGraph
                    timeseries={timeseries?.[stateCode]?.years}
                    statistic={mapStatistic}
                    {...{stateCode, lookback}}
                    forceRender={!!timeseriesResponseError}
                  />
                </div>
              </div>

              <div className="county-bar-bottom">
                {Object.keys(data?.[stateCode]?.counties || {}).length > 5 ? (
                  <button
                    className="button fadeInUp"
                    onClick={toggleShowAllCounties}
                    style={trail[3]}
                  >
                    <span>{showAllCounties ? `View less` : `View all`}</span>
                  </button>
                ) : (
                  <div style={{height: '3.75rem', flexBasis: '15%'}} />
                )}
              </div>
            </div>

            <Suspense fallback={<div />}>
              <TimeseriesExplorer
                {...{
                  stateCode,
                  timeseries,
                  regionHighlighted,
                  setRegionHighlighted,
                }}
                forceRender={!!timeseriesResponseError}
              />
            </Suspense>
          </React.Fragment>
        </div>
      </div>

      <Footer />
    </React.Fragment>
  );
}

export default React.memo(State);
