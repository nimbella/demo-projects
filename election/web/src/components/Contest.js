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
        <h1>Don't let the year 2020 be a drag</h1>
        <p>Extend these election-related APIs/app and build your own election app to inspire your friends, family <span role="img" aria-label="family">👪</span>, and everyone you know to win <span role="img" aria-label="award">🏆</span> $2020.</p>
       <a href="https://nimbella.com/election2020" rel="noopener noreferrer"  target="_blank">
        <img alt="Election2020ContestBanner" src={banner} />
        </a>
      </div>      
      <Footer />
    </React.Fragment>
  );
}
export default Contest;
