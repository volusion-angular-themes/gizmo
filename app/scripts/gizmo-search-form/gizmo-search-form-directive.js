'use strict';
/**
 * @ngdoc directive
 * @name Volusion.toolboxCommon.directive:vnSearchForm
 *
 * @description
 * The `vnSearchForm` directive displays the search box and the
 * search toggle menu displayed in the mobile screen size.
 *
 * @restrict AE
 *
 * @scope
 *
 * @usage
 * <div vn-search-form></div>
 *
 * */


angular.module('gizmoApp')
    .directive('gizmoSearchForm', ['vnSearchManager', function (vnSearchManager) {

        return {
            templateUrl: 'scripts/gizmo-search-form/gizmo-search-form.html',
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
