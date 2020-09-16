import React from 'react';
import useScript from '../hooks/useScript';
import { useTimeout } from '../hooks/useTimeout';
import { Helmet } from 'react-helmet';
import Footer from './Footer';
import useDarkMode from 'use-dark-mode';

function VoterInfo() {
  const darkMode = useDarkMode(false);
  useTimeout(
    () => {
      const searchDiv = document.querySelectorAll('#_vit div,nav');
      darkMode.value
        ? searchDiv.forEach((e) => e.classList.add('dark-mode'))
        : searchDiv.forEach((e) => e.classList.remove('dark-mode'));
    },
    200,
    darkMode
  );

  useScript(null, `vit.load({
      modal: true,
      officialOnly: false,
      colors: {
        'header': '#229acd',
        'landscapeBackgroundHeader': '#228a9d'
      },
      language: 'en',
  });`);

  return (
    <React.Fragment>
      <Helmet>
        <title>Vote Info - General Election 2020 USA</title>
        <meta
          name="title"
          content="Vote Info - General Election 2020 USA Related Information"
        />
      </Helmet>
      <div className="jumbotron">
        <h1>Voter Information</h1>
        <h2>
          Find out where to vote, what's on your ballot, and more...
        </h2>
      </div>
      <div id="_vit"></div>
      <Footer />
    </React.Fragment>
  );
};

export default VoterInfo;
