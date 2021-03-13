import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';

export default function Loader(props) {
  return (
    props.show ? <div className={props.class||'loader'}>
      <CircularProgress />
    </div> : ''
  );
}
