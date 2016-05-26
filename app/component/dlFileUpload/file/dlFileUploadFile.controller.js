(function () {
  'use strict';

  angular
      .module('distanceLearning.component.dlFileUpload')
      .controller('dlFileUploadFileController', dlFileUploadFileController);

  dlFileUploadFileController.$inject = [
    '$log', '$mdToast', '$mdDialog',
    'FileUploader',
    'dlFileUploadUtils'
  ];

  function dlFileUploadFileController($log, $mdToast, $mdDialog,
                                      FileUploader,
                                      dlFileUploadUtils) {
    var vm = this;
    vm.closeIconURL = './assests/images/ic_remove_circle_black_18px.svg';
    vm.uploadFileIconURL = './assests/images/ic_cloud_upload_black_24px.svg';
    vm.cancelUploadIconURL = './assests/images/ic_remove_circle_black_18px.svg';
    vm.templateFileIconURL = './assests/images/ic_data_usage_black_24px.svg';
    vm.files = {
      data: [ ],
      total: 10
    };
    vm.filesParams = {
      page: 1,
      count: 10
    };
    vm.loadingFiles = false;

    vm.uploader = new FileUploader({
      autoUpload: false,
      url: dlFileUploadUtils.getUploadURL(),
      headers: {
        'Authorization': dlFileUploadUtils.getUploadHeader()
      }
    });

    getFiles();
    function getFiles() {
      vm.loadingFiles = false;

      dlFileUploadUtils.getFiles(vm.filesParams)
          .then(function (files) {
            vm.files.data = files.data;
            vm.files.total = files.total;

            vm.loadingFiles = false;
          }, function (err) {
            $log.log('[ERROR] dlFileUploadFileController.getFiles().dlFileUploadUtils.files()', err);
          });
    }

    vm.close = function () {
      $mdDialog.cancel();
    };

    vm.clipboardSuccess = function () {
      $mdToast.show(
          $mdToast.simple()
              .textContent('Посилання на файл збережено в буфер')
              .hideDelay(3000)
      );
    };

    vm.jumpToPage = function (page) {
      vm.filesParams.page = page;

      getFiles();
    };

    vm.range = function (page) {
      if (!page) {
        return new Array(1);
      }

      var countPage = Math.floor(page / vm.filesParams.count);
      if ((page % vm.filesParams.count) != 0) {
        countPage++;
      }

      return new Array(countPage);
    };

    vm.editFileName = function (fileName) {
      vm.uploader.queue[0].file.name = fileName;
    };

    vm.uploader.onSuccessItem = function(fileItem, response, status, headers) {
      if (status != 200) {
        return $mdToast.show(
            $mdToast.simple()
                .textContent('Помилка при завантажені файлу')
                .hideDelay(3000)
        );
      }

      $mdToast.show(
          $mdToast.simple()
              .textContent('Файл ' + fileItem.filename + 'завантажено')
              .hideDelay(3000)
      );
    };
  }
})();
