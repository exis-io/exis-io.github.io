'use strict';

/**
 * @repl service
 * @name exis*.repl
 * @description
 * # repl
 * Service in the exis*
 */
angular.module('exisDocs')
  .service('Repl',[ function () {
    this.DOMAIN = "xs.demo";
    this.myid = null;
    this.session = undefined;

    this.conn = null;
    this.riffle = null;
    /**
     * Initialize with an existing connection or create a new one.
     */
    this.init = function(conn) {
        //TODO use conn if its real
        var m = this.getMyId();
        console.log("Setting up conn: " + m);
        this.conn = new autobahn.Connection({
            url: 'ws://sandbox.exis.io:8000/ws',
            //url: "ws://127.0.0.1:8000/ws",
            realm: m
        });
        var self = this;
        this.conn.onopen = function(session){
            console.log("Connection open");
            self.riffle = session;
        }
        this.conn.open();
    }

    /**
     * How to execute a function and send it to the repler
     */
    this.execute = function(name, lang, code, printer) {
        if(this.riffle === undefined) {
            console.log("No session found, cannot REPL yet");
            return undefined;
        }
        if(lang === "js"){
          lang = "nodejs";
        }
        this.riffle.call("xs.demo.repler/startContainer", [name, lang, code], {}, {receive_progress:true}).then(
            function (res) {
                console.log("Call completed ", name, lang);
            },
            function (err) {
                console.log("!! Error ", name, lang, code);
            },
            printer
        );
    }
    
    /**
     * Send a message to stop this container to free up space
     */
    this.kill = function(name) {
        if(this.riffle === undefined) {
            console.log("No session found, cannot REPL yet");
            return undefined;
        }
        this.riffle.call("xs.demo.repler/stopContainer", [name], {}).then(
            function (res) {
                console.log("Call completed ", name, lang);
            },
            function (err) {
                console.log("!! Error ", name, lang, code);
            }
        );
    }
  
    function randomString(length, chars) {
      var result = '';
      for (var i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
      return result;
    }

    /**
     * Returns myid, if its null then generates one (for sandbox access)
     */
    this.getMyId = function() {
        if(this.myid !== null) {
            return this.myid;
        }
        this.myid = randomString(32, '0123456789abcdefghijklmnopqrstuvwxyz');
        return this.myid;
    }
    

  }]);
