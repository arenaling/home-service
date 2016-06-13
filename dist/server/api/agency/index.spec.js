'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var agencyCtrlStub = {
  index: 'agencyCtrl.index',
  show: 'agencyCtrl.show',
  create: 'agencyCtrl.create',
  update: 'agencyCtrl.update',
  destroy: 'agencyCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var agencyIndex = proxyquire('./index.js', {
  'express': {
    Router: function Router() {
      return routerStub;
    }
  },
  './agency.controller': agencyCtrlStub
});

describe('Agency API Router:', function () {

  it('should return an express router instance', function () {
    expect(agencyIndex).to.equal(routerStub);
  });

  describe('GET /api/agencies', function () {

    it('should route to agency.controller.index', function () {
      expect(routerStub.get.withArgs('/', 'agencyCtrl.index')).to.have.been.calledOnce;
    });
  });

  describe('GET /api/agencies/:id', function () {

    it('should route to agency.controller.show', function () {
      expect(routerStub.get.withArgs('/:id', 'agencyCtrl.show')).to.have.been.calledOnce;
    });
  });

  describe('POST /api/agencies', function () {

    it('should route to agency.controller.create', function () {
      expect(routerStub.post.withArgs('/', 'agencyCtrl.create')).to.have.been.calledOnce;
    });
  });

  describe('PUT /api/agencies/:id', function () {

    it('should route to agency.controller.update', function () {
      expect(routerStub.put.withArgs('/:id', 'agencyCtrl.update')).to.have.been.calledOnce;
    });
  });

  describe('PATCH /api/agencies/:id', function () {

    it('should route to agency.controller.update', function () {
      expect(routerStub.patch.withArgs('/:id', 'agencyCtrl.update')).to.have.been.calledOnce;
    });
  });

  describe('DELETE /api/agencies/:id', function () {

    it('should route to agency.controller.destroy', function () {
      expect(routerStub.delete.withArgs('/:id', 'agencyCtrl.destroy')).to.have.been.calledOnce;
    });
  });
});
//# sourceMappingURL=index.spec.js.map
