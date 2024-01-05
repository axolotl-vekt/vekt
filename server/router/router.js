const path = require('path');
const express = require('express');
const controller = require('../controllers/controller');
const router = express.Router();

router.get('/', (req, res) => {
  return res
    .status(200)
    .sendFile(path.resolve(__dirname, '../../client/index.html'));
});

router.get('/homepage', (req, res) => {
  return res
    .status(200)
    .sendFile(path.resolve(__dirname, '../../client/index.html'));
});

router.get('/homepage/bloodsugar', controller.getInfo, (req, res) => {
  return res.status(200).json(res.locals.data);
});

router.post('/signup', controller.createUser, (req, res) => {
  return res.status(200).send('passing through router.post/signup');
});

router.post('/signin', controller.verifyUser, (req, res) => {
  return res.status(200).send('passing through router.post/login');
});

router.post('/entry', controller.createEntry, (req, res) => {
  return res.status(200).json(res.locals.entry);
});

router.patch('/update', controller.updateEntry, (req, res) => {
  return res.status(200).json({});
});

router.delete('/delete/:id', controller.deleteEntry, (req, res) => {
  return res.status(200).json({});
});

module.exports = router;
