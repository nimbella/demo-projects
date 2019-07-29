import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { scaleTime } from "d3-scale";
import { curveMonotoneX } from "d3-shape";
import { format } from "d3-format";
import { timeFormat } from "d3-time-format";

import { ChartCanvas, Chart } from "react-stockcharts";
import { discontinuousTimeScaleProvider } from "react-stockcharts/lib/scale";
import { macd } from "react-stockcharts/lib/indicator";
import { AreaSeries } from "react-stockcharts/lib/series";
import { XAxis, YAxis } from "react-stockcharts/lib/axes";
import { fitWidth } from "react-stockcharts/lib/helper";

import { CrossHairCursor, MouseCoordinateX, MouseCoordinateY } from "react-stockcharts/lib/coordinates";
import { OHLCTooltip } from "react-stockcharts/lib/tooltip";

import '../css/Charts.css';

class Charts extends Component {
  render() {
    // Configs
    const options = {
      height: 400,
      margin: {
        left: 50,
        right: 20,
        top: 30,
        bottom: 30
      },
      type: 'svg',
      lineColor: '#55BFD1',
      lineWidth: 2,
      strokeColor: '#B2B2B2',
      tooltipLocation: {
        x: -35,
        y: -20
      },
      fontSize: 14
    };

    const macdCalculator = macd()
        .options({ fast: 12, slow: 26, signal: 9 })
        .merge((d, c) => { d.macd = c; })
        .accessor(d => d.macd);
    const { data: initialData, width, ratio } = this.props;
    const calculatedData = macdCalculator(initialData);
    const xScaleProvider = discontinuousTimeScaleProvider.inputDateAccessor(d => d.date);
    const { data, displayXAccessor } = xScaleProvider(calculatedData);

    return (
        <div className="row">
          <ChartCanvas
              ratio={ ratio } width={ width + 20 } height={ options.height }
              margin={{
                left: options.margin.left,
                right: options.margin.right,
                top: options.margin.top,
                bottom: options.margin.bottom }}
              seriesName="MSFT"
              data={ data } type={ options.type }
              xAccessor={ d => d.date }
              displayXAccessor={ displayXAccessor }
              xScale={ scaleTime() }
              xExtents={ [new Date(
                  data[0].date.getFullYear(),
                  data[0].date.getMonth(),
                  data[0].date.getDate()
              ), new Date(
                  data.slice(-1)[0].date.getFullYear(),
                  data.slice(-1)[0].date.getMonth(),
                  data.slice(-1)[0].date.getDate()
              )] }
          >
            <Chart id={ 0 } yExtents={ d => d.close }>
              <defs>
                <linearGradient id="MyGradient" x1="0" y1="100%" x2="0" y2="0%">
                  <stop offset="0%" stopColor={ options.lineColor } stopOpacity={ 0.1 } />
                  <stop offset="70%" stopColor={ options.lineColor } stopOpacity={ 0.3 } />
                  <stop offset="100%"  stopColor={ options.lineColor } stopOpacity={ 0.5 } />
                </linearGradient>
              </defs>
              <XAxis
                  axisAt="bottom"
                  orient="bottom"
                  ticks={ 6 }
                  stroke={ options.strokeColor }
                  fontSize={ options.fontSize }
              />
              <YAxis
                  axisAt="left"
                  orient="left"
                  stroke={ options.strokeColor }
                  fontSize={ options.fontSize }
              />

              <MouseCoordinateX
                  at="bottom"
                  orient="bottom"
                  displayFormat={ timeFormat("%Y-%m-%d") }
              />
              <MouseCoordinateY
                  at="left"
                  orient="left"
                  displayFormat={ format(".2f") }
              />

              <AreaSeries
                  yAccessor={ d => d.close }
                  fill="url(#MyGradient)"
                  strokeWidth={ options.lineWidth }
                  stroke={ options.lineColor }
                  interpolation={ curveMonotoneX }
              />
              <OHLCTooltip
                  origin={ [options.tooltipLocation.x, options.tooltipLocation.y] }
                  labelFill={ options.lineColor }
                  textFill={ options.lineColor }
                  fontSize={ options.fontSize }
              />
            </Chart>
            <CrossHairCursor />
          </ChartCanvas>
        </div>
    );


  }
}

Charts.propTypes = {
  data: PropTypes.array.isRequired,
  width: PropTypes.number.isRequired,
  ratio: PropTypes.number.isRequired
};

Charts = fitWidth(Charts);

export default Charts;