const axios = require("../__mocks__/axios")
const { main } = require('../index')

it("fetches representatives data", async () => {
  // arrange
  const response = {
    "kind": "civicinfo#representativeInfoResponse",
    "normalizedInput": {
      "locationName": "Mr John Smith.",
      "line1": "132",
      "line2": "My Street",
      "line3": "Kingston",
      "city": "New York",
      "state": "New York",
      "zip": "12401"
    },
    "divisions": {
      "key": {
        "name": "testDivision",
        "alsoKnownAs": [
          "testAlias"
        ],
        "officeIndices": [
          22
        ]
      }
    },
    "offices": [
      {
        "name": "testName",
        "divisionId": "string",
        "levels": [
          "testLevel"
        ],
        "roles": [
          "testRole"
        ],
        "sources": [
          {
            "name": "testName",
            "official": true
          }
        ],
        "officialIndices": [
          23
        ]
      }
    ],
    "officials": [
      {
        "name": "testName",
        "address": [
          {
            "locationName": "Mr John Smith.",
            "line1": "132",
            "line2": "My Street",
            "line3": "Kingston",
            "city": "New York",
            "state": "New York",
            "zip": "12401"
          }
        ],
        "party": "testParty",
        "phones": [
          "12345678"
        ],
        "urls": [
          "https://mrtest.com"
        ],
        "photoUrl": "https://mrtest.com/myphoto.jpg",
        "emails": [
          "test@testdomain.com"
        ],
        "channels": [
          {
            "type": "testType",
            "id": "testId"
          }
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
