import Footer from './Footer';

import definition from '../data/google_civic_information.json';
import { useTimeout } from '../hooks/useTimeout';
// import useScript from '../hooks/useScript';
import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Lincoln from 'react-lincoln';
import useDarkMode from 'use-dark-mode';

function API() {
  const darkMode = useDarkMode(false);
  useTimeout(
    () => {
      const apiDiv = document.querySelectorAll('div.Api div,nav');
      darkMode.value
        ? apiDiv.forEach((e) => e.classList.add('dark-mode'))
        : apiDiv.forEach((e) => e.classList.remove('dark-mode'));
    },
    1 * 500,
    darkMode
  );
  // useScript('../utils/postman.js');
  return (
    <React.Fragment>
      <Helmet>
        <title>Nimbella API - General Election 2020 USA</title>
        <meta
          name="title"
          content="Nimbella API - General Election 2020 USA Related Information"
        />
      </Helmet>

      <div className="jumbotron">
        <h1>Nimbella API for General Election 2020 USA</h1>
        <h2>
          Look up the representatives, polling places, early vote location,
          candidate data, and other election official information.
        </h2>
        <div className="postman-run-button" data-postman-action="collection/import" data-postman-var="8dcbd2a6e1ca1550ff48">
        </div>
      </div>
      <div className="Api">
        <Lincoln definition={definition} {...{ darkMode }} />
      </div>
      <Footer />
    </React.Fragment>
  );
}
export default API;