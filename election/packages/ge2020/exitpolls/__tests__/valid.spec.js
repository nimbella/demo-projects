const { main } = require('../index')

jest.resetModules()
jest.mock('fs', () => ({
  readFileSync: jest.fn(() => JSON.stringify([
    {
      "Poll source": "USC Dornsife",
      "Date": "Sep 1–7",
      "Sample size": "2,508 (LV)",
      "Margin of error": "–",
      "Donald Trump (Republican)": "41%[c]",
      "Joe Biden (Democratic)": "53%",
      "Jo Jorgensen (Libertarian)": "–[d]",
      "Howie Hawkins (Green)": "–[e]",
      "Other": "–[f]",
      "Abstention": "–[g]",
      "Undecided": "–",
      "Lead": "12%"
    },
    {
      "Poll source": "USC Dornsife",
      "Date": "Sep 1–7",
      "Sample size": "2,508 (LV)",
      "Margin of error": "–",
      "Donald Trump (Republican)": "42%[h]",
      "Joe Biden (Democratic)": "52%",
      "Jo Jorgensen (Libertarian)": "–",
      "Howie Hawkins (Green)": "–",
      "Other": "–[i]",
      "Abstention": "–",
      "Undecided": "–",
      "Lead": "10%"
    }])),
}))

describe('main method call', () => {
  test('should return appropriate json response', () => {

    // arrange
    const expected = [
      {
        "Poll source": "USC Dornsife",
        "Date": "Sep 1–7",
        "Sample size": "2,508 (LV)",
        "Margin of error": "–",
        "Donald Trump (Republican)": "41%[c]",
        "Joe Biden (Democratic)": "53%",
        "Jo Jorgensen (Libertarian)": "–[d]",
        "Howie Hawkins (Green)": "–[e]",
        "Other": "–[f]",
        "Abstention": "–[g]",
        "Undecided": "–",
        "Lead": "12%"
      },
      {
        "Poll source": "USC Dornsife",
        "Date": "Sep 1–7",
        "Sample size": "2,508 (LV)",
        "Margin of error": "–",
        "Donald Trump (Republican)": "42%[h]",
        "Joe Biden (Democratic)": "52%",
        "Jo Jorgensen (Libertarian)": "–",
        "Howie Hawkins (Green)": "–",
        "Other": "–[i]",
        "Abstention": "–",
        "Undecided": "–",
        "Lead": "10%"
      }]

    // act
    const output = main()

    // assert
    expect(output).toStrictEqual({ body: expected });
  })
})
