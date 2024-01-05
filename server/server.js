const path = require('path');
const express = require('express');
const router = require('./router/router.js');
const crypto = require('crypto');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const FileStore = require('session-file-store')(session);


const PORT = 3000;

const generateSecretKey = () => {
  return crypto.randomBytes(32).toString('hex');
};

const app = express();

// const sess = ({
//     name: "VEKT",
//     store: new FileStore(),
//     secret: generateSecretKey(),
//     cookie: {
//       maxAge: 1000 * 60 * 60 * 24, // 1 day (86,400,000ms)
//     },
//     resave: false,
//     saveUninitialized: false,
// });

// if (app.get('env') === 'production') {
//   app.set('trust proxy', 1)
//   sess.cookie.secure = true
// }

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

app.use('/api', router);

app.use('*', (req, res) => {
  res.status(404).send('Not Found');
});

app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 500,
    message: { err: 'An error occurred' },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return next({ message: 'error at a global level' });
});

app.listen(PORT, () => console.log('Listening on Port: 3000'));
