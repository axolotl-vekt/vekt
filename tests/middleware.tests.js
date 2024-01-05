const request = require('supertest');
const express = require('express');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const controller = require('./server/controllers/controller');
const User = require('../models/dataModel');
// Mock server
const { MongoMemoryServer } = require('mongodb-memory-server');
const mongod = new MongoMemoryServer();

const app = express();

// Mock
jest.mock('bcrypt');
jest.mock('../models/dataModel');

// Post req to createuser
app.post('/api/signup', controller.createUser);

describe('createUser middleware', () => {
  // mock db connect
  beforeAll(async () => {
    // returns uri for mock db from MongoMemoryServer
    const uri = await mongod.getUri();
    await mongoose.connect(uri, {
      // these actually connect to the db. Not sure how it works, just in the docs
      //useNewUrlParser: true,
      //useUnifiedTopology: true,
    });
  });

  afterAll(async () => {
    // mock db disconnect
    await mongoose.connection.close();
  });

  afterEach(() => {
    // clear all mocks after test
    jest.clearAllMocks();
  });

  it('should create a new user successfully', async () => {
    // mock bcrypt.hash
    bcrypt.hash.mockResolvedValue('hashedPassword');

    // Mock user.create to return a new user
    User.create.mockResolvedValueOnce({
      _id: 'someUserId',
      username: 'testUser',
      password: 'hashedPassword',
    });

    // mock request
    const response = await request(app)
      .post('/api/signup')
      .send({
        username: 'testUser',
        password: 'testPassword',
      })
      .expect(200);

    // check if user.create was called with the correct params
    expect(User.create).toHaveBeenCalledWith({
      username: 'testUser',
      password: 'hashedPassword',
    });

    // check if the middleware added newUser._id to res.locals
    expect(response.body._id).toBe('someUserId');
  });

  it('should handle errors during user creation', async () => {
    // mock bcrypt.hash to throw an error
    bcrypt.hash.mockRejectedValue(new Error('Hashing error'));

    // mock request with the required params
    const response = await request(app)
      .post('/api/signup')
      .send({
        username: 'testUser',
        password: 'testPassword',
      })
      .expect(500);

    // expect error to be handled correctly
    expect(response.body.error).toBe('Hashing error');
  });
});
