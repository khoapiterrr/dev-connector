const mongodb = require('mongoose');
const config = require('config');
const dbURI = config.get('mongoURI');

const connectDB = async () => {
  try {
    await mongodb.connect(dbURI, {
      useUnifiedTopology: true,
      keepAlive: 1,
      useCreateIndex: true,
      useNewUrlParser: true,
      useFindAndModify: false,
    });

    console.log('Mongodb connected...');
    return mongodb.connection;
  } catch (err) {
    console.log(err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
