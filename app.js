const fs = require('fs');
const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const connectDB = require('./config/db');

const users = require('./routes/api/users-routes');
const profile = require('./routes/api/profile-routes');
const posts = require('./routes/api/posts-routes');

const app = express();

// Body parser middleware
app.use(bodyParser.json());

app.use('/uploads/images', express.static(path.join('uploads', 'images')));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PATCH, DELETE, PUT'
  );

  next();
});

// Connect Database
connectDB();

// Use Routes
app.use('/api/users', users);
app.use('/api/profile', profile);
app.use('/api/posts', posts);

// Error Middleware
app.use((error, req, res, next) => {
  //   if (req.file) {
  //     fs.unlink(req.file.path, err => {
  //       console.log(err);
  //     });
  //   }
  //   if (res.headerSent) {
  //     return next(error);
  //   }
  res.status(error.code || 500);
  res.json({ msg: error.message || 'An unknown error occurred!' });
});

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));
