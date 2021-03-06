const express = require('express'),
      mongoose = require('mongoose'),
      bodyParser = require('body-parser'),
      keys = require('./config/keys'),
      passport = require('passport');

const users = require('./routes/api/users'),
      profile = require("./routes/api/profile"),
      posts = require("./routes/api/posts");

const app = express();
// let env = require('dotenv').config();


// Body parser middleware
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// DB Config
// const db = require(keys.mongoURI);

// Connect to MongoDB
mongoose
    .connect(keys.mongoURI)
    .then(() => console.log('MongoDB Connected!'))
    .catch(err => console.log(err));

// Passport middleware
app.use(passport.initialize());

// Passport Config
require('./config/passport')(passport);

// Use Routes
app.use('/api/users', users);
app.use("/api/profile", profile);
app.use("/api/posts", posts);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`
******************************
Server running on port ${port}
******************************`));