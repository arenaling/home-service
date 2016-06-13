'use strict';

var app = require('../..');
import request from 'supertest';

var newAgency;

describe('Agency API:', function() {

  describe('GET /api/agencies', function() {
    var agencys;

    beforeEach(function(done) {
      request(app)
        .get('/api/agencies')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          agencys = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      expect(agencys).to.be.instanceOf(Array);
    });

  });

  describe('POST /api/agencies', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/agencies')
        .send({
          name: 'New Agency',
          info: 'This is the brand new agency!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newAgency = res.body;
          done();
        });
    });

    it('should respond with the newly created agency', function() {
      expect(newAgency.name).to.equal('New Agency');
      expect(newAgency.info).to.equal('This is the brand new agency!!!');
    });

  });

  describe('GET /api/agencies/:id', function() {
    var agency;

    beforeEach(function(done) {
      request(app)
        .get('/api/agencies/' + newAgency._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          agency = res.body;
          done();
        });
    });

    afterEach(function() {
      agency = {};
    });

    it('should respond with the requested agency', function() {
      expect(agency.name).to.equal('New Agency');
      expect(agency.info).to.equal('This is the brand new agency!!!');
    });

  });

  describe('PUT /api/agencies/:id', function() {
    var updatedAgency;

    beforeEach(function(done) {
      request(app)
        .put('/api/agencies/' + newAgency._id)
        .send({
          name: 'Updated Agency',
          info: 'This is the updated agency!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedAgency = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedAgency = {};
    });

    it('should respond with the updated agency', function() {
      expect(updatedAgency.name).to.equal('Updated Agency');
      expect(updatedAgency.info).to.equal('This is the updated agency!!!');
    });

  });

  describe('DELETE /api/agencies/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/agencies/' + newAgency._id)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when agency does not exist', function(done) {
      request(app)
        .delete('/api/agencies/' + newAgency._id)
        .expect(404)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

  });

});
