require('dotenv').config();

module.exports = {
  'mongoURI': `mongodb://${process.env.MONGOUSER}:${process.env.MONGOPASS}@ds147079.mlab.com:47079/devconnector`,
  'secret': 'supersecret'
};