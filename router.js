var url = require('url');
var qs = require('querystring');
var responder = require("./responder");
var pool = require('./pool');


var routes = [];

function processRequest(req, callback){
    var body = '';
    req.on('data', function(data) {
        body += data;
    });
    req.on('end', function() {
        callback(qs.parse(body));
    });
};

module.exports = {
    register: function(method, route, handler){
        routes.push({ method: method, route: route, handler: handler });
    },

    process: function(req, res, next) {
        var urlInfo = url.parse(req.url, true);
        var info = {
            get: urlInfo.query,
            post: {},
            path: urlInfo.pathname,
            method: req.method
        }

        for (var i = 0; i < routes.length; i++)
        {
            var r = routes[i];
            var match = info.path.match(r.route);

            if ( (info.method === r.method || '' === r.method) && match)
            {
                info.match = match;
                if ( info.method === 'POST' || info.method === 'PUT')
                {
                        processRequest(req, function(body){
                        info.post = body;
                        r.handler(req, res, info);
                    });
                }
                else 
                {
                    r.handler(req, res, info);
                }
                return;
            }
        }
        res.end('');
    },

    get: function(route, handler) {
        this.register('GET', route, handler);
    },

    post: function(route, handler) {
        this.register('POST', route, handler);
    },

    put: function( route, handler){
        this.register('PUT', route, handler);
    },

    del: function(route, handler) {
        this.register('DELETE', route, handler);
    },

    all: function(route, handler) {
        this.register('', route, handler);
    },

    getAllCapteurs: function(req, res, info) {

        pool.query('SELECT * FROM capteur', (error, results) => {
            console.log('ici dans la fonction pool');
            if(error) {
                throw error
            }
            console.log(info);
            console.log(results.rows);
            responder(res).code(200).json(results.rows);
        })
       
    },


    getSortieCapteurByName: function(req, res, info) {
        var nom_capteur = info.match[1];

        pool.query('SELECT nom_sortie FROM sortie WHERE nom_capteur=$1', [nom_capteur], (error, results) => {
            if(error) {
                throw error;
            }
            console.log(info);
            responder(res).code(200).json(results.rows);
        })
    }



}

