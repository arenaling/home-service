'use strict';

describe('Component: AgenciesComponent', function () {

  // load the controller's module
  beforeEach(module('homeServiceApp'));

  var AgenciesComponent, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($componentController, $rootScope) {
    scope = $rootScope.$new();
    AgenciesComponent = $componentController('AgenciesComponent', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).to.equal(1);
  });
});
