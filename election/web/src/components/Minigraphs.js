import {PRIMARY_STATISTICS, STATISTIC_CONFIGS} from '../constants';
import {getStatistic, getLastElectionYear, getFirstElectionYear} from '../utils/commonFunctions';

import classnames from 'classnames';
import {max} from 'd3-array';
import {interpolatePath} from 'd3-interpolate-path';
import {scaleTime, scaleLinear} from 'd3-scale';
import {select} from 'd3-selection';
import {line, curveMonotoneX} from 'd3-shape';
// eslint-disable-next-line
import {transition} from 'd3-transition';
import equal from 'fast-deep-equal';
import React, {useEffect, useRef, useMemo} from 'react';

// Dimensions
const [width, height] = [100, 75];
const margin = {top: 10, right: 10, bottom: 2, left: 5};

function Minigraphs({timeseries, date: timelineDate}) {
  const refs = useRef([]);

  const years = useMemo(() => {
    const cutOffYearUpper = timelineDate || getLastElectionYear();
    const pastYears = Object.keys(timeseries || {}).filter(
      (year) => year <= cutOffYearUpper
    );
    const cutOffDateLower = getFirstElectionYear();
    return pastYears.filter((year) => year >= cutOffDateLower);
  }, [timeseries, timelineDate]);

  useEffect(() => {
    const T = years.length;

    const chartRight = width - margin.right;
    const chartBottom = height - margin.bottom;

    const xScale = scaleTime()
      .clamp(true)
      .domain(T ? [years[0], years[T - 1]] : [])
      .range([margin.left, chartRight]);

    refs.current.forEach((ref, index) => {
      const svg = select(ref);
      const statistic = PRIMARY_STATISTICS[index];
      const color = STATISTIC_CONFIGS[statistic].color;

      const dailyMaxAbs = max(years, (year) =>
        Math.abs(getStatistic(timeseries[year], 'delta', statistic))
      );

      const yScale = scaleLinear()
        .clamp(true)
        .domain([-dailyMaxAbs, dailyMaxAbs])
        .range([chartBottom, margin.top]);

      const linePath = line()
        .curve(curveMonotoneX)
        .x((year) => xScale(year))
        .y((year) =>
          yScale(getStatistic(timeseries[year], 'delta', statistic))
        );

      let pathLength;
      svg
        .selectAll('path')
        .data(T ? [years] : [])
        .join(
          (enter) =>
            enter
              .append('path')
              .attr('fill', 'none')
              .attr('stroke', color + '99')
              .attr('stroke-width', 2.5)
              .attr('d', linePath)
              .attr('stroke-dasharray', function () {
                return (pathLength = this.getTotalLength());
              })
              .call((enter) =>
                enter
                  .attr('stroke-dashoffset', pathLength)
                  .transition()
                  .delay(100)
                  .duration(2500)
                  .attr('stroke-dashoffset', 0)
              ),
          (update) =>
            update
              .attr('stroke-dasharray', null)
              .transition()
              .duration(500)
              .attrTween('d', function (date) {
                const previous = select(this).attr('d');
                const current = linePath(date);
                return interpolatePath(previous, current);
              })
        );

      svg
        .selectAll('circle')
        .data(T ? [years[T - 1]] : [])
        .join(
          (enter) =>
            enter
              .append('circle')
              .attr('fill', color)
              .attr('r', 2.5)
              .attr('cx', (year) => xScale(year))
              .attr('cy', (year) =>
                yScale(getStatistic(timeseries[year], 'delta', statistic))
              )
              .style('opacity', 0)
              .call((enter) =>
                enter
                  .transition()
                  .delay(2100)
                  .duration(500)
                  .style('opacity', 1)
                  .attr('cx', (year) => xScale(year))
                  .attr('cy', (year) =>
                    yScale(getStatistic(timeseries[year], 'delta', statistic))
                  )
              ),
          (update) =>
            update
              .transition()
              .duration(500)
              .attr('cx', (year) => xScale(year))
              .attr('cy', (year) =>
                yScale(getStatistic(timeseries[year], 'delta', statistic))
              )
        );
    });
  }, [years, timeseries]);

  return (
    <div className="Minigraph">
      {PRIMARY_STATISTICS.map((statistic, index) => (
        <div key={statistic} className={classnames('svg-parent')}>
          <svg
            ref={(el) => {
              refs.current[index] = el;
            }}
            width={width}
            height={height}
            viewBox={`0 0 ${width} ${height}`}
            preserveAspectRatio="xMidYMid meet"
          />
        </div>
      ))}
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
  } else if (!equal(currProps.stateCode, prevProps.stateCode)) {
    return false;
  } else if (!equal(currProps.date, prevProps.date)) {
    return false;
  }
  return true;
};

export default React.memo(Minigraphs, isEqual);
