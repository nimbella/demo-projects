const { main } = require('../index')

jest.resetModules()
jest.mock('fs', () => ({
  readFileSync: jest.fn(() => '{}'),
}));

describe('main method call', () => {
  test('should return empty json response', () => {
    // act
    const output = main()

    // assert
    expect(output).toStrictEqual({ body: {} });
  })
})
