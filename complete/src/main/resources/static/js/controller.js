//inject angular file upload directives and services.
var app = angular.module('mainApp', ['ngFileUpload','ngResource']);

app.factory('FileApi', function($resource) {
	  return $resource('/api/files/:id');
});

app.controller('FileUploadController', ['$scope', 'Upload', '$timeout','FileApi', function ($scope, Upload, $timeout, FileApi) {
    $scope.uploadFiles = function(file, errFiles) {
        $scope.f = file;
        $scope.errFile = errFiles && errFiles[0];
        if (file) {
            file.upload = Upload.upload({
                url: '/api/upload',
                data: {file: file}
            });

            file.upload.then(function (response) {
                $timeout(function () {
                    file.result = response.data;
                });
            }, function (response) {
                if (response.status > 0)
                    $scope.errorMsg = response.status + ': ' + response.data;
            }, function (evt) {
                file.progress = Math.min(100, parseInt(100.0 * 
                                         evt.loaded / evt.total));
            });
        }   
        
    }
    
    $scope.files = FileApi.query();
}]);


var app = angular.module('myApp', ['ngResource']);

