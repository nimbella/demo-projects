import Footer from './Footer';
import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import useDarkMode from 'use-dark-mode';
import axios from "axios";
import { API_ROOT_URL } from '../constants';
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchIcon from "@material-ui/icons/Search";
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import Loader from '../utils/loader';
import NoResult from '../utils/noResult';

function Divisions() {
  const [divisionData, setDivisionData] = useState();
  const [address, setAddress] = useState();
  const [loading, setLoading] = useState(false);
  const [noResult, setNoResult] = useState(false);
  const darkMode = useDarkMode(false);

  const divisionSearch = () => {
    if (address)
      setLoading(true, axios.get(`${API_ROOT_URL}/divisions?query=${address}`)
        .then(response => {
          setDivisionData(response.data);
          setNoResult(false);
          if (!response.data || !response.data.results) setNoResult(true)
        })
        .catch(error => {
          console.log(error);
        }).finally(_ => {
          setLoading(false);
        }))
  }
  const handleInputChange = event => {
    const { value } = event.target;
    setAddress(value);
  };
  const handleTextFieldKeyDown = event => {
    switch (event.key) {
      case 'Enter':
        divisionSearch();
        event.preventDefault();
        break
      case 'Escape':
        event.target.value = '';
        setNoResult(false)
        setAddress('');
        break
      default: break
    }
  };
  const theme = createMuiTheme({
    palette: {
      type: darkMode.value ? 'dark' : 'light',
    },
  });


  return (
    <React.Fragment>
      <Helmet>
        <title>Political Divisions</title>
        <meta
          name="title"
          content="Political Divisions"
        />
      </Helmet>
      <div className="jumbotron">
        <h1>Political Divisions</h1>
        <p>List political divisions by their natural name or OCD ID</p>
        <ThemeProvider theme={theme}>
          <TextField
            placeholder="e.g. us, ny, spencerport"
            onChange={handleInputChange}
            onKeyDown={handleTextFieldKeyDown}
            InputProps={{
              endAdornment: (
                <InputAdornment>
                  <SearchIcon fontSize="large" onClick={divisionSearch} />
                </InputAdornment>
              )
            }}
          />
        </ThemeProvider>
        <NoResult show={noResult} />
        <Loader show={loading} />
      </div>
      <div className="Resources">
        {
          divisionData && divisionData.results && divisionData.results.map((element, index) => {
            return (
              <div
                key={index}
                className="faq fadeInUp"
                style={{ animationDelay: `${0.5 + index * 0.1}s` }}
              >
                <span>{element.name} </span><br />
                <span className="link">{element.ocdId}</span>
              </div>
            );
          })}
      </div>
      <Footer />
    </React.Fragment>
  );
}
export default Divisions;
