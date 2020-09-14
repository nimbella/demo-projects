import React from 'react';

const VoterInfo = ({data, children}) => {
  return (
    <div>
      <script
        type="text/javascript"
        src="https://tool.votinginfoproject.org/app.js"
      ></script>
      <div id="_vit"></div>
      <script type="text/javascript">
        {vit.load({
          modal: true,
          officialOnly: false,
          width: '640px',
          height: '480px',
          colors: {
            header: '#229acd',
            landscapeBackgroundHeader: '#228a9d',
          },
          language: 'en',
        })}
      </script>
    </div>
  );
};

export default VoterInfo;
