'use strict';

var _supertest = require('supertest');

var _supertest2 = _interopRequireDefault(_supertest);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = require('../..');


var newSale;

describe('Sale API:', function () {

  describe('GET /api/sales', function () {
    var sales;

    beforeEach(function (done) {
      (0, _supertest2.default)(app).get('/api/sales').expect(200).expect('Content-Type', /json/).end(function (err, res) {
        if (err) {
          return done(err);
        }
        sales = res.body;
        done();
      });
    });

    it('should respond with JSON array', function () {
      expect(sales).to.be.instanceOf(Array);
    });
  });

  describe('POST /api/sales', function () {
    beforeEach(function (done) {
      (0, _supertest2.default)(app).post('/api/sales').send({
        name: 'New Sale',
        info: 'This is the brand new sale!!!'
      }).expect(201).expect('Content-Type', /json/).end(function (err, res) {
        if (err) {
          return done(err);
        }
        newSale = res.body;
        done();
      });
    });

    it('should respond with the newly created sale', function () {
      expect(newSale.name).to.equal('New Sale');
      expect(newSale.info).to.equal('This is the brand new sale!!!');
    });
  });

  describe('GET /api/sales/:id', function () {
    var sale;

    beforeEach(function (done) {
      (0, _supertest2.default)(app).get('/api/sales/' + newSale._id).expect(200).expect('Content-Type', /json/).end(function (err, res) {
        if (err) {
          return done(err);
        }
        sale = res.body;
        done();
      });
    });

    afterEach(function () {
      sale = {};
    });

    it('should respond with the requested sale', function () {
      expect(sale.name).to.equal('New Sale');
      expect(sale.info).to.equal('This is the brand new sale!!!');
    });
  });

  describe('PUT /api/sales/:id', function () {
    var updatedSale;

    beforeEach(function (done) {
      (0, _supertest2.default)(app).put('/api/sales/' + newSale._id).send({
        name: 'Updated Sale',
        info: 'This is the updated sale!!!'
      }).expect(200).expect('Content-Type', /json/).end(function (err, res) {
        if (err) {
          return done(err);
        }
        updatedSale = res.body;
        done();
      });
    });

    afterEach(function () {
      updatedSale = {};
    });

    it('should respond with the updated sale', function () {
      expect(updatedSale.name).to.equal('Updated Sale');
      expect(updatedSale.info).to.equal('This is the updated sale!!!');
    });
  });

  describe('DELETE /api/sales/:id', function () {

    it('should respond with 204 on successful removal', function (done) {
      (0, _supertest2.default)(app).delete('/api/sales/' + newSale._id).expect(204).end(function (err, res) {
        if (err) {
          return done(err);
        }
        done();
      });
    });

    it('should respond with 404 when sale does not exist', function (done) {
      (0, _supertest2.default)(app).delete('/api/sales/' + newSale._id).expect(404).end(function (err, res) {
        if (err) {
          return done(err);
        }
        done();
      });
    });
  });
});
//# sourceMappingURL=sale.integration.js.map
