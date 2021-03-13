import {UPDATES_COUNT} from '../constants';
import {capitalize} from '../utils/commonFunctions';

import {formatDistance, format} from 'date-fns';
import React, {useLayoutEffect} from 'react';

const newDate = new Date();
let currentDate = newDate;

function Updates({updates}) {
  useLayoutEffect(() => {
    currentDate = newDate;
  });

  return (
    <div className="updates">
      <div className="updates-header">
        <h2>{format(currentDate, 'd MMM')}</h2>
      </div>
      {updates
        .slice(0, UPDATES_COUNT)
        .map(function (activity, index) {
          activity.title = activity.title.replace(/\n/g, '<br/>');
          const activityDate = new Date(activity.created);
          const addHeader = () => {
            currentDate = activityDate;

            return (
              <React.Fragment>
                {index === 0 ? (
                  <div className="update">
                    <h4>No updates yet!</h4>
                  </div>
                ) : (
                  ''
                )}
                <div className="updates-header">
                  <h2>{format(activityDate, 'd MMM')}</h2>
                </div>
              </React.Fragment>
            );
          };

          return (
            <React.Fragment key={index}>
              {activityDate.getDate() !== currentDate.getDate()
                ? addHeader()
                : ' '}
              <div key={index} className="update">
                <h5>
                  {capitalize(
                    formatDistance(new Date(activity.created), new Date())
                  ) + ' ago'}
                </h5>
                <a href={activity.link} target="_blank" rel="noopener noreferrer">
                  <h4
                    dangerouslySetInnerHTML={{
                      __html: activity.title,
                    }}
                  ></h4>
                </a>
              </div>
            </React.Fragment>
          );
        })}
    </div>
  );
}

export default Updates;
