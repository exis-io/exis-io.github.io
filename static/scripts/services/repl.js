'use strict';

/**
 * @repl service
 * @name exis*.repl
 * @description
 * # repl
 * Service in the exis*
 */
angular.module('exisDocs')
  .service('Repl',[ '$http', function ($http) {
    this.DOMAIN = "xs.demo";
    this.myid = null;
    this.session = undefined;

    this.conn = null;
    this.riffle = null;
    this.jsRiffleConn = {};
    var self = this;
    jsRiffle.setFabric('ws://sandbox.exis.io:8000/ws');

    /**
     * Initialize with an existing connection or create a new one.
     */
    this.init = function(conn) {
        //TODO use conn if its real
        //
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
    this.execute = function(name, lang, code, printer, client) {
        if(lang === "js"){
          this.kill(name);
          var conn = this.setJsRiffleConn(name, client, code, printer);
          conn.start();
          return true;
        }
        this.killJSRepl(name, client);
        if(this.riffle === undefined) {
            console.log("No session found, cannot REPL yet");
            return undefined;
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
        return true;
    }

    this.killJSRepl = function(name, client){
      var side = client ? "client" : "backend";
      if(this.jsRiffleConn[name]){
        if(this.jsRiffleConn[name][side] && this.jsRiffleConn[name][side].running){
          this.jsRiffleConn[name][side].stop();
        }
      }
    };

    this.setJsRiffleConn = function(name, client, code, printer){
      if(!this.jsRiffleConn[name]){
        this.jsRiffleConn[name] = {};
      }
      var conn = new ReplJSConn(client);
      conn.regCode(code, printer);
      if(this.jsRiffleConn[name][conn.myside]){
        this.jsRiffleConn[name][conn.myside].stop();
        delete this.jsRiffleConn[name][conn.myside];
      }
      this.jsRiffleConn[name][conn.myside] = conn;
      return conn;
    };

    
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
                console.log("Call completed ", name);
            },
            function (err) {
                console.log("!! Error ", name);
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

    /**
     * The RepJSConn represents a client or server container that user code will be run in
     *
     */

    function ReplJSConn(client){
      this.id = self.getMyId();
      this.client = client;
      if(client){
        this.otherside = 'backend';
        this.myside = 'client';
      }else{
        this.otherside = 'client';
        this.myside = 'backend';
      }
      this.connection = jsRiffle.Domain(this.id + "." + this.myside);
      this.otherConnection = this.connection.linkDomain(this.id + "." + this.otherside);
    }

    ReplJSConn.prototype.regCode = function(code, printer){
      this.printer = printer;
      var mockConsole = {};
      mockConsole.log = printer;
      var fnc = new Function('console', this.otherside, 'riffle', code);
      var self = this;
      this.connection.onJoin = function(){
        try{
          fnc.call(self.connection, mockConsole, self.otherConnection, jsRiffle);
          printer("Build Complete...");
          self.running = true;
        }catch(e){
          printer("Error:\n" + e.message);
          self.connection.Leave();
          return;
        }
      }
    };

    ReplJSConn.prototype.start = function(){
      this.connection.join();
    };

    ReplJSConn.prototype.stop = function(){
      if(this.running){
        this.running = false;
        this.connection.leave();
      }
    };

  }]);
