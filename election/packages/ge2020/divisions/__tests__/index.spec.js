const axios = require("../__mocks__/axios")
const { main } = require('../index')

it("fetches divisions data", async () => {
  // arrange
  const response = 
  {
    "kind": "civicinfo#divisionSearchResponse",
    "results": [
      {
        "ocdId": "testOcdId",
        "name": "testName",
        "aliases": [
          "testAlias"
        ]
      }
    ]
  }
  
   
  axios.get.mockImplementationOnce(() =>
    Promise.resolve({ data: response }),
  );

  // act
  const data = await main({})

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
  const data = await main({})

  // assert
  expect(data).toStrictEqual(message)
});
