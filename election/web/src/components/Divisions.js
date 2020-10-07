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


function Divisions() {
  const [divisionData, setDivisionData] = useState();
  const [address, setAddress] = useState('');
  const darkMode = useDarkMode(false);

  const divisionSearch = () => {
    axios.get(`${API_ROOT_URL}/divisions?query=${address}`)
      .then(response => {
        setDivisionData(response.data);
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
            InputProps={{
              endAdornment: (
                <InputAdornment>
                  <SearchIcon fontSize="large" onClick={divisionSearch} />
                </InputAdornment>
              )
            }}
          />
        </ThemeProvider>
      </div>
      <div className="Resources">
        {divisionData && divisionData.results && divisionData.results.map((element, index) => {
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
