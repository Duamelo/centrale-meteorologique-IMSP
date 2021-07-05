var http = require('http');
var router = require('./router');
var port = 3000;


//points de termination api

router.get(/\/capteurs(.+)?/, router.getAllCapteurs);

router.get(/\/sortie_capteur\/(.+)?/, router.getSortieCapteurByName);




// création du serveur
http.createServer(router.process).listen(port, 'localhost');
console.log('API listening');

