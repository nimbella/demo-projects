import StateDropdown from './StateDropdown';
import {formatDate} from '../utils/commonFunctions';
import React, {useMemo} from 'react';

function StateHeader({data, stateCode}) {
  const trail = useMemo(() => {
    const styles = [];

    [0, 0, 0].map((element, index) => {
      styles.push({
        animationDelay: `${index * 250}ms`,
      });
      return null;
    });

    return styles;
  }, []);


  return (
    <div className="StateHeader">
      <div className="header-left">
        <StateDropdown {...{stateCode}} hyperlink={false} trail={trail[0]} />
        {data?.meta?.['last_updated'] && (
          <h5 className="fadeInUp" style={trail[1]}>
            {`Last Updated on ${formatDate(
              data.meta.last_updated,
              'dd MMM, p'
            )} IST`}
          </h5>
        )}
      </div>

     {/*  <div className="header-right fadeInUp" style={trail[2]}>
        <h5>{'Total'}</h5>
        <animated.h2>
          {spring.total.interpolate((total) => formatNumber(Math.floor(total)))}
        </animated.h2>
      </div>*/}
    </div>
  );
}

export default React.memo(StateHeader);
