/* eslint-disable react/jsx-key */
import Footer from './Footer';
import { API_ROOT_URL } from '../constants';
import {fetcher} from '../utils/commonFunctions';
import useSWR from 'swr';
import React, { useRef, Suspense } from 'react';
import { Helmet } from 'react-helmet';
import { AgGridColumn, AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine-dark.css';
import useDarkMode from 'use-dark-mode';
import { useTimeout } from '../hooks/useTimeout';

function ExitPolls() {
  const darkMode = useDarkMode(false);
  const grid = useRef(null)
  useTimeout(
    () => {
      const gridDiv = document.querySelector('#grid');
      if (darkMode.value) {
        gridDiv.classList.add('ag-theme-alpine-dark');
        gridDiv.classList.remove('ag-theme-alpine')
      }
      else {
        gridDiv.classList.remove('ag-theme-alpine-dark')
        gridDiv.classList.add('ag-theme-alpine')
      }
    },
    0,
    darkMode
  );

  const {data: rowData} = useSWR(
    `${API_ROOT_URL}/exitpolls`,
    fetcher,
    {
      revalidateOnFocus: true,
    }
  );

  return (
    <React.Fragment>
      <Helmet>
        <title>Exit Polls - General Election 2020 USA</title>
        <meta name="title" content="Exit Polls - General Election 2020 USA" />
      </Helmet>
      <div className="jumbotron">
        <h1>Exit Polls</h1>
      </div>
      <div className="Polls">
        <Suspense fallback={<div style={{ height: '50rem' }} />}>
          <div id='grid' className="ag-theme-alpine-dark" style={{ width: '100%' }}>
            <AgGridReact ref={grid} defaultColDef={{ sortable: true, filter: true, resizable: true, width: '130%' }}
              rowData={rowData} pagination={true} paginationPageSize={25} domLayout='autoHeight'>
              <AgGridColumn field="Poll source" width='150%'></AgGridColumn>
              <AgGridColumn field="Date" width='150%'></AgGridColumn>
              <AgGridColumn field="Sample size"  ></AgGridColumn>
              <AgGridColumn field="Margin of error" ></AgGridColumn>
              <AgGridColumn field="Donald Trump (Republican)"></AgGridColumn>
              <AgGridColumn field="Joe Biden (Democratic)"></AgGridColumn>
              <AgGridColumn field="Jo Jorgensen (Libertarian)" ></AgGridColumn>
              <AgGridColumn field="Howie Hawkins (Green)" ></AgGridColumn>
              <AgGridColumn field="Other" ></AgGridColumn>
              <AgGridColumn field="Abstention" ></AgGridColumn>
              <AgGridColumn field="Undecided" ></AgGridColumn>
              <AgGridColumn field="Lead" ></AgGridColumn>
            </AgGridReact>
          </div>
        </Suspense>
      </div>
      <Footer />
    </React.Fragment>
  );
}

export default ExitPolls;
