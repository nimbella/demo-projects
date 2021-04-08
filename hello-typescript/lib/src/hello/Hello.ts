export function main(args: {}): {} {
  let name: string = args['name'] || 'stranger'
  let greeting: string = 'Hello, ' + name + '!'
  console.log(greeting)
  return { body: greeting }
}
