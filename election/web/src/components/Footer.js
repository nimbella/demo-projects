import React from 'react';
import {Twitter, GitHub, Mail, Slack} from 'react-feather';

function Footer() {
  return (
    <footer>
      <div className="link">
        <a
          href="https://github.com/nimbella/demo-projects/ge2020usa"
          target="_blank"
          rel="noopener noreferrer"
        >
          ge2020usa
        </a>
      </div>

      <h5>{'easy access to the electoral information'}</h5>

      <div className="links">
        <a
          href="https://github.com/nimbella/"
          className="github"
          target="_blank"
          rel="noopener noreferrer"
        >
          <GitHub />
        </a>
        <a
          href="https://twitter.com/nimbella"
          target="_blank"
          rel="noopener noreferrer"
          className="twitter"
        >
          <Twitter />
        </a>

        <a
          href="mailto:info@nimbella.com"
          className="mail"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Mail />
        </a>
        <a
          href="https://nimbella-community.slack.com/join/shared_invite/enQtNjg1NzE1OTE3MDI4LWRmOTE0ODVmYzMzODMxNWQ5MDIyMTMxOWZlOTY4NGMxNWUwMmFkM2E2MjRjYWZlNDE1OTUyMjFhNDAyYjZhZDc"
          target="_blank"
          rel="noopener noreferrer nofollow"
          className="slack"
        >
          <Slack />
        </a>
      </div>
    </footer>
  );
}

export default React.memo(Footer);