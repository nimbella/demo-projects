import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import Footer from './Footer';
import useDarkMode from 'use-dark-mode';
import axios from "axios";
import { API_ROOT_URL } from '../constants';
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchIcon from "@material-ui/icons/Search";
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import * as Icon from 'react-feather';

function Voter() {
  const [voterData, setVoterData] = useState({});
  const [address, setAddress] = useState();
  const darkMode = useDarkMode(false);

  const voterInfo = () => {
    axios.get(`${API_ROOT_URL}/voterinfo?address=${address}`)
      .then(response => {
        setVoterData(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }
  const handleInputChange = event => {
    const { value } = event.target;
    setAddress(value);
  };
  const theme = createMuiTheme({
    palette: {
      type: darkMode.value ? 'dark' : 'light',
    },
  });
  const getSocialMediaIcon = (type) => {
    if (type === 'Facebook') {
      return (<Icon.Facebook size={20} />)
    } else if (type === 'Twitter') {
      return (<Icon.Twitter size={20} />)
    } else if (type === 'YouTube') {
      return (<Icon.Youtube size={20} />)
    }
  }
  return (
    <React.Fragment>
      <Helmet>
        <title>Voter Info - General Election 2020 USA</title>
        <meta
          name="title"
          content="Voter Info - General Election 2020 USA Related Information"
        />
      </Helmet>
      <div className="Voter">
        <div className="jumbotron">
          <h1>Voter Info</h1>
          <p>Local Polling Places, Early Voting Sites</p>
          <p>Please Enter Your Address</p>
          <ThemeProvider theme={theme}>
            <TextField
              placeholder="1234 Example Ave"
              onChange={handleInputChange}
              InputProps={{
                endAdornment: (
                  <InputAdornment>
                    <SearchIcon onClick={voterInfo} />
                  </InputAdornment>
                )
              }}
            />
          </ThemeProvider>
        </div>
        <div className="Reps">
          {voterData.pollingLocations && voterData.pollingLocations.map((rep, index) => {
            return (
              <div
                key={index}
                className="faq fadeInUp"
                style={{ animationDelay: `${0.5 + index * 0.1}s` }}
              >
                <span>{rep.pollingHours} </span><br />
                <span className="link">{rep.notes}</span><br />
                {rep.address && rep.address.map(a => {
                  return (<span><Icon.Package size={18} /> {a.locationName}<br /> {a.line1}<br />{`${a.city}, ${a.state}, ${a.zip}`} <br /></span>)
                })}

              </div>
            );
          })}

          {voterData.contests && voterData.contests.map((rep, index) => {
            return (
              <div
                key={index}
                className="faq fadeInUp"
                style={{ animationDelay: `${0.5 + index * 0.1}s` }}
              >
                <span>{`${rep.type} (${rep.level})`} </span><br />
                <span className="link">{rep.office}</span><br />

                {rep.candidates && rep.candidates.map((can, i) => {

                  return (<div>
                    <span>{`${can.name} (${can.party})`} <br /></span>
                    <span> <Icon.Link2 size={18} /> <a href={can.candidateUrl} rel="noopener noreferrer" target="_blank">{can.candidateUrl}</a><br /></span>
                    {
                      can.channels && can.channels.map((channel, i) => {
                        return (
                          <span>
                            {getSocialMediaIcon(channel.type)}
                            <a key={i} href={`${channel.id}`} rel="noopener noreferrer" target="_blank">
                              {`  ${channel.id}`}</a><br /></span>
                        )
                      })
                    }

                  </div>)
                })}
              </div>
            );
          })}
        </div>

      </div>
      <Footer />
    </React.Fragment>
  );
};

export default Voter; 
