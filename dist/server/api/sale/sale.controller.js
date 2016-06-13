/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/sales              ->  index
 * POST    /api/sales              ->  create
 * GET     /api/sales/:id          ->  show
 * PUT     /api/sales/:id          ->  update
 * DELETE  /api/sales/:id          ->  destroy
 */

'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.index = index;
exports.show = show;
exports.create = create;
exports.update = update;
exports.destroy = destroy;

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _sqldb = require('../../sqldb');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var path = require('path');

function respondWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function (entity) {
    if (entity) {
      res.status(statusCode).json(entity);
    }
  };
}

function saveUpdates(updates) {
  return function (entity) {
    return entity.updateAttributes(updates).then(function (updated) {
      return updated;
    });
  };
}

function removeEntity(res) {
  return function (entity) {
    if (entity) {
      return entity.destroy().then(function () {
        res.status(204).end();
      });
    }
  };
}

function handleEntityNotFound(res) {
  return function (entity) {
    if (!entity) {
      res.status(404).end();
      return null;
    }
    return entity;
  };
}

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function (err) {
    res.status(statusCode).send(err);
  };
}

// Gets a list of Sales
function index(req, res) {
  var query = req.query;

  if (typeof query.status !== 'undefined' && query.status != "") {
    if (query.status == 1) {
      query.status = 'Belum Diverifikasi';
    } else if (query.status == 2) {
      query.status = 'Sudah Diverifikasi';
      query.hasil_verifikasi = { $ne: 'NOT OK' };
    }
  }

  return _sqldb.Sale.findAll({ where: req.query }).then(respondWithResult(res)).catch(handleError(res));
}

// Gets a single Sale from the DB
function show(req, res) {
  return _sqldb.Sale.find({
    where: {
      _id: req.params.id
    }
  }).then(handleEntityNotFound(res)).then(respondWithResult(res)).catch(handleError(res));
}

// Creates a new Sale in the DB
function create(req, res) {
  return _sqldb.Sale.create(req.body).then(respondWithResult(res, 201)).catch(handleError(res));
}

// Updates an existing Sale in the DB
function update(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  return _sqldb.Sale.find({
    where: {
      _id: req.params.id
    }
  }).then(handleEntityNotFound(res)).then(saveUpdates(req.body)).then(respondWithResult(res)).catch(handleError(res));
}

// Deletes a Sale from the DB
function destroy(req, res) {
  return _sqldb.Sale.find({
    where: {
      _id: req.params.id
    }
  }).then(handleEntityNotFound(res)).then(removeEntity(res)).catch(handleError(res));
}

function saveFile(res, file) {
  return function (entity) {
    var newPath = '/assets/uploads/' + path.basename(file.path);
    entity.file_ktp = newPath;
    return entity.save().spread(function (updated) {
      console.log(updated);
      return updated;
    });
  };
}

function responseWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function (entity) {
    if (entity) {
      res.status(statusCode).json(entity);
    }
  };
}

// Uploads a new Sale's image in the DB
exports.upload = function (req, res) {
  var file = req.files.file;
  if (!file) {
    return handleError(res)('File not provided');
  }

  _sqldb.Sale.findById(req.params.id).then(handleEntityNotFound(res)).then(saveFile(res, file)).then(responseWithResult(res)).catch(handleError(res));
};
//# sourceMappingURL=sale.controller.js.map
