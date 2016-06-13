'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var saleCtrlStub = {
  index: 'saleCtrl.index',
  show: 'saleCtrl.show',
  create: 'saleCtrl.create',
  update: 'saleCtrl.update',
  destroy: 'saleCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var saleIndex = proxyquire('./index.js', {
  'express': {
    Router: function Router() {
      return routerStub;
    }
  },
  './sale.controller': saleCtrlStub
});

describe('Sale API Router:', function () {

  it('should return an express router instance', function () {
    expect(saleIndex).to.equal(routerStub);
  });

  describe('GET /api/sales', function () {

    it('should route to sale.controller.index', function () {
      expect(routerStub.get.withArgs('/', 'saleCtrl.index')).to.have.been.calledOnce;
    });
  });

  describe('GET /api/sales/:id', function () {

    it('should route to sale.controller.show', function () {
      expect(routerStub.get.withArgs('/:id', 'saleCtrl.show')).to.have.been.calledOnce;
    });
  });

  describe('POST /api/sales', function () {

    it('should route to sale.controller.create', function () {
      expect(routerStub.post.withArgs('/', 'saleCtrl.create')).to.have.been.calledOnce;
    });
  });

  describe('PUT /api/sales/:id', function () {

    it('should route to sale.controller.update', function () {
      expect(routerStub.put.withArgs('/:id', 'saleCtrl.update')).to.have.been.calledOnce;
    });
  });

  describe('PATCH /api/sales/:id', function () {

    it('should route to sale.controller.update', function () {
      expect(routerStub.patch.withArgs('/:id', 'saleCtrl.update')).to.have.been.calledOnce;
    });
  });

  describe('DELETE /api/sales/:id', function () {

    it('should route to sale.controller.destroy', function () {
      expect(routerStub.delete.withArgs('/:id', 'saleCtrl.destroy')).to.have.been.calledOnce;
    });
  });
});
//# sourceMappingURL=index.spec.js.map
