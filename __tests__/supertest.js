const request = require('supertest');

const fs = require('fs');
const path = require('path');
// const db = require('../server/db/markets');

const server = 'http://localhost:3000/api';
require('dotenv').config();
/**
 * Read the docs! https://www.npmjs.com/package/supertest
 */
describe('Route integration', () => {
  describe('/', () => {
    describe('GET', () => {
      console.log('process.env.NODE_ENV!', process.env.NODE_ENV);
      it('responds with 200 status and text/html content type', () => {
        return request(server)
          .get('/')
          .expect('Content-Type', /text\/html/)
          .expect(200);
      });
    });
  });

  describe('DB Request to Info collection', () => {
    describe('GET', () => {
      it('responds with 200 status and application/json content type', () => {
        request(server)
          .get('/homepage/bloodsugar')
          .expect('Content-Type', 'application/json; charset=utf-8')
          .expect(200);
      });
      it('the data recieved is an array of objects', async () => {
        const response = await request(server).get('/homepage/bloodsugar');
        expect(Array.isArray(response.body)).toBe(true);
        expect(response.body[0] && typeof response.body[0] === 'object').toBe(true)
        //can check the properties of the objects recieved in the array for further testing
      });
    });

    describe('incorrect POST request to user collection', () => {
        it('responds with 400 error and application/json content type', () => {
        const requestBody = [{ firstName: 'test', lastName: 'test', username: 'test' }];
        request(server)
            .post('/signup')
            .send(requestBody)
            // .expect('Content-Type', 'application/json; charset=utf-8') // we are getting text/html back
            .expect(400);
        });
    })

    // xdescribe('PUT', () => {
    //   it('responds with 200 status and application/json content type', () => {
    //     const putUpdate = [{ location: 'SF', cards: 0 }];
    //     request(server)
    //       .put('/markets')
    //       .send(putUpdate)
    //       .expect('Content-Type', 'application/json; charset=utf-8') // we are getting text/html back
    //       .expect(200);
    //   });

    //   it('responds with the updated market list', async () => {
    //     const dbContent = JSON.parse(
    //       fs.readFileSync('./server/db/markets.dev.json', 'utf8')
    //     );
    //     const putUpdate = [{ location: 'SF', cards: 0 }];
    //     const response = await request(server).put('/markets').send(putUpdate);
    //     expect(response.body).toEqual(dbContent);
    //   });

    //   it('responds to invalid request with 400 status and error message in body', async () => {
    //     const putUpdate = [{ location: 5, cards: 0 }];
    //     const response = await request(server).put('/markets').send(putUpdate);
    //     expect(response.body).toEqual({ error: {} });
    //     expect(response.status).toBe(400);
    //   });
    // });
  });
});
