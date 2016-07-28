/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/sales              ->  index
 * POST    /api/sales              ->  create
 * GET     /api/sales/:id          ->  show
 * PUT     /api/sales/:id          ->  update
 * DELETE  /api/sales/:id          ->  destroy
 */

'use strict';

import _ from 'lodash';
import {Sale} from '../../sqldb';

var path = require('path');

function respondWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function(entity) {
    if (entity) {
      res.status(statusCode).json(entity);
    }
  };
}

function saveUpdates(updates) {
  return function(entity) {
    return entity.updateAttributes(updates)
      .then(updated => {
        return updated;
      });
  };
}

function removeEntity(res) {
  return function(entity) {
    if (entity) {
      return entity.destroy()
        .then(() => {
          res.status(204).end();
        });
    }
  };
}

function handleEntityNotFound(res) {
  return function(entity) {
    if (!entity) {
      res.status(404).end();
      return null;
    }
    return entity;
  };
}

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function(err) {
    console.log(err);
    res.status(statusCode).send(err);
  };
}

// Gets a list of Sales
export function index(req, res) {
  var query = req.query;
  var limit = 10;

  if(typeof query.status !== 'undefined' && query.status != "") {
    if(query.status == 1) {
      query.status = 'Belum Diverifikasi';
    } else if(query.status == 2) {
      query.status = 'Sudah Diverifikasi';
      query.hasil_verifikasi = {$ne: 'NOT OK'};
    }
  }

  if(typeof query.page !== 'undefined' && query.page != "") {
    var page = query.page;
    var offset = ((page - 1) * limit);
    delete query.page;

    if(typeof query.tanggal !== 'undefined' && query.tanggal != "") {
      query.tanggal_penyerahan = {$gte: ""+query.tanggal+" 00:00:00", $lte: ""+query.tanggal+" 23:59:59"};
      delete query.tanggal;
    }

    return Sale.findAll({where: req.query, order: "updatedAt DESC", limit: limit, offset: offset})
      .then(respondWithResult(res))
      .catch(handleError(res));
  } else {
    return Sale.findAll({where: req.query})
      .then(respondWithResult(res))
      .catch(handleError(res));
  }
}

// Gets a count of Sales
export function count(req, res) {
  var query = req.query;

  if(typeof query.status !== 'undefined' && query.status != "") {
    if(query.status == 1) {
      query.status = 'Belum Diverifikasi';
    } else if(query.status == 2) {
      query.status = 'Sudah Diverifikasi';
      query.hasil_verifikasi = {$ne: 'NOT OK'};
    }
  }

  if(typeof query.page !== 'undefined' && query.page != "") {
    delete query.page;
  }

  return Sale.count({where: req.query})
    .then(function(count) {
      var statusCode = 200;

      var ret = {"count": count};

      res.status(statusCode).json(ret);
    })
    .catch(handleError(res));
}

// Gets a single Sale from the DB
export function show(req, res) {
  return Sale.find({
    where: {
      _id: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Creates a new Sale in the DB
export function create(req, res) {
  return Sale.create(req.body)
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}

// Updates an existing Sale in the DB
export function update(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  return Sale.find({
    where: {
      _id: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(saveUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Deletes a Sale from the DB
export function destroy(req, res) {
  return Sale.find({
    where: {
      _id: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}

function saveFile(res, file) {
  return function(entity){
    var newPath = '/assets/uploads/' + path.basename(file.path);
    entity.file_ktp = newPath;
    return entity.save();//.spread(function(updated) {
    //   console.log(updated);
    //   return updated;
    // });
  }
}

function responseWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function(entity) {
    if (entity) {
      res.status(statusCode).json(entity);
    }
  };
}

// Uploads a new Sale's image in the DB
exports.upload = function(req, res) {
  var file = req.files.file;
  if(!file){
    return handleError(res)('File not provided');
  }

  Sale.findById(req.params.id)
    .then(handleEntityNotFound(res))
    .then(saveFile(res, file))
    .then(responseWithResult(res))
    .catch(handleError(res));
};
