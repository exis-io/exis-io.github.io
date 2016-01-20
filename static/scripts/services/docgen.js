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
    this.highlight = null;
    this.buildJson = function(highlight) {
        var self = this;
        this.highlight = highlight;
        
        $http.get($rootScope.DOC_JSON).then(function(resp) {
            self.docs = resp.data;
        });
    }

    /**
     * Helps strip out extra white space so the code shows up properly
     * and returns as a string rather than a list.
     */
    this.renderCode = function(code, leaveWhitespace) {
        var minWs = 0;
        if(leaveWhitespace !== true) {
            minWs = 100;
            // How much whitespace is there?
            for(var i = 0; i < code.length; i++) {
                var ws = code[i].match(/^\s*[^\s]?/)[0].length - 1;
                if(ws < minWs && ws >= 0) {
                    minWs = ws;
                }
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
            var leftActions = [];
            var right = [];
            var rightNames = [];
            var rightActions = [];
            
            // Build up the action for the left vs right side
            for(var i = 0; i < langs.length; i++) {
                for(var a in langs[i]) {
                    if(a.indexOf("publish") >= 0 || a.indexOf("call") >= 0) {
                        left[left.length] = langs[i][a];
                        leftNames[leftNames.length] = langNames[i];
                        leftActions[leftActions.length] = a;
                    }
                    else if(a.indexOf("subscribe") >= 0 || a.indexOf("register") >= 0) {
                        right[right.length] = langs[i][a];
                        rightNames[rightNames.length] = langNames[i];
                        rightActions[rightActions.length] = a;
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
                    lang: leftNames[i],
                    action: leftActions[i],
                    client: true,
                    replResults: null,
                    rawResults: ""
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
                    lang: rightNames[i],
                    action: rightActions[i],
                    client: false,
                    replResults: null,
                    rawResults: ""
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
                // Can't find the action they requested
                if(t === undefined) {
                    return undefined;
                }
                var tmp = {
                    code: this.renderCode(t.code),
                    rawCode: t.code,
                    lineStart: t.lineStart,
                    lineStart: t.lineStart,
                    expectType: t.expectType,
                    expectVal: t.expectVal,
                    file: t.file,
                    lang: langNames[i],
                    action: action,
                    client: false,
                    replResults: null,
                    rawResults: ""
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
  .directive('exisCode', ['DocGen', '$compile', '$sce', 'Repl', function(DocGen, $compile, $sce, Repl) {
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
     *      [repl] - If the code is allowed to execute, true by default.
     */
    var linkFunc = function(scope, element, attributes) {
        // First strip out all attrs and add them to scope for easy access
        // repl is on by default
        if(scope.repl === undefined) {
            scope.repl = false; // TODO switch back to true;
        } else {
            scope.repl = (scope.repl === "true");
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
        if('editable' in attributes){
          scope.editable = true;
        }
        if('hljs' in attributes){
          scope.hljs = true;
        }
        if('norepl' in attributes){
          scope.repl = false;
        }
        scope.alert = "";
    };
    return {
        restrict: 'E',
        templateUrl: "/static/scripts/services/docgen.html",
        scope: {
            name: '@name',
            repl: '@repl',
            action: '@action',
            lang: '@lang'
        },
        controller: ['$scope', '$sce', '$timeout', function($scope, $sce, $timeout) {
            $scope.showRepl = function(c) {
                if(c === true || c === false) {
                    return c;
                } else {
                    return (c === "true");
                }
            }
            
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

            $scope.highlight = function(lang, code) {
                if(code === undefined) {
                    return code;
                } else {
                    if(lang === undefined) {
                        // We don't know the language, let them deal with it
                        return $sce.trustAsHtml(DocGen.highlight.highlightAuto(code).value);
                    } else {
                        // We know the language, specify it
                        return $sce.trustAsHtml(DocGen.highlight.highlight(lang, code).value);
                    }
                }
            }

            /* Capitalize the first letter of the lang */
            $scope.formatLang = function(lang) {
                return lang.charAt(0).toUpperCase() + lang.slice(1);
            }

            /* convert js to javascript for highlighting */
            $scope.modeLang = function(lang) {
              if(lang === 'js'){
                return 'javascript';
              }else{
                return lang;
              }
            }

            $scope.aceLoad = function(editor){
              editor.$blockScrolling = Infinity;
            };
            
            /* Execute the repl code provided */
            $scope.replClick = function(doc) {
                doc.rawResults = "";
                doc.replResults = "";
                function printResults(prog) {
                    if(typeof(prog) === 'object'){
                      prog = JSON.stringify(prog);
                    }else{
                      prog = String(prog);
                    }
                    // Strip out known stuff that shouldn't get displayed
                    if(prog.indexOf("___BUILDCOMPLETE___") >= 0) {
                        prog = "Build complete...";
                    }
                    $timeout(function () {
                        doc.rawResults += prog + "\n";
                        doc.replResults = $scope.highlight(doc.lang, doc.rawResults);
                    }, 0);
                }
                doc.rawCode = doc.code.split('\n');
                doc.rawCode.forEach(function(elem, ind, arr){arr[ind] = "        " + elem;});
                Repl.execute(doc.action, doc.lang, DocGen.renderCode(doc.rawCode, true), printResults, doc.client);
            }

        }],
        link: linkFunc
    };
  }]);
