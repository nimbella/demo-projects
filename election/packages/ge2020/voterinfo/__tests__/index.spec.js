const axios = require("../__mocks__/axios")
const { main } = require('../index')

it("fetches voterinfo", async () => {
  // arrange
  const response = {
    "kind": "civicinfo#voterInfoResponse",
    "election": {
      "id": "testElectionId",
      "name": "testElectionName",
      "electionDay": "01-02-2020",
      "ocdDivisionId": "testDivisionId"
    },
    "otherElections": [
      {
        "id": "testOtherElectionId",
        "name": "testOtherElectionName",
        "electionDay": "01-03-2020",
        "ocdDivisionId": "testDivisionId"
      }
    ],
    "normalizedInput": {
      "locationName": "Mr John Smith.",
      "line1": "132",
      "line2": "My Street",
      "line3": "Kingston",
      "city": "New York",
      "state": "New York",
      "zip": "12401"
    },
    "pollingLocations": [
      {
        "address": {
          "locationName": "Mr John Smith.",
          "line1": "132",
          "line2": "My Street",
          "line3": "Kingston",
          "city": "New York",
          "state": "New York",
          "zip": "12401"
        },
        "notes": "testNotes",
        "pollingHours": "testHours",
        "name": "testName",
        "voterServices": "testService",
        "startDate": "01-02-2020",
        "endDate": "01-03-2020",
        "latitude": 35.929673,
        "longitude": -78.948237,
        "sources": [
          {
            "name": "testSource",
            "official": false
          }
        ]
      }
    ],
    "earlyVoteSites": [
      {
        "address": {
          "locationName": "Mr John Smith.",
          "line1": "132",
          "line2": "My Street",
          "line3": "Kingston",
          "city": "New York",
          "state": "New York",
          "zip": "12401"
        },
        "notes": "testNotes",
        "pollingHours": "testHours",
        "name": "testName",
        "voterServices": "testService",
        "startDate": "01-02-2020",
        "endDate": "01-03-2020",
        "latitude": 35.929673,
        "longitude": -78.948237,
        "sources": [
          {
            "name": "testSource",
            "official": false
          }
        ]
      }
    ],
    "dropOffLocations": [
      {
        "address": {
          "locationName": "Mr John Smith.",
          "line1": "132",
          "line2": "My Street",
          "line3": "Kingston",
          "city": "New York",
          "state": "New York",
          "zip": "12401"
        },
        "notes": "testNotes",
        "pollingHours": "testHours",
        "name": "testName",
        "voterServices": "testService",
        "startDate": "01-02-2020",
        "endDate": "01-03-2020",
        "latitude": 35.929673,
        "longitude": -78.948237,
        "sources": [
          {
            "name": "testName",
            "official": false
          }
        ]
      }
    ],
    "contests": [
      {
        "type": "testType",
        "primaryParty": "testParty",
        "electorateSpecifications": "testSpecs",
        "special": "test",
        "ballotTitle": "testTitle",
        "office": "testOffice",
        "level": [
          "first"
        ],
        "roles": [
          "testRole"
        ],
        "district": {
          "name": "testName",
          "scope": "Region",
          "id": "testId"
        },
        "numberElected": 12,
        "numberVotingFor": 1234,
        "ballotPlacement": 123,
        "candidates": [
          {
            "name": "testName",
            "party": "testParty",
            "candidateUrl": "https://mrtest.com",
            "phone": "123435678",
            "photoUrl": "https://mrtest.com/myphoto.jpg",
            "email": "test@testdomain.com",
            "orderOnBallot": 12313,
            "channels": [
              {
                "type": "testType",
                "id": "testId"
              }
            ]
          }
        ],
        "referendumTitle": "tetsTitle",
        "referendumSubtitle": "testSubtitle",
        "referendumUrl": "https://mrtest.com",
        "referendumBrief": "testBrief",
        "referendumText": "testText",
        "referendumProStatement": "testProStatement",
        "referendumConStatement": "testConStatement",
        "referendumPassageThreshold": "testPassageThreshold",
        "referendumEffectOfAbstain": "testEffectOfAbstain",
        "referendumBallotResponses": [
          "testResponse"
        ],
        "sources": [
          {
            "name": "testName",
            "official": false
          }
        ]
      }
    ],
    "state": [
      {
        "name": "testName",
        "electionAdministrationBody": {
          "name": "testName",
          "electionInfoUrl": "https://mrteset.com",
          "electionRegistrationUrl": "https://mrtest.com",
          "electionRegistrationConfirmationUrl":"https://mrtest.com",
          "electionNoticeText": "testTest",
          "electionNoticeUrl": "https://mrtest.com",
          "absenteeVotingInfoUrl": "https://mrtest.com",
          "votingLocationFinderUrl": "https://mrtest.com",
          "ballotInfoUrl": "https://mrtest.com",
          "electionRulesUrl": "https://mrtest.com",
          "voter_services": [
            "testService"
          ],
          "hoursOfOperation": "08-09",
          "correspondenceAddress": {
            "locationName": "Mr John Smith.",
            "line1": "132",
            "line2": "My Street",
            "line3": "Kingston",
            "city": "New York",
            "state": "New York",
            "zip": "12401"
          },
          "physicalAddress": {
            "locationName": "Mr John Smith.",
            "line1": "132",
            "line2": "My Street",
            "line3": "Kingston",
            "city": "New York",
            "state": "New York",
            "zip": "12401"
          },
          "electionOfficials": [
            {
              "name": "testName",
              "title": "testTitle",
              "officePhoneNumber": "12345678",
              "faxNumber": "12345678",
              "emailAddress": "test@testdomain.com"
            }
          ]
        },
        "local_jurisdiction": "testRegion",
        "sources": [
          {
            "name": "testName",
            "official": false
          }
        ]
      }
    ],
    "mailOnly": true
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
