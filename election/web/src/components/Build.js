import Footer from './Footer';
import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import jsx from 'react-syntax-highlighter/dist/esm/languages/prism/jsx';
import { prism, darcula } from 'react-syntax-highlighter/dist/esm/styles/prism';
import useDarkMode from 'use-dark-mode';
function Build() {
  const darkMode = useDarkMode(false);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  SyntaxHighlighter.registerLanguage('jsx', jsx);
  return (
    <React.Fragment>
      <Helmet>
        <title>Build for US General Election 2020</title>
        <meta
          name="title"
          content="How to Build for US General Election 2020"
        />
      </Helmet>
      <div className="jumbotron">
        <h1>Build for US General Election 2020</h1>
      </div>
      <div className="Build">
        <h2>
          The Github project for this React application is <a href="https://github.com/nimbella/demo-projects/tree/master/election">here</a>:
      </h2>
        <p>It's also very easy to use the <a href="api">APIs</a> or the App components/snippets into an existing react app.
         To begin with let's say, you want to show the exit polls data in your react app. It's as simple as this.</p>
        <p> Top level imports:</p>
        <SyntaxHighlighter language="javascript" showLineNumbers style={darkMode.value ? darcula : prism}>
          {
            `import {API_ROOT_URL} from "../constants";
import React, {useState, useEffect, useRef} from "react";
import {AgGridColumn, AgGridReact} from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";`
          }
        </SyntaxHighlighter>

        <p> Function level:</p>
        <SyntaxHighlighter language="javascript" showLineNumbers style={darkMode.value ? darcula : prism}>
          {`const grid = useRef(null);
const [rowData, setRowData] = useState([]);
useEffect(() => {
  grid.current.api.showLoadingOverlay();
  fetch(\`\${API_ROOT_URL}/exitpolls\`)
  .then((result) => result.json())
  .then((rowData) => {
  setRowData(rowData);
  grid.current.api.hideOverlay();
  });
}, []);`}
        </SyntaxHighlighter>
        <p>Inside return:</p>
        <SyntaxHighlighter language="javascript" showLineNumbers style={darkMode.value ? darcula : prism}>
          {`<div id="grid" className="ag-theme-alpine" style={{ width: "80%" }}>
  <AgGridReact
            ref={grid}
            columnDefs={[
              { field: "Poll source" },
              { field: "Date" },
              { field: "Sample size" },
              { field: "Margin of error" },
              { field: "Donald Trump (Republican)" },
              { field: "Joe Biden (Democratic)" },
              { field: "Jo Jorgensen (Libertarian)" },
              { field: "Howie Hawkins (Green)" },
              { field: "Other" },
              { field: "Abstention" },
              { field: "Undecided" },
              { field: "Lead" },
            ]}
            defaultColDef={{ sortable: true, filter: true, resizable: true }}
            rowData={rowData}
            pagination={true}
            paginationPageSize={25}
            domLayout="autoHeight">
  </AgGridReact>
</div>`}
        </SyntaxHighlighter>

        <h2>Deploy this project to the Nimbella Cloud as a whole</h2>

        <p>If you have the <a href="https://nimbella.io/downloads/nim/nim.html#install-the-nimbella-command-line-tool-nim">Nimbella command line tool called <code>nim</code></a> installed, you can deploy this project directly from GitHub. Or, you can clone this repository and deploy it from the clone.</p>
        <ul>
        <li><p>To deploy from GitHub</p>
        <p><code>nim project deploy github:nimbella/demo-projects/election</code></p>
        </li>
        <li><p>If you have cloned the repository</p>
        <p><code>nim project deploy /path/to/election</code>
        </p>
        </li>
        </ul>

        <p>The output of this command will include a link to where the application is running in the cloud for your account.</p>

      </div>
      <Footer />
    </React.Fragment>
  );
}
export default Build;
