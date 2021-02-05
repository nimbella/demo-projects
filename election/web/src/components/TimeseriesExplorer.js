import TimeseriesLoader from "./loaders/Timeseries";

import {
  TIMESERIES_CHART_TYPES,
  TIMESERIES_LOOKBACKS,
  STATE_NAMES,
} from "../constants";
import useIsVisible from "../hooks/useIsVisible";
import { getLastElectionYear } from "../utils/commonFunctions";

import { PinIcon, ReplyIcon } from "@primer/octicons-v2-react";
import classnames from "classnames";
import equal from "fast-deep-equal";
import React, { useCallback, useMemo, useRef, lazy, Suspense } from "react";
import { useLocalStorage, useSessionStorage } from "react-use";

const Timeseries = lazy(() => import("./Timeseries"));

function TimeseriesExplorer({
  stateCode,
  timeseries,
  date: timelineDate,
  regionHighlighted,
  setRegionHighlighted,
  anchor,
  setAnchor,
  expandTable,
}) {
  const [lookback, setLookback] = useSessionStorage(
    "timeseriesLookback",
    TIMESERIES_LOOKBACKS.BEGINNING
  );
  const [chartType, setChartType] = useLocalStorage("chartType", "total");
  const [isUniform, setIsUniform] = useLocalStorage("isUniform", true);
  const [isLog, setIsLog] = useLocalStorage("isLog", false);
  const explorerElement = useRef();
  const isVisible = useIsVisible(explorerElement, { once: true });

  const selectedRegion = useMemo(() => {
    if (timeseries?.[regionHighlighted.stateCode]?.counties) {
      return {
        stateCode: regionHighlighted.stateCode,
        countyName: regionHighlighted.countyName,
      };
    } else {
      return {
        stateCode: regionHighlighted.stateCode,
        countyName: null,
      };
    }
  }, [timeseries, regionHighlighted.stateCode, regionHighlighted.countyName]);

  const selectedTimeseries = useMemo(() => {
    if (selectedRegion.countyName) {
      return timeseries?.[selectedRegion.stateCode]?.counties?.[
        selectedRegion.countyName
      ]?.years;
    } else {
      return timeseries?.[selectedRegion.stateCode]?.years;
    }
  }, [timeseries, selectedRegion.stateCode, selectedRegion.countyName]);

  const regions = useMemo(() => {
    const states = Object.keys(timeseries || {})
      .filter((code) => code !== stateCode)
      .sort((code1, code2) =>
        STATE_NAMES[code1].localeCompare(STATE_NAMES[code2])
      )
      .map((code) => {
        return {
          stateCode: code,
          countyName: null,
        };
      });
    const counties = Object.keys(timeseries || {}).reduce((acc1, code) => {
      return [
        ...acc1,
        ...Object.keys(timeseries?.[code]?.counties || {}).reduce(
          (acc2, countyName) => {
            return [
              ...acc2,
              {
                stateCode: code,
                countyName: countyName,
              },
            ];
          },
          []
        ),
      ];
    }, []);

    return [
      {
        stateCode: stateCode,
        countyName: null,
      },
      ...states,
      ...counties,
    ];
  }, [timeseries, stateCode]);

  const dropdownRegions = useMemo(() => {
    if (
      regions.find(
        (region) =>
          region.stateCode === regionHighlighted.stateCode &&
          region.countyName === regionHighlighted.countyName
      )
    )
      return regions;
    return [
      ...regions,
      {
        stateCode: regionHighlighted.stateCode,
        countyName: regionHighlighted.countyName,
      },
    ];
  }, [regionHighlighted.stateCode, regionHighlighted.countyName, regions]);

  const years = useMemo(() => {
    const cutOffYearUpper = timelineDate || getLastElectionYear();
    const pastYears = Object.keys(selectedTimeseries || {}).filter(
      (date) => date <= cutOffYearUpper
    );

    if (lookback === TIMESERIES_LOOKBACKS.BEGINNING) {
      return pastYears;
    }

    let cutOffYearLower;
    if (lookback === TIMESERIES_LOOKBACKS.TWOK) {
      cutOffYearLower = 2000;
    } else if (lookback === TIMESERIES_LOOKBACKS.NINETY) {
      cutOffYearLower = 1990;
    }
    return pastYears.filter((date) => date >= cutOffYearLower);
  }, [selectedTimeseries, timelineDate, lookback]);

  const handleChange = useCallback(
    ({ target }) => {
      setRegionHighlighted(JSON.parse(target.value));
    },
    [setRegionHighlighted]
  );

  const resetDropdown = useCallback(() => {
    setRegionHighlighted({
      stateCode: stateCode,
      countyName: null,
    });
  }, [stateCode, setRegionHighlighted]);

  return (
    <div
      className={classnames(
        "TimeseriesExplorer fadeInUp",
        {
          stickied: anchor === "timeseries",
        },
        { expanded: expandTable }
      )}
      style={{ display: anchor === "mapexplorer" ? "none" : "" }}
      ref={explorerElement}
    >
      <div className="timeseries-header">
        <div
          className={classnames("anchor", {
            stickied: anchor === "timeseries",
          })}
          onClick={
            setAnchor &&
            setAnchor.bind(this, anchor === "timeseries" ? null : "timeseries")
          }
        >
          <PinIcon />
        </div>

        <h1>{"Voting Trends"}</h1>
        <div className="tabs">
          {Object.entries(TIMESERIES_CHART_TYPES).map(
            ([ctype, value], index) => (
              <div
                className={`tab ${chartType === ctype ? "focused" : ""}`}
                key={ctype}
                onClick={setChartType.bind(this, ctype)}
              >
                <h4>{value}</h4>
              </div>
            )
          )}
        </div>

        <div className="scale-modes">
          <label className="main">{"Scale Modes"}</label>
          <div className="timeseries-mode">
            <label htmlFor="timeseries-mode">{"Uniform"}</label>
            <input
              id="timeseries-mode"
              type="checkbox"
              className="switch"
              checked={isUniform}
              aria-label={"Checked by default to scale uniformly."}
              onChange={setIsUniform.bind(this, !isUniform)}
            />
          </div>
          <div
            className={`timeseries-logmode ${
              chartType !== "total" ? "disabled" : ""
            }`}
          >
            <label htmlFor="timeseries-logmode">{"Logarithmic"}</label>
            <input
              id="timeseries-logmode"
              type="checkbox"
              checked={chartType === "total" && isLog}
              className="switch"
              disabled={chartType !== "total"}
              onChange={setIsLog.bind(this, !isLog)}
            />
          </div>
        </div>
      </div>

      {dropdownRegions && (
        <div className="state-selection">
          <div className="dropdown">
            <select
              value={JSON.stringify(selectedRegion)}
              onChange={handleChange}
            >
              {dropdownRegions
                .filter(
                  (region) =>
                    STATE_NAMES[region.stateCode] !== region.countyName
                )
                .map((region) => {
                  return (
                    <option
                      value={JSON.stringify(region)}
                      key={`${region.stateCode}-${region.countyName}`}
                    >
                      {region.countyName
                        ? region.countyName
                        : STATE_NAMES[region.stateCode]}
                    </option>
                  );
                })}
            </select>
          </div>
          <div className="reset-icon" onClick={resetDropdown}>
            <ReplyIcon />
          </div>
        </div>
      )}

      <div className="pills">
        {Object.values(TIMESERIES_LOOKBACKS).map((option) => (
          <button
            key={option}
            type="button"
            className={classnames({ selected: lookback === option })}
            onClick={() => setLookback(option)}
          >
            {option}
          </button>
        ))}
      </div>

      {isVisible && (
        <Suspense fallback={<TimeseriesLoader />}>
          <Timeseries
            timeseries={selectedTimeseries}
            regionHighlighted={selectedRegion}
            {...{ years, chartType, isUniform, isLog }}
          />
        </Suspense>
      )}

      {!isVisible && <div style={{ height: "50rem" }} />}
    </div>
  );
}

const isEqual = (prevProps, currProps) => {
  if (currProps.forceRender) {
    return false;
  } else if (!currProps.timeseries && prevProps.timeseries) {
    return true;
  } else if (currProps.timeseries && !prevProps.timeseries) {
    return false;
  } else if (
    !equal(
      currProps.regionHighlighted.stateCode,
      prevProps.regionHighlighted.stateCode
    )
  ) {
    return false;
  } else if (
    !equal(
      currProps.regionHighlighted.countyName,
      prevProps.regionHighlighted.countyName
    )
  ) {
    return false;
  } else if (!equal(currProps.date, prevProps.date)) {
    return false;
  } else if (!equal(currProps.anchor, prevProps.anchor)) {
    return false;
  } else if (!equal(currProps.expandTable, prevProps.expandTable)) {
    return false;
  }
  return true;
};

export default React.memo(TimeseriesExplorer, isEqual);
