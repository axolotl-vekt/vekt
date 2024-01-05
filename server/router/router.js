/**require in modules and controllers */
const path = require('path');
const express = require('express');
const controller = require('../controllers/controller');
const router = express.Router();


/** Handle GET request to 'http://localhost:3000/api/' --> return index.html page */
router.get('/', (req, res) => {
  return res.sendFile(path.resolve(__dirname, '../../client/index.html'));
});

/** Handle GET request to 'http://localhost:3000/api/homepage' --> return index.html page */
router.get('/homepage', (req, res) => {
  return res.sendFile(path.resolve(__dirname, '../../client/index.html'));
});

/** Handle GET request to 'http://localhost:3000/api/homepage/bloodsugar'
 * All data from info collection is returned and sent back to front end
 */
router.get('/homepage/bloodsugar', controller.getInfo, (req, res) => {
  return res.status(200).json(res.locals.data);
});


router.post('/getUser', controller.getUser, (req, res) => {
  return res.status(200).json(res.locals.user);
})

/** Handle POST request to 'http://localhost:3000/api/signup'
 * Request body should have username and password
 * Request body is sent to createUser middleware
 * Middleware returns newUser id, which is sent back to front end
 */
router.post('/signup', controller.createUser, (req, res) => {
  return res.status(200).json(res.locals.newUser);
});

/** Handle POST request to 'http://localhost:3000/api/login'
 * Request body should have username and password
 * Request body is sent to verifyUser middleware
 * Middleware returns newUser id, which is sent back to front end
 */
router.post('/login', controller.verifyUser, (req, res) => {
  return res.status(200).json(res.locals.id);
});

/** Handle POST request to Handle POST request to 'http://localhost:3000/api/entry
 * Request body should have { username, bloodSugar, sysPressure, diaPressure }
 * Request body is sent to createEntry middleware
 * Middleware returns id of data point, which is sent back to front end
 */
router.post('/entry', controller.createEntry, (req, res) => {
  return res.status(200).json(res.locals.entry);
});

/** Handle POST request to Handle POST request to 'http://localhost:3000/api/update
 * Request body should have { bloodSugar, sysPressure, diaPressure, id } where id is id of data point
 * Request body is sent to updateEntry middleware
 * Middleware updates entry
 * Router returns 200 status and empty object
 */
router.patch('/update', controller.updateEntry, (req, res) => {
  return res.status(200).json({});
});

router.patch('/updateUser', controller.updateUser, (req, res) => {
  return res.status(200).json(res.locals.user);
});

/** Handle POST request to Handle POST request to 'http://localhost:3000/api/update
 * Request body should have id of data point to delete
 * Request body is sent to deleteEntry middleware
 * Middleware deletes entry
 * Router returns 200 status and empty object
 */
router.delete('/delete/:id', controller.deleteEntry, (req, res) => {
  return res.status(200).json({});
});



module.exports = router;
