'use strict';

/**
 * @ngdoc service
 * @name exisWebApp.docgen
 * @description
 * # docgen
 * Service in the exisWebApp.
 */
angular.module('exisDocs')
  .service('DocGen',['$http', '$q', '$rootScope', function ($http, $q, $rootScope) {

    this.docs = {};
    this.buildJson = function() {
        var self = this;
        $http.get($rootScope.DOC_JSON).then(function(resp) {
            self.docs = resp.data;
        });
    }

    /**
     * Helps strip out extra white space so the code shows up properly
     * and returns as a string rather than a list.
     */
    this.renderCode = function(code) {
        // How much whitespace is there?
        var minWs = 100;
        for(var i = 0; i < code.length; i++) {
            var ws = code[i].match(/^\s*[^\s]?/)[0].length - 1;
            if(ws < minWs) {
                minWs = ws;
            }
        }
        var c = "";
        for(var i = 0; i < code.length; i++) {
            c += code[i].slice(minWs) + "\n";
        }
        return c;
    }
        
    /**
     * Helper function that returns an object to be used in displaying
     * the docs from a exis-code directive.
     */
    this.getDocs = function(name, lang, action) {
        var d = this.docs[name];
        if(d === undefined) {
            return undefined;
        }
        // Build this up: first step is make a list of langs we need to look at
        var langs = [];
        var langNames = [];
        if(lang === undefined) {
            for(var l in d) {
                var tmp = d[l];
                langs[langs.length] = tmp;
                langNames[langNames.length] = l;
            }
        } else {
            langs[langs.length] = d[lang];
            langNames[langNames.length] = lang;
        }
        
        if(action === undefined) {
            var left = [];
            var leftNames = [];
            var right = [];
            var rightNames = [];
            
            // Build up the action for the left vs right side
            for(var i = 0; i < langs.length; i++) {
                for(var a in langs[i]) {
                    if(a.indexOf("publish") >= 0 || a.indexOf("call") >= 0) {
                        left[left.length] = langs[i][a];
                        leftNames[leftNames.length] = langNames[i];
                    }
                    else if(a.indexOf("subscribe") >= 0 || a.indexOf("register") >= 0) {
                        right[right.length] = langs[i][a];
                        rightNames[rightNames.length] = langNames[i];
                    }
                }
            }
            
            // NOTE that I didn't combine these below because there is a chance that
            // an action is missing, so the array sizes can be unique
            var res = {};
            res.left = [];
            res.right = [];
            for(var i = 0; i < left.length; i++) {
                var tmp = {
                    code: this.renderCode(left[i].code),
                    rawCode: left[i].code,
                    lineStart: left[i].lineStart,
                    lineStart: left[i].lineStart,
                    expectType: left[i].expectType,
                    expectVal: left[i].expectVal,
                    file: left[i].file,
                    lang: leftNames[i]
                };
                res.left[res.left.length] = tmp;
            }
            
            for(var i = 0; i < right.length; i++) {
                var tmp = {
                    code: this.renderCode(right[i].code),
                    rawCode: right[i].code,
                    lineStart: right[i].lineStart,
                    lineStart: right[i].lineStart,
                    expectType: right[i].expectType,
                    expectVal: right[i].expectVal,
                    file: right[i].file,
                    lang: rightNames[i]
                };
                res.right[res.right.length] = tmp;
            }
            return res;
        } 
        // Else an action was specified
        else {
            var res = [];
            for(var i = 0; i < langs.length; i++) {
                var t = langs[i][action];
                var tmp = {
                    code: this.renderCode(t.code),
                    rawCode: t.code,
                    lineStart: t.lineStart,
                    lineStart: t.lineStart,
                    expectType: t.expectType,
                    expectVal: t.expectVal,
                    file: t.file,
                    lang: langNames[i]
                };
                res[res.length] = tmp;
            }
            return res;
        }
    }
    
    /**
     * Pulls @findPage and filters to @find (CSS selector), returns generated html
     */
    var getFindContent = function(findPage, find, helper) {
        return $http.get(findPage).then(function(resp) {
            var pgContent = angular.element(resp.data);
            console.log("GOT BACK: ");
            console.log(pgContent.find(find));
            console.log(helper);
            // Set content based on ref
            //helper.parent().html(pgContent.find(find));
            helper.html(pgContent.find(find));
        });
    }
    
    this.getPageHtml = function(pageName) {
        // Go pull the parent .md file
        return $http.get('/docs/' + pageName).then(function(resp) {
            var content = angular.element("<div>" + marked(resp.data) + "</div>");
            // Find all helper elements
            var helpers = content.find('helper');
            var promises = [];
            
            // Each helper element needs to pull content together, do the pulling here:
            for(var i = 0; i < helpers.length; i++) {
                var h = angular.element(helpers[i]);
                var pg = h.attr('page');
                var pgFind = h.attr('find');
                // http.get returns a promise with content later on, so we need to keep a ref on
                // what to replace once the promise completes
                promises[promises.length] = getFindContent(pg, pgFind, h);
            }

            // Now we have a bunch of promises, we need to wait for these to complete and then return
            // the finished product after
            return $q.all(promises).then(function(resp) {
                return content.html();
            });
            

            //content.find('select > name:contains("template")').parent().wrap('<alert type="note"></alert>');
            //console.log(content.html());
            //return content.html();
            
            //return $q.all(promises);
        });
    }
  }])
  .directive('exisCode', ['DocGen', function(DocGen) {
    /*
     * Directive exisCode (exis-code tags)
     *  This takes <exis-code> tags and turns it into actual code that was
     *  generated by the arbiter system in the Exis repo.
     *
     *  Options:
     *        name - The name of the code to pull 
     *      [lang] - The language, if none then create tabs with all langs
     *    [action] - Expected unless style="side-by-side" which means put the 
     *               corresponding actions next to each other.
     *     [style]
     *         - side-by-side: if you want to show how a pub/sub works in each language
     */
    var linkFunc = function(scope, element, attributes) {
        // First strip out all attrs and add them to scope for easy access
        for(var a in attributes) {
            if(a.indexOf('$') < 0) {
                scope[a] = attributes[a];
            }
        }

        // Does the requested name exist?
        scope.thedoc = DocGen.getDocs(scope.name, scope.lang, scope.action);
        if(scope.thedoc === undefined) {
            scope.alert = 'No examples found for "' + scope.name + '"';
            return;
        }

        if(scope.thedoc.left === undefined) {
            scope.sideBySide = false;
            scope.activeDoc = scope.thedoc[0];
        } else {
            scope.sideBySide = true;
            scope.activeDocLeft = scope.thedoc.left[0];
            scope.activeDocRight = scope.thedoc.right[0];
        }
        scope.alert = "";
    }
    return {
        restrict: 'E',
        templateUrl: "/static/scripts/services/docgen.html",
        scope: {
            /* These are required to isolate the scope between multiple directives */
            name: '@',
            action: '@',
            lang: '@',
            style: '@',
            thedoc: '@',
            sideBySide: '@',
            alert: '@',
            activeDoc: '@',
            activeDocLeft: '@',
            activeDocRight: '@'
        },
        controller: function($scope) {
            $scope.setActiveTab = function(doc, side) {
                if(side === undefined) {
                    $scope.activeDoc = doc;
                }
                else if(side.indexOf("left") >= 0) {
                    $scope.activeDocLeft = doc;
                }
                else if(side.indexOf("right") >= 0) {
                    $scope.activeDocRight = doc;
                }
            }

            /* Capitalize the first letter of the lang */
            $scope.formatLang = function(lang) {
                return lang.charAt(0).toUpperCase() + lang.slice(1);
            }
        },
        link: linkFunc
    };
  }]);
