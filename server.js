require('dotenv').config({ path: './config.env' });
const mongoose = require('mongoose');
const app = require('./app');

process.on('uncaughtException', (err) => {
  console.log('Uncaught Exception error', err);
  console.log(err.name, err.message);
  process.exit(1);
});
const db = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD,
);
async function connectToDatabase() {
  try {
    const response = await mongoose.connect(db);

    if (response) {
      console.log('DB connected successfully');
    }
  } catch (error) {
    console.error('Error connecting to the database:', error.message);
  }
}

// Express server setup
const PORT = process.env.PORT || 8001;

const server = app.listen(PORT, '127.0.0.1', () => {
  console.log(`Server is listening on port ${PORT}`);
});

// Call functions to connect to the database and create sample data
connectToDatabase();
process.on('unhandledRejection', (err) => {
  console.log('unhandled Rejection : ', err);
  console.log(err.name, err.message);
  server.close(() => {
    //server.close is used to prevent server to stop running at an instant
    process.exit(1);
  });
});
