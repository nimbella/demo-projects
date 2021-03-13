import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import Footer from './Footer';
import useDarkMode from 'use-dark-mode';
import axios from "axios";
import { API_ROOT_URL } from '../constants';
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import * as Icon from 'react-feather';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import SearchIcon from "@material-ui/icons/Search";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import PhoneOutlinedIcon from '@material-ui/icons/PhoneOutlined';
import BusinessOutlinedIcon from '@material-ui/icons/BusinessOutlined';
import NoteAddOutlinedIcon from '@material-ui/icons/NoteAddOutlined';
import EventAvailableOutlinedIcon from '@material-ui/icons/EventAvailableOutlined';
import Loader from '../utils/loader';
import NoResult from '../utils/noResult';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '80%',
    marginLeft: '16%'
  },
  detail: {
    display: 'block',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightBold,
  },
}));

function Voter() {
  const classes = useStyles();
  const [voterData, setVoterData] = useState({});
  const [address, setAddress] = useState();
  const [loading, setLoading] = useState(false);
  const [noResult, setNoResult] = useState(false);
  const darkMode = useDarkMode(false);

  const voterInfo = () => {
    if (address)
    setLoading(true, axios.get(`${API_ROOT_URL}/voterinfo?address=${address}`)
      .then(response => {
        setVoterData(response.data);
        setNoResult(false);
        if (!response.data || !response.data.state) setNoResult(true)
      })
      .catch(error => {
        console.log(error);
      }).finally(_ => {
        setLoading(false);
      }));
  }
  const handleInputChange = event => {
    const { value } = event.target;
    setAddress(value);
  };

  const handleTextFieldKeyDown = event => {
    switch (event.key) {
      case 'Enter':
        voterInfo();
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

  const formatAddress = address => {
    if (address)
      return (<span> <b>{address.locationName}</b> <br /> <BusinessOutlinedIcon fontSize='small' /> {`${address.line1}  ${address.line2 || ''} ${address.city}, ${address.state}, ${address.zip}`} <br /></span>)
  }

  const formatDay = day => {
    if (day)
      return (<span><EventAvailableOutlinedIcon fontSize='small' /> <b>{day}</b><br /></span>)
  }

  const formatNote = note => {
    if (note)
      return (<span> <NoteAddOutlinedIcon fontSize='small' />  <span>{note}</span><br /></span>)
  }

  const formatPhone = phone => {
    if (phone)
      return (<span> <PhoneOutlinedIcon fontSize='small' />  <span>{phone}</span><br /></span>)
  }

  const formatLink = (link, text) => {
    if (link)
      return (<span> <Icon.Link2 size={12} /> <a href={link} rel="noopener noreferrer" target="_blank">{text}</a><br /></span>)
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
              onKeyDown={handleTextFieldKeyDown}
              InputProps={{
                endAdornment: (
                  <InputAdornment>
                    <SearchIcon fontSize="large" onClick={voterInfo} />
                  </InputAdornment>
                )
              }}
            />
          </ThemeProvider>
          <NoResult show={noResult} />
          <Loader show={loading} />
        </div>
        <br /><br />
        <div className={classes.root}>
          <ThemeProvider theme={theme}>
            <Accordion defaultExpanded={true}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography className={classes.heading}>Election Details
                </Typography>
              </AccordionSummary>
              <AccordionDetails className={classes.detail}>
                <div>
                  {voterData.election && voterData.election.name} <br />
                  {formatDay((voterData.election || '').electionDay)}
                </div>
                <br />
                {voterData.state && voterData.state.map((rep, index) => {
                  return (
                    <div
                      key={index}
                      className="faq fadeInUp"
                      style={{ animationDelay: `${0.5 + index * 0.1}s` }}
                    >
                      {rep.name}
                      {rep.electionAdministrationBody.name}<br />
                      {formatLink(rep.electionAdministrationBody.ballotInfoUrl, 'Ballot Info')}
                      {formatLink(rep.electionAdministrationBody.electionInfoUrl, 'Election Info')}
                      {formatLink(rep.electionAdministrationBody.votingLocationFinderUrl, 'Location Finder')}
                      <span>{rep.local_jurisdiction.electionAdministrationBody.electionOfficials.name}<br /></span>
                      {formatPhone(rep.local_jurisdiction.electionAdministrationBody.electionOfficials.officePhoneNumber)}
                      {formatAddress(rep.local_jurisdiction.electionAdministrationBody.physicalAddress)}
                    </div>
                  );
                })}
              </AccordionDetails>
            </Accordion>
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel2a-content"
                id="panel2a-header"
              >
                <Typography className={classes.heading}>Drop Off Locations</Typography>
              </AccordionSummary>
              <AccordionDetails className={classes.detail}>
                {voterData.dropOffLocations && voterData.dropOffLocations.map((rep, index) => {
                  return (
                    <div
                      key={index}
                      className="faq fadeInUp"
                      style={{ animationDelay: `${0.5 + index * 0.1}s` }}
                    >
                      {formatDay(rep.pollingHours)}
                      {formatNote(rep.notes)}
                      {formatAddress(rep.address)}<br />
                    </div>
                  );
                })}
              </AccordionDetails>
            </Accordion>
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel3a-content"
                id="panel3a-header"
              >
                <Typography className={classes.heading}>Early Vote Sites</Typography>
              </AccordionSummary>

              <AccordionDetails className={classes.detail}>
                {voterData.earlyVoteSites && voterData.earlyVoteSites.map((rep, index) => {
                  return (
                    <div
                      key={index}
                      className="faq fadeInUp"
                      style={{ animationDelay: `${0.5 + index * 0.1}s` }}
                    >
                      {formatDay(rep.pollingHours)}
                      {formatNote(rep.notes)}
                      {formatAddress(rep.address)}<br />
                    </div>
                  );
                })}
              </AccordionDetails>
            </Accordion>

          </ThemeProvider>
        </div>
      </div>
      <Footer />
    </React.Fragment>
  );
};
export default Voter; 
