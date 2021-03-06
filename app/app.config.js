(function () {
  'use strict';

  angular
      .module('distanceLearning')
      .config(configURL)
      .config(configAuth)
      .config(configCalendar)
      .config(toastrConfig);

  configURL.$inject = ['$routeProvider'];
  configAuth.$inject = ['$authProvider'];
  configCalendar.$inject = ['$mdDateLocaleProvider'];
  toastrConfig.$inject = ['toastrConfig'];

  function configURL($routeProvider) {
    $routeProvider
        .when('/login', {
          template: '<login></login>'
        })
        .when('/register', {
          template: '<register></register>'
        })
        .when('/reset-password', {
          template: '<reset-pass></reset-pass>'
        })
        .when('/home', {
          template: '<home></home>'
        })
        .when('/faculties', {
          template: '<faculty-info></faculty-info>'
        })
        .when('/profile/reset-password', {
          template: '<profile-reset-password></profile-reset-password>'
        })
        .when('/profile/change-info', {
          template: '<profile-change-info></profile-change-info>'
        })
        .when('/profile/admin', {
          template: '<profile-admin></profile-admin>'
        })
        .when('/profile/teacher', {
          template: '<profile-teacher></profile-teacher>'
        })
        .when('/profile/student', {
          template: '<profile-student></profile-student>'
        })
        .when('/reset-password/:token', {
          template: '<profile-reset-password></profile-reset-password>'
        })
        .when('/admin/users', {
          template: '<users></users>'
        })
        .when('/admin/users/info/:slug', {
          template: '<user-page-info></user-page-info>'
        })
        .when('/admin/faculties', {
          template: '<faculty-list></faculty-list>'
        })
        .when('/admin/tests', {
          template: '<test-list></test-list>'
        })
        .when('/admin/groups', {
          template: '<group-list></group-list>'
        })
        .when('/admin/subject', {
          template: '<subject></course>'
        })
        .when('/admin/subject/info', {
          template: '<subject-page-info></subject-page-info>'
        })
        .when('/admin/course', {
          template: '<course></course>'
        })
        .when('/admin/course/info', {
          template: '<course-page-info></course-page-info>'
        })
        .when('/admin/course/info/:slug', {
          template: '<course-page-info></course-page-info>'
        })
        .when('/admin/faculties/info/:slug', {
          template: '<faculty-page-info></faculty-page-info>'
        })
        .when('/test/:testId/edit', {
          template: '<test-build></test-build>'
        })
        .when('/test/:testId', {
          template: '<test-pass></test-pass>'
        })
        .when('/test/result/history', {
          template: '<test-result></test-result>'
        })
        .when('/test/:testId/question/:questionId', {
          template: '<test-build-question></test-build-question>'
        })
        .otherwise({
          redirectTo: '/home'
        });
  }

  function configAuth($authProvider) {
    $authProvider.httpInterceptor = function() { return true; };
    $authProvider.baseUrl = 'http://distance-learning.herokuapp.com/';
    $authProvider.loginUrl = '/api/auth/login';
    $authProvider.signupUrl = '/api/auth/registration';
    $authProvider.tokenName = 'token';
    $authProvider.storageType = 'sessionStorage';
    $authProvider.authToken = 'Bearer';
    $authProvider.authHeader = 'Authorization';
  }

  function configCalendar($mdDateLocaleProvider) {
    $mdDateLocaleProvider.firstDayOfWeek = 1;
  }

  function toastrConfig(toastrConfig) {
    angular.extend(toastrConfig, {
      autoDismiss: false,
      containerId: 'toast-container',
      progressBar: true,
      newestOnTop: true,
      positionClass: 'toast-bottom-left',
      preventDuplicates: false,
      preventOpenDuplicates: false,
      target: 'body'
    })
  }
})();

