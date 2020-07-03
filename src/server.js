const express = require('express');
const app = express();

const connectDB = require('../config/db');
const POST = process.env.PORT || 8888;

// connectdb
connectDB();

// initialize middleware
app.use(express.json({ extended: false }));

// config router
app.use('/api', require('./routes/api/index'));

app.get('/', (req, res) => {
  res.send('Api run');
});

app.listen(POST, () => {
  console.log(`Server started on port ${POST}`);
});
