import Footer from './Footer';
import Links from '../data/resources';
import React, {useEffect} from 'react';
import {Helmet} from 'react-helmet';

function Resources() {
  useEffect(() => {
    getResources();
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const getResources = () => {
    return Links.resources;
  };

  return (
    <React.Fragment>
      <Helmet>
        <title>Resources - US General Election 2020</title>
        <meta
          name="title"
          content="Resources Related to US General Election 2020"
        />
      </Helmet>
      <div className="jumbotron">
        <h1>Useful Links Related to US General Election</h1>
        <h2>APIs, Datasets, and Websites</h2>
      </div>
      <div className="Resources">
        {getResources().map((resource, index) => {
          return (
            <div
              key={index}
              className="faq fadeInUp"
              style={{animationDelay: `${0.5 + index * 0.1}s`}}
            >
              <a className="text" rel="noopener noreferrer" target="_blank" href={resource.link}>
                {resource.text}
              </a>
              <br />
              <span>{resource.category} </span>
              <span className="link">{resource.subcategory}</span>
            </div>
          );
        })}
      </div>

      <Footer />
    </React.Fragment>
  );
}
export default Resources;
