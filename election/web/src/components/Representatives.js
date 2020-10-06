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

function Representatives() {
  const [repsData, setRepsData] = useState({});
  const [address, setAddress] = useState();
  const darkMode = useDarkMode(false);

  const repsSearch = () => {
    axios.get(`${API_ROOT_URL}/reps?address=${address}`)
      .then(response => {
        setRepsData(response.data);
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
  const socialMediaUrls = {
    Facebook: 'https://www.facebook.com/',
    Twitter: 'https://twitter.com/',
    YouTube: 'https://www.youtube.com/user/',
  }
  

  return (
    <React.Fragment>
      <Helmet>
        <title>Representatives - General Election 2020 USA</title>
        <meta
          name="title"
          content="Representatives - General Election 2020 USA Related Information"
        />
      </Helmet>
      <div className="Voter">
        <div className="jumbotron">
          <h1>Elected Representatives</h1>
          <p>Your federal, state, county and local elected representatives</p>
          <p>Please Enter Your Address</p>
          <ThemeProvider theme={theme}>
            <TextField
              placeholder="1234 Example Ave"
              onChange={handleInputChange}
              InputProps={{
                endAdornment: (
                  <InputAdornment>
                    <SearchIcon fontSize="large" onClick={repsSearch} />
                  </InputAdornment>
                )
              }}
            />
          </ThemeProvider>
        </div>
        <div className="Reps">
          {repsData.officials && repsData.officials.map((rep, index) => {
            return (
              <div
                key={index}
                className="faq fadeInUp"
                style={{ animationDelay: `${0.5 + index * 0.1}s` }}
              >
                <img width="20%" src={rep.photoUrl}></img><br />
                <span>{rep.name} </span><br />
                <span className="link">{rep.party}</span><br />
                {rep.phones && rep.phones.map(p => {
                  return (<span> <Icon.Phone size={18} />{` ${p}`}<br /></span>)
                })}
                {rep.urls && rep.urls.map(u => {
                  return (<span> <Icon.Link2 size={18} /> <a href={u} rel="noopener noreferrer" target="_blank">{u}</a><br /></span>)
                })}
                {rep.address && rep.address.map(a => {
                  return (<span><Icon.Briefcase size={18} /> {a.line1}<br />{`${a.city}, ${a.state}, ${a.zip}`} <br /></span>)
                })}
                {rep.channels && rep.channels.map((channel, i) => {
                  return (
                    <span>
                    {getSocialMediaIcon(channel.type)}
                    <a key={i} href={`${socialMediaUrls[channel.type]}${channel.id}`} rel="noopener noreferrer" target="_blank">
                    {`  ${channel.id}`}</a><br/></span>
                  )
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

export default Representatives; 
