import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Footer from './Footer';
import axios from "axios";
import { API_ROOT_URL } from '../constants';
import Loader from '../utils/loader';
import NoResult from '../utils/noResult';

function Elections() {
  const [electionData, setElectionData] = useState({});
  const [loading, setLoading] = useState(false);
  const [noResult, setNoResult] = useState(false);
  useEffect(() => {
    electionSearch();
  }, []);

  const electionSearch = () => {
    setLoading(true, axios.get(`${API_ROOT_URL}/elections`)
      .then(response => {
        setElectionData(response.data);
        setNoResult(false);
        if (!response.data || !response.data.elections) setNoResult(true)
      })
      .catch(error => {
        console.log(error);
      }).finally(_ => {
        setLoading(false);
      }));
  }

  return (
    <React.Fragment>
      <Helmet>
        <title>Upcoming Elections - General Election 2020 USA</title>
        <meta
          name="title"
          content="Upcoming Elections - General Election 2020 USA Related Information"
        />
      </Helmet>
      <div className="Voter">
        <div className="jumbotron">

          <h1>Upcoming Elections</h1>
          <p>A list of approaching voting events across the US</p>
          <NoResult show={noResult} />
          <Loader show={loading} />
          {electionData.elections && electionData.elections.map((election, index) => {
            return (
              <div
                key={index}
                className="faq fadeInUp"
                style={{ animationDelay: `${0.5 + index * 0.1}s` }}
              >
                <br /><b className="link">{election.name}</b><br />
                <span>{election.electionDay}</span><br />
                <span>{election.ocdDivisionId}</span>
              </div>
            );
          })}

        </div>
      </div>
      <Footer />
    </React.Fragment>
  );
};

export default Elections;
