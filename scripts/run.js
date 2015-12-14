require('babel/register')()

const script = `./${process.argv[2]}.js`
console.log('Running', script)

require(script)(err => {
  console.log(err || 'done')
  process.exit(0)
})
