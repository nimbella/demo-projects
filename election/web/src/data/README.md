## Inspiration

35th president of the United States, John F. Kennedy once said

> The ignorance of one voter in a democracy impairs the security of all.

The importance of free and easily accessible information can never be overestimated. With November round the corner, it's election time!

Inspire your friends, family, and everyone you know to know more and vote in the 2020 Presidential Election by building, sharing or extending these election related APIs and App — backed by powerful serverless technology, these allow you to look up the representatives, polling places, early vote location, candidate data, and other election official information without the hassles of sign ups, auth keys or having to provision servers and worrying about hosting.

From Roald Dahl's unforgettable words about social change

> Somewhere inside of all of us is the power to change the world

to Thomas Jefferson's historic truisms

> We do not have government by the majority. We have government by the majority who participate

there's something to inspire just about every voter out there.

So let's build a nation of citizens armed with the tools and information to choose wisely.

Our Application Programming Interface (API) gives you maximum flexibility to create web pages and applications using all or selected parts of Nimbella Election APIs.
e.g.

- party/candidate wise, county/state wise voting trends since 1976 to 2016.
- categorized list of elections related APIs, Datasets and Websites available on www.
- latest news from prominent news sites ordered in timely fashion.

Lastly as Nanette L. Avery puts it

> Talk is cheap, voting is free; take it to the polls.

## Time to act
To begin with let's say, you want to show the exit polls data in your react app. It's as simple as 1,2,3.

Top level imports
```js
import { API_ROOT_URL } from "../constants";
import React, { useState, useEffect, useRef } from "react";
import { AgGridColumn, AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
```

Function level
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

Inside return()
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

### Deploy this project to the Nimbella Cloud as a whole

If you have the [Nimbella command line tool called `nim`](https://nimbella.io/downloads/nim/nim.html#install-the-nimbella-command-line-tool-nim) installed, you can deploy this project directly from GitHub. Or, you can clone this repository and deploy it from the clone.

- To deploy from GitHub

  `nim project deploy github:nimbella/demo-projects/ge`

- If you have cloned the repository

  `nim project deploy /path/to/ge`

The output of this command will include a link to where the application is running in the cloud for your account.

---
