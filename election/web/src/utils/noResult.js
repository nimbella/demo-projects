import React from 'react';

export default function NoResult(props) {
  return (
    props.show ? <div className={props.class||'noresult'}>No Results Found</div> : ''
  );
}
