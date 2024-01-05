/** require in modules */
// const path = require('path');
const express = require('express');
const router = require('./router/router.js');
// const controller = require('./controllers/controller.js');
const cors = require('cors');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
require('dotenv').config();
const PORT = 3000;
/** set up app to use express, cors, json parsing, cookie parsing */
const app = express();
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
require('dotenv').config();

/** Twilio integration requirements */
const bodyParser = require('body-parser');
const pino = require('express-pino-logger')();
const twilio = require('twilio')(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

/** set up mongo database with mongoose */
// const MONGO_URI = 'mongodb+srv://tawniex44:3vd5DPgTjLU819sO@cluster0.7z5ioep.mongodb.net/?retryWrites=true&w=majority'
// const MONGO_URI = "mongodb+srv://ewong1217:kZFC34hkjGKrKbs5@cluster0.hukljwm.mongodb.net/?retryWrites=true&w=majority"


// const MONGO_URI = 'mongodb+srv://cathyluong93:pE6Fqys2z94A9czA@cluster0.6zljii0.mongodb.net/?retryWrites=true&w=majority';
// const NODE_ENV = process.env.NODE_ENV || 'development';
console.log("process.env.MONGO_URI", process.env.MONGO_URI)


if(process.env.NODE_ENV === 'development') {
  MONGO_URI = process.env.MONGO_URI;
} else {
  MONGO_URI = process.env.MONGO_TEST_URI;
}


console.log('process.env.NODE_ENV!', process.env.NODE_ENV)

mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Database connected..');
  });


/** Twilio route according to tutorial: https://www.twilio.com/blog/send-an-sms-react-twilio */
app.post('/api/messages', (req, res) => {
  res.header('Content-Type', 'application/json');
  twilio.messages
  .create({
    from: process.env.TWILIO_PHONE_NUMBER,
    to: req.body.to,
    body: req.body.body
  })
  .then(() => {
    res.send(JSON.stringify({ success: true }));
  })
  .catch(err => {
    console.log(err);
    res.send(JSON.stringify({ success: false }));
  });
});

// app.get('*', (req, res) => res.sendFile(path.join(__dirname, '../client/index.html')));

/** all calls to database go through "/api" */
app.use('/api', router);

// app.get('/', (res,req) => {
//     return res.sendFile(path.join(__dirname, '../client/index.html'));
// });

/** all calls to nonexistant routes are given a 404 response */
app.use('*', (req, res) => {
  return res.status(404).send('Not Found');
});

/** global error handler */
app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'An Error Occurred',
    status: 500,
    message: { err: 'An error occurred' },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
  // console.log(err);
  // res.status(500).send({ error: err });
});

app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}...`);
});

module.exports = app;
