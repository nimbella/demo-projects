import './App.scss';
import Home from './components/Home';
import Navbar from './components/Navbar';
import React, { lazy, Suspense } from 'react';
import ReactNotification from 'react-notifications-component';
import { Route, Redirect, Switch, useLocation } from 'react-router-dom';
import useDarkMode from 'use-dark-mode';
import 'react-notifications-component/dist/theme.css';

const Trends = lazy(() => import('./components/Trends'));
const ExitPolls = lazy(() => import('./components/ExitPolls'));
const Voter = lazy(() => import('./components/Voter'));
const Representatives = lazy(() => import('./components/Representatives'));
const Elections = lazy(() => import('./components/Elections'));
const Divisions = lazy(() => import('./components/Divisions'));
const Build = lazy(() => import('./components/Build'));
const API = lazy(() => import('./components/API'));
const Contest = lazy(() => import('./components/Contest'));
const Resources = lazy(() => import('./components/Resources'));
const State = lazy(() => import('./components/State'));

const App = () => {
  const darkMode = useDarkMode(false);
  const location = useLocation();

  const pages = [
    {
      pageLink: '/',
      view: Home,
      displayName: 'Home',
      showInNavbar: true,
      icon: 'Home'
    },
    {
      pageLink: '/trends',
      view: Trends,
      displayName: 'News & Trends',
      showInNavbar: true,
      icon: 'TrendingUp'
    },
    {
      pageLink: '/exitpolls',
      view: ExitPolls,
      displayName: 'Exit Polls',
      showInNavbar: true,
      icon: 'PieChart'
    },
    {
      pageLink: '/voter',
      view: Voter,
      displayName: 'Voter Info',
      showInNavbar: true,
      icon: 'Info'
    },
    {
      pageLink: '/representatives',
      view: Representatives,
      displayName: 'Representatives',
      showInNavbar: true,
      icon: 'Users'
    },
    {
      pageLink: '/elections',
      view: Elections,
      displayName: 'Elections',
      showInNavbar: true,
      icon: 'UserCheck'
    },
    {
      pageLink: '/divisions',
      view: Divisions,
      displayName: 'Divisions',
      showInNavbar: true,
      icon: 'Map'
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
      pageLink: '/contest',
      view: Contest,
      displayName: 'Contest',
      showInNavbar: true,
      icon: 'Award'
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
