//// <reference path="typings/main.d.ts" />
"use strict";
/** @ngInject */
function bindHtmlCompile($compile) {
    return {
        restrict: 'A',
        link: function (scope, element, attrs, ngModel) {
            scope.$watch(function () {
                return scope.$eval(attrs.bindHtmlCompile);
            }, function (value) {
                // in case value is a TrustedValueHolderType, sometimes it
                // needs to be explicitly called into a string in order to
                // get the HTML string.
                element.html(value && value.toString());
                var compileScope = scope; // if scope is provided use it, otherwise use parent scope
                if (attrs.bindHtmlScope) {
                    compileScope = scope.$eval(attrs.bindHtmlScope);
                }
                $compile(element.contents())(compileScope);
            });
        }
    };
}
exports.bindHtmlCompile = bindHtmlCompile;
