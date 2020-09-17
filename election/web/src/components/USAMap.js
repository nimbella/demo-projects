import USAState from './USAState';
import data from '../data/usa-map-dimensions';

import PropTypes from 'prop-types';
import React from 'react';

class USAMap extends React.Component {
  clickHandler = (stateAbbreviation) => {
    this.props.onClick(stateAbbreviation);
  };

  fillStateColor = (state) => {
    if (
      this.props.customize &&
      this.props.customize[state] &&
      this.props.customize[state].fill
    ) {
      return this.props.customize[state].fill;
    }

    return this.props.defaultFill;
  };

  stateClickHandler = (state) => {
    if (
      this.props.customize &&
      this.props.customize[state] &&
      this.props.customize[state].clickHandler
    ) {
      return this.props.customize[state].clickHandler;
    }
    return this.clickHandler;
  };

  buildPaths = () => {
    const paths = [];
    // eslint-disable-next-line guard-for-in
    for (const stateKey in data) {
      const path = (
        <USAState
          key={stateKey}
          stateName={data[stateKey].name}
          dimensions={data[stateKey]['dimensions']}
          state={stateKey}
          fill={this.fillStateColor(stateKey)}
          onClickState={this.stateClickHandler(stateKey)}
        />
      );
      paths.push(path);
    }
    return paths;
  };

  render() {
    return (
      <svg
        className="us-state-map"
        xmlns="http://www.w3.org/2000/svg"
        width={this.props.width}
        height={this.props.height}
        viewBox="0 0 959 593"
      >
        <title>{this.props.title}</title>
        <g className="outlines">
          {this.buildPaths()}
          <g className="DC state">
            <path
              className="DC1"
              fill={this.fillStateColor('DC1')}
              d="M801.8,253.8 l-1.1-1.6 -1-0.8 1.1-1.6 2.2,1.5z"
            />
            <circle
              className="DC2"
              onClick={this.clickHandler}
              data-name={'DC'}
              fill={this.fillStateColor('DC2')}
              stroke="#FFFFFF"
              strokeWidth="1.5"
              cx="801.3"
              cy="251.8"
              r="5"
              opacity="1"
            />
          </g>
        </g>

        <g id="text" fontFamily="Helvetica Neue" fontWeight="bold">
          <g fontSize="14">
            <text id="AKn" x="110" y="504">
              3
            </text>
            <text id="HIn" x="261" y="565">
              4
            </text>
            <text id="WAn" x="105" y="62">
              12
            </text>
            <text id="ORn" x="88" y="136">
              7
            </text>
            <text id="CAn" x="55" y="298">
              55
            </text>
            <text id="NVn" x="120" y="242">
              6
            </text>
            <text id="AZn" x="182" y="368">
              11
            </text>
            <text id="UTn" x="209" y="265">
              6
            </text>
            <text id="IDn" x="183" y="162">
              4
            </text>
            <text id="MTn" x="270" y="100">
              3
            </text>
            <text id="WYn" x="290" y="191">
              3
            </text>
            <text id="COn" x="311" y="283">
              9
            </text>
            <text id="NMn" x="290" y="381">
              5
            </text>
            <text id="TXn" x="410" y="458">
              38
            </text>
            <text id="OKn" x="451" y="370">
              7
            </text>
            <text id="KSn" x="434" y="303">
              6
            </text>
            <text id="NEn" x="411" y="232">
              5
            </text>
            <text id="SDn" x="405" y="170">
              3
            </text>
            <text id="NDn" x="405" y="103">
              3
            </text>
            <text id="MNn" x="484" y="129">
              10
            </text>
            <text id="WIn" x="561" y="163">
              10
            </text>
            <text id="ILn" x="579" y="261">
              20
            </text>
            <text id="IAn" x="513" y="224">
              6
            </text>
            <text id="MOn" x="525" y="306">
              10
            </text>
            <text id="ARn" x="534" y="384">
              6
            </text>
            <text id="LAn" x="536" y="452">
              8
            </text>
            <text id="MSn" x="587" y="428">
              6
            </text>
            <text id="ALn" x="641" y="422">
              9
            </text>
            <text id="GAn" x="697" y="419">
              16
            </text>
            <text id="FLn" x="743" y="505">
              29
            </text>
            <text id="SCn" x="745" y="380">
              9
            </text>
            <text id="NCn" x="763" y="342">
              15
            </text>
            <text id="TNn" x="633" y="353">
              11
            </text>
            <text id="KYn" x="666" y="311">
              8
            </text>
            <text id="INn" x="630" y="262">
              11
            </text>
            <text id="MIn" x="645" y="193">
              16
            </text>
            <text id="OHn" x="685" y="248">
              18
            </text>
            <text id="WVn" x="730" y="281">
              5
            </text>
            <text id="VAn" x="767" y="294">
              13
            </text>
            <text id="PAn" x="764" y="220">
              20
            </text>
            <text id="NYn" x="798" y="167">
              29
            </text>
            <text id="MEn" x="884" y="90">
              4
            </text>
          </g>
          <g fontSize="14">
            <text id="NHn" x="800" y="58">
              NH 4
            </text>
            <text id="VTn" x="790" y="82">
              VT 3
            </text>
            <text id="MAn" x="927" y="164">
              MA 11
            </text>
            <text id="RIn" x="925" y="199">
              RI 4
            </text>
            <text id="CTn" x="918" y="228">
              CT 7
            </text>
            <text id="NJn" x="898" y="260">
              NJ 14
            </text>
            <text id="DEn" x="891" y="284">
              DE 3
            </text>
            <text id="MDn" x="883" y="305">
              MD 10
            </text>
            <text id="DCn" x="864" y="327">
              DC 3
            </text>
          </g>
        </g>
        <path
          id="lines"
          d="M844,62l13,29 M832,86l8,17 M889,153l34,3 M882,178l41,12 M866,184l51,33 M845,230l50,22 M837,250l51,26 M833,261l46,33 M800,251l61,61"
          stroke="#000000"
          strokeWidth="1.6"
        />
        {/* <path
          id="frames"
          fill="none"
          stroke="#A9A9A9"
          stroke-width="2"
          d="M215,493v55l36,45 M0,425h147l68,68h85l54,54v46"
        /> */}
      </svg>
    );
  }
}

USAMap.propTypes = {
  onClick: PropTypes.func.isRequired,
  width: PropTypes.number,
  height: PropTypes.number,
  title: PropTypes.string,
  defaultFill: PropTypes.string,
  customize: PropTypes.object,
};

USAMap.defaultProps = {
  onClick: () => {},
  width: 959,
  height: 593,
  defaultFill: '#D3D3D3',
  title: 'Blank US states map',
  customize: {},
};

export default USAMap;
