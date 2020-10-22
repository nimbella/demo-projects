## Inspiration

John F. Kennedy, the 35th president of the United States, once said _"The ignorance of one voter in a democracy impairs the security of all."_ The importance of free and easily accessible information can never be overestimated. With November around the corner, it's election time!

We created this project to aggregate election-related services into a convenient set of APIs and an example Cloud application. You can use these powerful APIs to quickly build and run your own Election cloud applications, or customize our example application with your own inspirations. Then, deploy your project to the cloud with one command so you can easily share it your friends, family, and everyone you know. Your ideas can increase awareness of the upcoming 2020 Election and inspire others to vote.

This application uses election-related APIs to look up representatives, polling places, early voting locations, candidate data, and other election official information. The application is deployed to the Nimbella cloud, which for you means the easiest cloud development experience there is, with no fussy sign-ups, services or infrastructure to worry about for hosting your application. This is our burden, so you can get on with your inspiration.

The Nimbella Election APIs offer you maximum flexibility to create web pages and applications using all or selected parts of available data.
For example, you can use the APIs to:
- Visualize Party/Candidate and County/State voting trends from 1976 to 2016.
- Order the latest news available from prominent news sites in a timely fashion.

From Roald Dahl's unforgettable words _"Somewhere inside of all of us is the power to change the world."_; to Thomas Jefferson's truisms _"We do not have government by the majority. We have government by the majority who participate._", to Nanette L. Avery who puts it as _"Talk is cheap, voting is free; take it to the polls."_; there's something to inspire every activist and voter out there.

## Time to Act: an example

This project is built with a React front-end for the user interface. The front-end is backed by the Nimbella Election API.
As an example, let's show you how to share exit poll data in your application. It's as simple as 1, 2, 3 & deploy.

1. In your front-end React application, import the following.
```js
import { API_ROOT_URL } from "../constants";
import React, { useState, useEffect, useRef } from "react";
import { AgGridColumn, AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
```

2. Add this function to make the API call and retrieve the relevant data.
```js
const grid = useRef(null);
const [rowData, setRowData] = useState([]);
useEffect(() => {
  grid.current.api.showLoadingOverlay();
  fetch(`${API_ROOT_URL}/exitpolls`)
    .then((result) => result.json())
    .then((rowData) => {
      setRowData(rowData);
      grid.current.api.hideOverlay();
    });
}, []);
```

3. Render the data in the `return()` block.
```js
<div id="grid" className="ag-theme-alpine-dark" style={{ width: "80%" }}>
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
    domLayout="autoHeight"
  ></AgGridReact>
</div>
```

You're one `deploy` step away from sharing your inspiration with the world.

### How to deploy your project

This project is built for the Nimbella cloud. This means you can share your project with the world by deploying the application
to the cloud. The benefits of this approach are:
- You will get a dedicated domain name for your project.
- Your domain is automatically secured with an SSL certificate so all traffic is encrypted.
- The front-end is served from a globally Content Delivery Network (CDN).
- Your API calls run as needed, with no servers for you to run.

The project is deployed to the Nimbella cloud with one command: `nim project deploy`. Here is how.

1. Install the [Nimbella command line tool called `nim`](https://nimbella.io/downloads/nim/nim.html#install-the-nimbella-command-line-tool-nim).
2. Run `nim login` to sign up (or login if you have an existing account). We strongly recommend signing up with a GitHub id.
3. Deploy this project directly from GitHub if you signed up with a GitHub id.

```
GOOGLE_CIVIC_API_TOKEN=<your_google_api_key> \
  nim project deploy github:nimbella/demo-projects/election
```

If you are in a hurry and don't want to grab a [Google Civic Information API Key](https://developers.google.com/civic-information) yet, you can still deploy and use this app.
Simply clone this repo locally, prepend the `API_ROOT_URL` value with `https://electiondemo-apigcp.nimbella.io` in `constants.js` and deploy using `nim project deploy demo-projects/election`. That's it, you can skip below steps.


You will need a [Google Civic Information API Key](https://developers.google.com/civic-information) for several of the endpoints.
- You may create an API key from the [Google cloud console](https://console.cloud.google.com/) by navigating to
`APIs & Services > Credentials > Create credentials > API key`.
- You should restrict the key before using it by clicking `Restrict Key` and selecting Google Civic Information API.


If you did not sign up with a GitHub id, clone the project locally first, then deploy. This is because the GitHub rate limits are
too low to deploy without cloning unless you're authenticated with GitHub.

```
git clone https://github.com/nimbella/demo-projects.git
export GOOGLE_CIVIC_API_TOKEN=<your_google_api_key>
nim project deploy demo-projects/election
```

You may save your `GOOGLE_CIVIC_API_TOKEN` to a file called `.env`. See the template in [`.env-template`] as an example.
This file should be located at the root of your election project.


### How to share your project?

The output of `nim project deploy` will include a URL to where your application is running in the Nimbella cloud.
You may also find this URL by running `nim auth current --web`.

An example output of the project deployment follows.
```
Deployed 106 web content items to
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
  - ge2020/voterinfo
```

---
