import Footer from './Footer';
import React, { useEffect } from 'react';
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
          The Github project for this React application is <a href="https://github.com/nimbella/demo-projects/tree/master/election" target="_blank" rel="noopener noreferrer">here</a>:
      </h2>
        <p>This project is built with a React front-end for the user interface. The front-end is backed by the <a href="#/api">Nimbella Election API</a>. As an example, let's show you how to share exit poll data in your application.</p>
        <p>It's as simple as 1, 2, 3 &amp; deploy.</p>
        <ol>
          <li>
            <p>In your front-end React application, import the following.</p>
            <SyntaxHighlighter language="javascript" showLineNumbers style={darkMode.value ? darcula : prism}>
              {
                `import {API_ROOT_URL} from "../constants";
import React, {useState, useEffect, useRef} from "react";
import {AgGridColumn, AgGridReact} from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";`
              }
            </SyntaxHighlighter>
          </li>
          <li>
            <p>Add this function to make the API call and retrieve the relevant data.</p>
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
          </li>
          <li>
            <p>Render the data in the <b>return()</b> block.</p>
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
          </li>
        </ol>
        <p>You're one <b>deploy</b> step away from sharing your inspiration with the world.</p>
        <h2>How to deploy your project</h2>
        <p>
          This project is built for the Nimbella cloud. This means you can share your project with the world by deploying the application
          to the cloud. The benefits of this approach are:
        </p>
        <ul>
          <li>You will get a dedicated domain name for your project.</li>
          <li>Your domain is automatically secured with an SSL certificate so all traffic is encrypted.</li>
          <li>The front-end is served from a globally Content Delivery Network (CDN).</li>
          <li>Your API calls run as needed, with no servers for you to run.</li>
        </ul>


        <p>You will need a <a href="https://developers.google.com/civic-information" target="_blank" rel="noopener noreferrer">Google Civic Information API key</a> for several of the endpoints.</p>
        <ul>
          <li>You may create an API key from the <a href="https://console.cloud.google.com/" target="_blank" rel="noopener noreferrer">Google cloud console</a> by navigating to
            <SyntaxHighlighter language="javascript" style={darkMode.value ? darcula : prism}> APIs &amp; Services &gt; Credentials &gt; Create credentials &gt; API key</SyntaxHighlighter>
          </li>
          <li>You should restrict the key before using it by clicking <b>Restrict Key</b> and selecting Google Civic Information API.</li>
        </ul>

        <p>The project is deployed to the Nimbella cloud with one command: <b>nim project deploy</b>. Here is how.</p>
        <ol>
          <li> Install the <a href="https://nimbella.io/downloads/nim/nim.html#install-the-nimbella-command-line-tool-nim" target="_blank" rel="noopener noreferrer">Nimbella command line tool called <code>nim</code></a></li>
          <li> Run <b>nim login</b> to sign up (or login if you have an existing account). We strongly recommend signing up with a GitHub id.</li>
          <li>Deploy this project directly from GitHub if you signed up with a GitHub id.</li>
        </ol>
        <SyntaxHighlighter language="javascript" style={darkMode.value ? darcula : prism}>
          GOOGLE_CIVIC_API_TOKEN=&lt;your_google_api_key&gt;  nim project deploy github:nimbella/demo-projects/election
        </SyntaxHighlighter>
        <p>If you are in a hurry and don't want to grab a <a href="https://developers.google.com/civic-information" target="_blank" rel="noopener noreferrer">Google Civic Information API Key</a> yet, you can still deploy and use this app. Simply clone this repo locally, prepend the <b>API_ROOT_URL</b> value with <b>https://electiondemo-apigcp.nimbella.io</b> in <b>constants.js</b> and deploy using `nim project deploy demo-projects/election`. That's it, you can skip below steps.</p>

        <p>If you did not sign up with a GitHub id, then clone the project locally first, then deploy. This is because the GitHub rate limits are too low to deploy without cloning unless you're authenticated with GitHub.</p>
        <SyntaxHighlighter language="javascript" style={darkMode.value ? darcula : prism}>
          {`git clone https://github.com/nimbella/demo-projects.git
export GOOGLE_CIVIC_API_TOKEN=<your_google_api_key>
nim project deploy demo-projects/election`}
        </SyntaxHighlighter>


        <p>You may save your <b>GOOGLE_CIVIC_API_TOKEN</b> to a file called <b>.env</b>. See the template in [<b>.env-template</b>] as an example. This file should be located at the root of your election project.</p>

        <h2>How to share your project?</h2>
        <p>The output of <b>nim project deploy</b> will include a URL to where your application is running in the Nimbella cloud. You may also find this URL by running <b>nim auth current --web</b>.</p>
        <p>An example output of the project deployment follows.</p>
        <SyntaxHighlighter language="javascript" style={darkMode.value ? darcula : prism}>
          {`Deployed 106 web content items to
          https://<your-account>-apigcp.nimbella.io
          Deployed actions:
          - ge2020/counties
          - ge2020/divisions
          - ge2020/elections
          - ge2020/exitpolls
          - ge2020/news
          - ge2020/reps
          - ge2020/resources
          - ge2020/state_counties
          - ge2020/timeseries
          - ge2020/voterinfo`}
        </SyntaxHighlighter>
      </div>
      <Footer />
    </React.Fragment>
  );
}
export default Build;
