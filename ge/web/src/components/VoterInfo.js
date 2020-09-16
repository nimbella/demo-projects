import React from 'react';
import useScript from '../hooks/useScript';
import { Helmet } from 'react-helmet';
import Footer from './Footer';

function VoterInfo() {
  useScript(null,`vit.load({
    modal: true,
    officialOnly: false,

    colors: {
      'header': '#229acd',
      'landscapeBackgroundHeader': '#228a9d'
    },
    language: 'en',
  });
  `);
  return (
    <React.Fragment>
      <Helmet>
        <title>Vote Info - General Election 2020 USA</title>
        <meta
          name="title"
          content="Vote Info - General Election 2020 USA Related Information"
        />
      </Helmet>
      <div className="jumbotron" id="_vit"></div>
      <Footer />
    </React.Fragment>
  );
};

export default VoterInfo;
