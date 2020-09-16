import {
  SLIDE_IN,
  SLIDE_OUT,
  SLIDE_IN_MOBILE,
  SLIDE_OUT_MOBILE,
} from '../animations';

import React, { useState, useCallback, useRef } from 'react';
import * as Icon from 'react-feather';
import { Link } from 'react-router-dom';
import { useSpring, useTransition, animated } from 'react-spring';
import { useLockBodyScroll, useWindowSize } from 'react-use';

function Navbar({ pages, darkMode }) {
  const [expand, setExpand] = useState(false);

  useLockBodyScroll(expand);
  const windowSize = useWindowSize();

  const [spring, set, stop] = useSpring(() => ({ opacity: 0 }));
  set({ opacity: 1 });
  stop();

  const transitions = useTransition(expand, null, {
    from: windowSize.width < 769 ? SLIDE_IN_MOBILE : SLIDE_IN,
    enter: windowSize.width < 769 ? SLIDE_OUT_MOBILE : SLIDE_OUT,
    leave: windowSize.width < 769 ? SLIDE_IN_MOBILE : SLIDE_IN,
    config: { mass: 1, tension: 210, friction: 26 },
  });

  const handleMouseEnter = useCallback(() => {
    if (windowSize.width > 769) {
      setExpand(true);
    }
  }, [windowSize.width]);

  return (
    <animated.div className="Navbar" style={spring}>
      <div className="navbar-left"></div>
      <div className="navbar-middle">
        <Link to="/" onClick={setExpand.bind(this, false)}>
          General Election 2020 <br />
          <span> USA </span>
        </Link>
      </div>

      <div
        className="navbar-right"
        onMouseEnter={handleMouseEnter}
        {...(windowSize.width < 769 && {
          onClick: setExpand.bind(this, !expand),
        })}
      >
        {windowSize.width < 769 && <span>{expand ? 'Close' : 'Menu'}</span>}

        {windowSize.width > 769 && (
          <React.Fragment>
            <Link to="/">
              <span>
                <Icon.Home {...activeNavIcon('/')} />
              </span>
            </Link>
            <Link to="/trends">
              <span>
                <Icon.TrendingUp {...activeNavIcon('/trends')} />
              </span>
            </Link>
            <Link to="/exitpolls">
              <span>
                <Icon.DivideCircle {...activeNavIcon('/exitpolls')} />
              </span>
            </Link>
            <Link to="/voter">
              <span>
                <Icon.Info {...activeNavIcon('/voter')} />
              </span>
            </Link>
            <Link to="/api">
              <span>
                <Icon.Database {...activeNavIcon('/api')} />
              </span>
            </Link>
            <Link to="/resources">
              <span>
                <Icon.Link {...activeNavIcon('/resources')} />
              </span>
            </Link>
            <Link to="/source">
              <span>
                <Icon.Code {...activeNavIcon('/source')} />
              </span>
            </Link>
            <span>
              <SunMoon {...{ darkMode }} />
            </span>
          </React.Fragment>
        )}
      </div>

      {transitions.map(({ item, key, props }) =>
        item ? (
          <animated.div key={key} style={props}>
            <Expand {...{ pages, setExpand, darkMode, windowSize }} />
          </animated.div>
        ) : (
            <animated.div key={key} style={props}></animated.div>
          )
      )}
    </animated.div>
  );
}

function Expand({ pages, setExpand, darkMode, windowSize }) {
  const expandElement = useRef(null);

  const handleMouseLeave = useCallback(() => {
    windowSize.width > 768 && setExpand(false);
  }, [setExpand, windowSize.width]);

  return (
    <div className="expand" ref={expandElement} onMouseLeave={handleMouseLeave}>
      {pages.map((page, i) => {
        if (page.showInNavbar === true) {
          return (
            <Link
              to={page.pageLink}
              key={i}
              {...(windowSize.width < 769 && {
                onClick: setExpand.bind(this, false),
              })}
            >
              <span
                {...navLinkProps(page.pageLink, page.animationDelayForNavbar)}
              >
                {page.displayName}
              </span>
            </Link>
          );
        }
        return null;
      })}

      {windowSize.width < 768 && <SunMoon {...{ darkMode }} />}

      <div className="expand-bottom"></div>
    </div>
  );
}

export default Navbar;

const navLinkProps = (path, animationDelay) => ({
  className: `${window.location.pathname === path ? 'focused' : ''}`,
});

const activeNavIcon = (path) => ({
  style: {
    stroke: window.location.pathname === path ? '#4c75f2' : '',
  },
});

const SunMoon = ({ darkMode }) => {
  return (
    <div className="SunMoon" onClick={darkMode.toggle}>
      <div>
        {darkMode.value ? <Icon.Sun color={'#ffc107'} /> : <Icon.Moon />}
      </div>
    </div>
  );
};
