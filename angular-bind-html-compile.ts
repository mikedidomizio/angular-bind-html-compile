/// <reference path="typings/main.d.ts" />

interface IAttrs extends ng.IAttributes {
  bindHtmlCompile: string;
  bindHtmlScope: string;
}

/** @ngInject */
export function bindHtmlCompile($compile: ng.ICompileService): angular.IDirective {
  return {
    restrict: 'A',
    link: function (scope: ng.IScope , element: JQuery, attrs: IAttrs, ngModel: ng.INgModelController) {
      scope.$watch(function () {
        return scope.$eval(attrs.bindHtmlCompile);
      }, function (value: string) {
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