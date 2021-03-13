import {
  getStatesAndCountiesFromAPI,
  getStatesAndCountiesFromMaps,
} from './utils/index';

describe('Compare the map and the API states and counties', () => {
  test('for any discrepancies', async () => {
    const statesAndCountiesFromAPI = await getStatesAndCountiesFromAPI();
    const statesAndCountiesFromMaps = await getStatesAndCountiesFromMaps();

    const statesFromAPI = Object.keys(statesAndCountiesFromAPI);
    const statesFromMaps = Object.keys(statesAndCountiesFromMaps);

    expect(statesFromAPI).toContain(...statesFromMaps);

    statesFromAPI.forEach((state) => {
      const expectedCounties = statesAndCountiesFromMaps[state]?.sort();
      const receivedCounties = statesAndCountiesFromAPI[state]?.sort();

      if (expectedCounties !== undefined && receivedCounties.length !== 0) {
        expect(expectedCounties).toContain(...receivedCounties);
      }
    });
  });
});
