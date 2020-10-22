 
const fs = require('fs')

test('should check existence of data file', () => {
  expect(fs.existsSync('../../../transformed-data/exitpolls.json')).toBe(true)
});
