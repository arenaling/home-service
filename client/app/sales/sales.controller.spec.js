'use strict';

describe('Component: SalesComponent', function () {

  // load the controller's module
  beforeEach(module('homeServiceApp'));

  var SalesComponent, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($componentController, $rootScope) {
    scope = $rootScope.$new();
    SalesComponent = $componentController('SalesComponent', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).to.equal(1);
  });
});
