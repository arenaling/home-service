'use strict';

describe('Service: agencies', function () {

  // load the service's module
  beforeEach(module('homeServiceApp.agencies'));

  // instantiate service
  var agencies;
  beforeEach(inject(function (_agencies_) {
    agencies = _agencies_;
  }));

  it('should do something', function () {
    expect(!!agencies).to.be.true;
  });

});
