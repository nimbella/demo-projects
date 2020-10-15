const axios = require("../__mocks__/axios")
const { main } = require('../index')

it("fetches election data", async () => {
  // arrange
  const response = {
    "elections": [
      {
        "id": "2000",
        "name": "VIP Test Election",
        "electionDay": "2021-06-06",
        "ocdDivisionId": "ocd-division/country:us"
      },
      {
        "id": "4955",
        "name": "West Virginia Presidential and State Primary Election",
        "electionDay": "2020-06-09",
        "ocdDivisionId": "ocd-division/country:us/state:wv"
      },
      {
        "id": "4958",
        "name": "Georgia Presidential and State Primary Election",
        "electionDay": "2020-06-09",
        "ocdDivisionId": "ocd-division/country:us/state:ga"
      }]
  }

  axios.get.mockImplementationOnce(() =>
    Promise.resolve({ data: response }),
  );

  // act
  const data = await main()

  // assert
  expect(data).toStrictEqual({ body: response })
  expect(axios.get).toHaveBeenCalledTimes(1)
});


it('returns error message on failure', async () => {
  // arrange
  const errorMessage = 'Network Error';
  const message = { "body": errorMessage }

  axios.get.mockImplementationOnce(() =>
    Promise.reject(new Error(errorMessage)),
  );

  // act
  const data = await main()

  // assert
  expect(data).toStrictEqual(message)
});
