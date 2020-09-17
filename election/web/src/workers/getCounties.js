import produce from 'immer';

export const getCounties = (data) => {
  let counties = {};

  Object.keys(data).map((stateCode) => {
    Object.keys(data[stateCode]?.counties || {}).map((countyName) => {
      counties = produce(counties || {}, (draftCounties) => {
        const countyKey = `${countyName}-${stateCode}`;
        draftCounties[countyKey] = data[stateCode].counties[countyName];
        draftCounties[countyKey].countyName = countyName;
        draftCounties[countyKey].stateCode = stateCode;
      });
      return null;
    });
    return null;
  });

  postMessage(counties);
};
