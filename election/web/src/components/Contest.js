import Footer from './Footer';
import React from 'react';
import {Helmet} from 'react-helmet';
import banner from '../img/Election2020ContestBanner.png';

function Contest() {
  return (
    <React.Fragment>
      <Helmet>
        <title>Contest - build, extend and end the year 2020 on a winning note.</title>
        <meta
          name="title"
          content="Contest - build, extend and end the year 2020 on a winning note."
        />
      </Helmet>
      <div className="jumbotron">
        <h1>Democracy is an active sport, let’s play our part.</h1>
        <h2>Don't let the year 2020 be a drag. Extend these election-related APIs/app and build your own election app to inspire your friends, family 👪, and everyone you know to win 🏆 $2020.</h2>
       <a href="https://nimbella.com/election2020" target="_blank">
        <img alt="Election2020ContestBanner" src={banner} />
        </a>
      </div>      
      <Footer />
    </React.Fragment>
  );
}
export default Contest;
