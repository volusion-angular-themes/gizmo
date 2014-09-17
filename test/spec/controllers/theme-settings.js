'use strict';

describe('Controller: ThemeSettingsCtrl', function () {

  // load the controller's module
  beforeEach(module('gizmoApp'));

  var ThemeSettingsCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ThemeSettingsCtrl = $controller('ThemeSettingsCtrl', {
      $scope: scope
    });
  }));

    it('should exist', function() {
        expect(ThemeSettingsCtrl).toBeDefined();
    });
});
