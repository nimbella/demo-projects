/* eslint-disable react/jsx-key */
import Footer from './Footer';

import GenericTable from '../utils/genericTable';

import React, {useState, useEffect, useMemo} from 'react';
import {Helmet} from 'react-helmet';
import styled from 'styled-components';

const Styles = styled.div`
  padding: 1rem;

  .table {
    ${''}
    display: block;
    ${''}
    overflow: auto;

    border-spacing: 0;
    border: 1px solid black;

    .thead {
      ${''}
      overflow-y: auto;
      overflow-x: hidden;
    }

    .tbody {
      ${''}
      overflow-y: scroll;
      overflow-x: hidden;
      height: 250px;
    }

    .tr {
      :last-child {
        .td {
          border-bottom: 0;
        }
      }
      border-bottom: 1px solid black;
    }

    .th,
    .td {
      margin: 0;
      padding: 0.5rem;
      border-right: 1px solid black;

      ${''}
      position: relative;

      :last-child {
        border-right: 0;
      }

      .resizer {
        right: -5px;
        background: blue;
        width: 10px;
        height: 100%;
        position: absolute;
        top: 0;
        z-index: 1;
        ${''}
        touch-action:none;

        &.isResizing {
          background: red;
        }
      }
    }

    .th {
      &:last-of-type {
        .resizer {
          ${''}
          ${''}
          right: -15px;
        }
      }
    }
  }
`;

function ExitPolls() {
  const [data, setData] = useState([]);

  useEffect(() => {
    (async () => {
      const result = await (
        await fetch(
          'https://apigcp.nimbella.io/api/v1/web/raichand-8kehpaun1bf/ge2020/exitpolls'
        )
      ).json();
      setData(result);
    })();
  }, []);

  const columns = useMemo(
    () => [
      {
        Header: 'Poll Source',
        accessor: 'Poll source',
      },
      {
        Header: 'Date',
        accessor: 'Date',
      },
      {
        Header: 'Sample size',
        accessor: 'Sample size',
      },
      {
        Header: 'Margin of error',
        accessor: 'Margin of error',
      },
      {
        Header: 'Donald Trump (Republican)',
        accessor: 'Donald Trump (Republican)',
      },
      {
        Header: 'Joe Biden (Democratic)',
        accessor: 'Joe Biden (Democratic)',
      },
      {
        Header: 'Jo Jorgensen (Libertarian)',
        accessor: 'Jo Jorgensen (Libertarian)',
      },
      {
        Header: 'Howie Hawkins (Green)',
        accessor: 'Howie Hawkins (Green)',
      },
      {
        Header: 'Other',
        accessor: 'Other',
      },
      {
        Header: 'Abstention',
        accessor: 'Abstention',
      },
      {
        Header: 'Undecided',
        accessor: 'Undecided',
      },
      {
        Header: 'Lead',
        accessor: 'Lead',
      },
    ],
    []
  );

  return (
    <React.Fragment>
      <Helmet>
        <title>Exit Polls - General Election 2020 USA</title>
        <meta name="title" content="Exit Polls - General Election 2020 USA" />
      </Helmet>
      <div className="jumbotron">
        <h1>Exit Polls</h1>
        <h2></h2>
      </div>
      <div className="Map">
        <Styles>
          <GenericTable columns={columns} data={data} />
        </Styles>
      </div>
      <Footer />
    </React.Fragment>
  );
}

export default ExitPolls;
