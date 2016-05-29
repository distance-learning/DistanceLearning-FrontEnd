(function () {
  'use strict';

  angular
      .module('distanceLearning.faculty')
      .controller('FacultyController', FacultyController);

  FacultyController.$inject = [
    '$log', '$location',
    'FacultyHomeUtils', 'FacultyListUtils'
  ];

  function FacultyController($log, $location,
                             FacultyHomeUtils, FacultyListUtils) {
    var vm = this;
    vm.loadingFaculty = true;
    vm.faculties = {
      data: [],
      total: 5
    };
    vm.selectedFaculty = { };
    vm.params = {
      count: 5,
      page: 1
    };

    getFaculties();
    function getFaculties() {
      var path = $location.path();
      if (path === '/faculties') {
        vm.loadingFaculty = true;

        FacultyListUtils.getFaculties(vm.params)
            .then(function (ok) {
              console.log(ok.data);
              vm.faculties.data = ok.data;
              vm.faculties.total = ok.total;
              vm.selectedFaculty = vm.faculties.data[0];
              console.log(vm.selectedFaculty);

              vm.loadingFaculty = false;
            }, function (error) {
              $log.log('[ERROR] FacultyController.FacultyListUtils.getFaculties()', error);
            })
      } else {
        FacultyHomeUtils.getRandomPreviewFaculties()
            .then(function (data) {
              console.log(data);
              console.log(vm.facultiesInfo);
              vm.facultiesInfo = data.data;
            }, function (error) {
              $log.log('[ERROR] FacultyController.FacultyHomeUtils.getRandomPreviewFaculties()', error);
            });
      }
    }

    vm.showFaculty = function () {
      $location.path('/faculties');
    };

    vm.range = function (page) {
      if (!page) { return new Array(1); }

      var countPage = Math.floor(page / 5);
      if ((page % vm.params.count) != 0) { countPage++; }

      return new Array(countPage);
    };

    vm.jumpToPage = function (page) {
      vm.params.page = page;

      getFaculties();
    };

    vm.showFacultyInfo = function (faculty) {
      vm.selectedFaculty = faculty;
    };
  }
})();
