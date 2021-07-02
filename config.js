const dotenv =require('dotenv') ;

dotenv.config();
conte= {
  PORT: process.env.PORT || 3002,
  MONGODB_URL: process.env.Mongo_Uri || 'mongodb://localhost:27017/testdb',
  JWT_SECRET: process.env.JWT_SECRET || 'verySecretvalue',
  accessKeyId: process.env.accessKeyId || 'accessKeyId',
  secretAccessKey: process.env.secretAccessKey || 'secretAccessKey',
};
module.exports = cont
