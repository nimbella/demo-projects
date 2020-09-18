import './App.scss';
import API from './components/API';
import ExitPolls from './components/ExitPolls';
import Map from './components/Home';
import Navbar from './components/Navbar';
import VoterInfo from './components/VoterInfo';
import React, { lazy, Suspense } from 'react';
import ReactNotification from 'react-notifications-component';
import { Route, Redirect, Switch, useLocation } from 'react-router-dom';
import useDarkMode from 'use-dark-mode';
import 'react-notifications-component/dist/theme.css';

const Home = lazy(() => import('./components/Trends'));
const Resources = lazy(() => import('./components/Resources'));
const Build = lazy(() => import('./components/Build'));
const State = lazy(() => import('./components/State'));

const App = () => {
  const darkMode = useDarkMode(false);
  const location = useLocation();

  const pages = [
    {
      pageLink: '/',
      view: Map,
      displayName: 'Home',
      showInNavbar: true,
      icon: 'Home'
    },
    {
      pageLink: '/trends',
      view: Home,
      displayName: 'News & Trends',
      showInNavbar: true,
      icon: 'TrendingUp'
    },   
    {
      pageLink: '/exitpolls',
      view: ExitPolls,
      displayName: 'Exit Polls',
      showInNavbar: true,
      icon: 'Percent'
    },
    {
      pageLink: '/voter',
      view: VoterInfo,
      displayName: 'Voter Info',
      showInNavbar: true,
        icon: 'Info'
    },
    {
      pageLink: '/sourcecode',
      view: Build,
      displayName: 'Source Code',
      showInNavbar: true,
      icon: 'Code'
    },
    {
      pageLink: '/api',
      view: API,
      displayName: 'API',
      showInNavbar: true,
      icon: 'Database'
    },    
    {
      pageLink: '/resource',
      view: Resources,
      displayName: 'Useful Links',
      showInNavbar: true,
      icon: 'Link'
    },
    {
      pageLink: '/state/:stateCode',
      view: State,
      displayName: 'State',
      showInNavbar: false,
      icon: 'SunMoon'
    },
  ];

  return (
    <div className="App">
      <ReactNotification />
      <Navbar pages={pages} {...{ darkMode }} />

      <Suspense fallback={<div />}>
        <Switch location={location}>
          {pages.map((page, index) => {
            return (
              <Route
                exact
                path={page.pageLink}
                render={({ match }) => <page.view />}
                key={index}
              />
            );
          })}
          <Redirect to="/" />
        </Switch>
      </Suspense>
    </div>
  );
};

export default App;
