const Enzyme = require('enzyme')

const Adapter = require('enzyme-adapter-react-16')

Enzyme.configure({ adapter: new Adapter() })

process.on('unhandledRejection', error => {
  // Will print "unhandledRejection err is not defined"
  console.log('unhandledRejection', error.message);
});
