import { main } from '../../src/hello/Hello'

describe('hello', () => {
  it('should respond with standard greeting', async () => {
    expect.assertions(1)
    const res = await main({})
    expect(res).toEqual({'body': 'Hello, stranger!'})
  })

  it('should respond with name in greeting', async () => {
    expect.assertions(1)
    const res = await main({name: 'jest'})
    expect(res).toEqual({'body': 'Hello, jest!'})
  })
})

