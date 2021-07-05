const Pool = require('pg').Pool
var param = require('./env');


module.exports =  new Pool({
    user: param.user,
    host: param.host,
    database: param.db,
    password: param.pwd,
    port: param.port
});