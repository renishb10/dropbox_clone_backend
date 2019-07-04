// Dependencies
const expect = require('chai').expect;
const request = require('supertest');

// Custom dependencies
const server = require('../app');

describe('Dropbox Clone API Service', function() {
  const mockUser = {
    email: 'wissam@base.com',
    password: 'password123',
    firstName: 'wissam',
    lastName: 'user',
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  // Custom Dependencies
  const userModel = require('../models/user.model');
  before(async function() {
    // await userModel.remove({ email: 'wissam@base.com' });
  });

  it('GET / - Dropbox Clone Home', function(done) {
    request(server)
      .get('/')
      .expect(200)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        expect(res.text).to.be.equal('Dropbox Clone Backend Service');
        return done();
      });
  });

  it('POST / - Create User', function(done) {
    request(server)
      .post('/api/v1/users/signup')
      .send(mockUser)
      .set('Accept', 'application/json')
      .expect(200)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        expect(res.body.data.name).to.be.equal('wissam');
        return done();
      });
  });

  it('POST / - Create File/Folder', function(done) {
    request(server)
      .post('/api/v1/files/5d1ddbdae928974fb089e222/create')
      .send({
        name: 'test_file',
        isFolder: false,
      })
      .set('Accept', 'application/json')
      .set('x-user-id', '5d1ddbd8e928974fb089e221')
      .expect(200)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        expect(res.body.data.name).to.be.equal('test_file');;
        return done();
      });
  });

  it('PUT / - Rename File/Folder', function(done) {
    request(server)
      .put('/api/v1/files/5d1ddbdae928974fb089e222')
      .send({
        name: 'renamed_test_file'
      })
      .set('Accept', 'application/json')
      .set('x-user-id', '5d1ddbd8e928974fb089e221')
      .expect(200)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        expect(res.body.data.status).to.be.equal('success');;
        return done();
      });
  });

  it('DELETE / - Delete File/Folder', function(done) {
    request(server)
      .delete('/api/v1/files/5d1ddbdae928974fb089e222')
      .set('Accept', 'application/json')
      .set('x-user-id', '5d1ddbd8e928974fb089e221')
      .expect(200)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        expect(res.body.data.status).to.be.equal('success');;
        return done();
      });
  });

  after(async function() {
    //await userModel.remove({ email: 'wissam@base.com' });
  });
});
