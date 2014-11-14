'use strict';
/**
 * @ngdoc directive
 * @name mobileSearchBox
 *
 * @description
 * Custom directive for mobile search box in Gizmo
 *
 * @restrict AE
 *
 * @scope
 *
 * @usage
 * <div mobile-search-box></div>
 *
 * */


angular.module('gizmoApp')
		.directive('mobileSearchBox', ['vnSearchManager', function (vnSearchManager) {

			return {
				templateUrl: 'views/partials/mobile-search-box.tpl.html',
				restrict   : 'AE',
				replace    : true,
				scope      : {
					searchTerm: '=',
					showSearch: '='
				},
				link       : function postLink(scope, element, attrs) {
					element.bind('click', function () {
						element.find('input').focus();
					});

					scope.searchTerm = scope.searchTerm || vnSearchManager.getSearchText();
					scope.allowCollapse = attrs.allowCollapse && !!(JSON.parse(attrs.allowCollapse));

					scope.doSearch = function () {
						vnSearchManager.updateSearch(scope.searchTerm);
						scope.showSearch = false;
						if (scope.showSearch) {
							scope.showSearch = false;
						}
					};

					scope.$watch(
							function () {
								return vnSearchManager.getSearchText();
							},
							function (searchText) {
								scope.searchTerm = searchText || '';
							}, true
					);
				}
			};
		}]);
