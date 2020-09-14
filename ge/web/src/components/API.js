import Footer from './Footer';

import definition from '../data/swagger.yaml';
import {useTimeout} from '../hooks/useTimeout';

import React, {useEffect} from 'react';
import {Helmet} from 'react-helmet';
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

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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
      </div>
      <div className="Api">
        <Lincoln definition={definition} {...{darkMode}} />
      </div>
      <Footer />
    </React.Fragment>
  );
}
export default API;
