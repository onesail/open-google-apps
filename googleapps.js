console.info("loading googleapps.js ...");

var app = angular.module('OpenGoogleApps', []);

app.config(['$compileProvider',
    function ($compileProvider) {
        $compileProvider.aHrefSanitizationWhitelist(/^\s*(http?|googledocs|googlesheets|googleslides):/);
    }
]);

app.controller('AppController', function ($scope, $rootScope, $http, $filter, $location) {

    console.info("OpenGoogleApps 07.04.2016");

    $scope.vm = {}

    $scope.clear = function() {
        console.info("clear()");
        $scope.vm.doclink = "";
        $scope.vm.applink = "";
        $scope.vm.appname = "Google's";
        $scope.vm.buttonEnabled = false;
    }

    $scope.makeAppLink = function() {
        console.info("makeAppLink()");
        console.info("doclink: %s", $scope.vm.doclink);

        if (/docs\.google\.com\/document/.test($scope.vm.doclink)) {
            console.info("looks like a document");
            $scope.vm.applink = "googledocs:" + $scope.vm.doclink;
            $scope.vm.appname = "GoogleDocs";
            $scope.vm.buttonEnabled = true;

        } else if (/docs\.google\.com\/spreadsheet/.test($scope.vm.doclink)) {
            console.info("looks like a spreadsheet");
            $scope.vm.applink = "googlesheets:" + $scope.vm.doclink;
            $scope.vm.appname = "GoogleSheets";
            $scope.vm.buttonEnabled = true;

        } else if (/docs\.google\.com\/presentation/.test($scope.vm.doclink)) {
            console.info("looks like a presentation");
            $scope.vm.applink = "googleslides:" + $scope.vm.doclink;
            $scope.vm.appname = "GoggleSlides";
            $scope.vm.buttonEnabled = true;

        } else {
            $scope.vm.applink = "";
            $scope.vm.appname = "Google's";
            $scope.vm.buttonEnabled = false;
        }
        console.info("applink: %s", $scope.vm.applink);
    }

    $scope.clear();

});
