angular.module('gizmoApp')
	.controller('ThemeSettingsCtrl', ['$scope', '$http', '$location', 'ContentMgr',
		function ($scope, $http, $location, ContentMgr) {

			'use strict';

			var apiUrl,
				environment;

			// Update the UI For this page and hide header and footer when this controller is in use
			ContentMgr.hideAppHeader();
			ContentMgr.hideAppFooter();


			if ($location.absUrl().indexOf('127.0.0.1') >= 0 || $location.absUrl().indexOf('localhost') >= 0) {
				//in local development environment (i.e. grunt serve)
				environment = 'dev';
				apiUrl = '/settings/themeSettings.json';
				$scope.debug = true;
			} else {
				//in production
				environment = 'prod';
				var queryString = $location.search();
				apiUrl = '/api/v1/themes/' + queryString.themeName + '/versions/' + queryString.themeVersion + '/settings';
			}

			$http.get(apiUrl)
				.success(function (data) {
					if (environment === 'dev') {
						$scope.settings = data;
					} else {
						$scope.settings = data.data; //API in production has a "data{}" wrapper
					}
				});

			$scope.addSlide = function () {
				$scope.settings.pages.home.slider.slides.push({
					headline   : '',
					subHeadline: '',
					imageUrl   : '',
					linksTo    : ''
				});
			};

			//handle save button
			$scope.save = function () {
				if (environment === 'dev') {
					console.info('would be saved if you were in production');
				} else {
					$http.put(apiUrl, $scope.settings)
						.success(function () {
							console.log('successfully saved');
						});
				}
			};

			// Update the ui and show header / footer when this controller is destroyed
			$scope.$on('$destroy', function cleanUp() {
				ContentMgr.showAppHeader();
				ContentMgr.showAppFooter();
			});

		}]);
