(function () {
  'use strict';

  angular
      .module('distanceLearning.menu')
      .controller('MenuAdminController', MenuAdminController);

  MenuAdminController.$inject = [
    '$mdSidenav'
  ];

  function MenuAdminController ($mdSidenav) {
    var vm = this;
    vm.menuIconURL = 'assests/images/ic_apps_black_18px.svg';

    vm.toggle = function () {
      $mdSidenav('menu-client').toggle();
    }
  }
})();
