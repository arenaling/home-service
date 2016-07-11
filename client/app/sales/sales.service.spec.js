'use strict';

describe('Service: sales', function () {

  // load the service's module
  beforeEach(module('homeServiceApp'));

  // instantiate service
  var sales;
  beforeEach(inject(function (_sales_) {
    sales = _sales_;
  }));

  it('should do something', function () {
    expect(!!sales).to.be.true;
  });

});
