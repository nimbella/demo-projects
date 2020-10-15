const { sortByLatest } = require('../index');

describe('sort function', () => {
  test('it should sort by latest date', () => {
    const input = [
      { id: 3, created: 1602569513559 },
      { id: 1, created: 1602569508015 },
      { id: 2, created: 1602569511570 },
    ];

    const output = [
      { id: 3, created: 1602569513559 },
      { id: 2, created: 1602569511570 },
      { id: 1, created: 1602569508015 },
    ];

    expect(input.sort(sortByLatest('created'))).toEqual(output);
  });

  test('it should sort by latest id', () => {
    const input = [
      { id: 3, created: 1602569513559 },
      { id: 1, created: 1602569513559 },
      { id: 2, created: 1602569511570 },
    ];

    const output = [
      { id: 3, created: 1602569513559 },
      { id: 2, created: 1602569511570 },
      { id: 1, created: 1602569513559 },
    ];

    expect(input.sort(sortByLatest('id'))).toEqual(output);
  });
});
