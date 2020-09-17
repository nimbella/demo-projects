import {STATISTIC_CONFIGS, D3_TRANSITION_DURATION} from '../constants';
import {
  formatNumber,
  getLastElectionYear,
  getStatistic,
} from '../utils/commonFunctions';

import {min, max} from 'd3-array';
import {axisBottom} from 'd3-axis';
import {scaleBand, scaleLinear} from 'd3-scale';
import {select} from 'd3-selection';
// eslint-disable-next-line
import {transition} from 'd3-transition';
import equal from 'fast-deep-equal';
import React, {useEffect, useRef} from 'react';
import {useMeasure} from 'react-use';

const getDeltaStatistic = (data, statistic) => {
  return getStatistic(data, 'delta', statistic);
};

const margin = {top: 50, right: 0, bottom: 50, left: 0};

function DeltaBarGraph({timeseries, statistic, lookback}) {
  const svgRef = useRef();
  const [wrapperRef, {width, height}] = useMeasure();

  const pastYears = Object.keys(timeseries || {}).filter(
    (year) => year <= getLastElectionYear()
  );
  const years = pastYears.slice(-lookback);

  useEffect(() => {
    if (!width) return;
    const svg = select(svgRef.current);

    const chartRight = width - margin.right;
    const chartBottom = height - margin.bottom;
    const r = 5;

    // const formatTime = timeFormat('%e %b');
    const xScale = scaleBand()
      .domain(years)
      .range([margin.left, chartRight])
      .paddingInner(width / 1000);

    const yScale = scaleLinear()
      .domain([
        Math.min(
          0,
          min(years, (year) => getDeltaStatistic(timeseries?.[year], statistic))
        ),
        Math.max(
          1,
          max(years, (year) => getDeltaStatistic(timeseries?.[year], statistic))
        ),
      ])
      .range([chartBottom, margin.top]);

    const xAxis = axisBottom(xScale)
      .tickSize(0)
      .tickFormat((year) => year);

    const t = svg.transition().duration(D3_TRANSITION_DURATION);

    svg
      .select('.x-axis')
      .transition(t)
      .style('transform', `translateY(${yScale(0)}px)`)
      .call(xAxis)
      .on('start', () => svg.select('.domain').remove())
      .selectAll('text')
      .attr('y', 0)
      .attr('dy', (year, i) =>
        getDeltaStatistic(timeseries?.[year], statistic) < 0 ? '-1em' : '1.5em'
      )
      .style('text-anchor', 'middle')
      .attr('fill', STATISTIC_CONFIGS[statistic].color);

    svg
      .selectAll('.bar')
      .data(years)
      .join((enter) =>
        enter
          .append('path')
          .attr('class', 'bar')
          .attr('d', (year) =>
            roundedBar(xScale(year), yScale(0), xScale.bandwidth(), 0, r)
          )
      )
      .transition(t)
      .attr('d', (year) =>
        roundedBar(
          xScale(year),
          yScale(0),
          xScale.bandwidth(),
          yScale(0) - yScale(getDeltaStatistic(timeseries?.[year], statistic)),
          r
        )
      )
      .attr('fill', (year, i) => {
        return i < years.length - 1
          ? STATISTIC_CONFIGS[statistic].color + '90'
          : STATISTIC_CONFIGS[statistic].color;
      });

    const textSelection = svg
      .selectAll('.label')
      .data(years)
      .join('text')
      .attr('class', 'label')
      .attr('x', (year) => xScale(year) + xScale.bandwidth() / 2)
      .text((year) =>
        formatNumber(getDeltaStatistic(timeseries?.[year], statistic))
      );

    textSelection
      .transition(t)
      .attr('fill', STATISTIC_CONFIGS[statistic].color)
      .attr('y', (year) => {
        const val = getDeltaStatistic(timeseries?.[year], statistic);
        return yScale(val) + (val < 0 ? 15 : -6);
      });

    textSelection
      .append('tspan')
      .attr(
        'dy',
        (year) =>
          `${
            getDeltaStatistic(timeseries?.[year], statistic) < 0 ? 1.2 : -1.2
          }em`
      )
      .attr('x', (year) => xScale(year) + xScale.bandwidth() / 2)
      .text((year, i) => {
        if (i === 0) return '';
        const prevVal = getDeltaStatistic(
          timeseries?.[years[i - 1]],
          statistic
        );
        if (!prevVal) return '';
        const delta =
          getDeltaStatistic(timeseries?.[year], statistic) - prevVal;
        return `${delta > 0 ? '+' : ''}${formatNumber(
          (100 * delta) / Math.abs(prevVal)
        )}%`;
      })
      .transition(t)
      .attr('fill', STATISTIC_CONFIGS[statistic].color + '90');
  }, [years, height, statistic, timeseries, width]);

  return (
    <div className="DeltaBarGraph" ref={wrapperRef}>
      <svg
        ref={svgRef}
        width={width}
        height={250}
        viewBox={`0 0 ${width} ${height}`}
        preserveAspectRatio="xMidYMid meet"
      >
        <g className="x-axis" />
        <g className="y-axis" />
      </svg>
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
  } else if (!equal(prevProps.stateCode, currProps.stateCode)) {
    return false;
  } else if (!equal(prevProps.lookback, currProps.lookback)) {
    return false;
  } else if (!equal(prevProps.statistic, currProps.statistic)) {
    return false;
  }
  return true;
};

export default React.memo(DeltaBarGraph, isEqual);

function roundedBar(x, y, w, h, r) {
  r = Math.sign(h) * Math.min(Math.abs(h), r);
  const paths = [
    `M ${x} ${y}`,
    `v ${-h + r}`,
    `q 0 ${-r} ${Math.abs(r)} ${-r}`,
    `h ${w - 2 * Math.abs(r)}`,
    `q ${Math.abs(r)} 0 ${Math.abs(r)} ${r}`,
    `v ${h - r}`,
    'Z',
  ];
  return paths.join(' ');
}
