
module.exports = function(res) {
    return {
        c: 200,
        code: function(c) {
            this.c = c;
            return this;
        },

        send: function(content) {
            res.end(content.toString('utf-8'));
            this.c = 200;
            return this;
        },

         json: function(o) {
            res.writeHead(this.c, {'Content-Type': 'application/json; charset=utf-8'});
            return this.send(JSON.stringify(o));
        },

        html: function(content) {
            res.writeHead(this.c, { 'Content-Type': 'text/html ; charset=utf-8'})
            return this.send(content);
        }
/*
        css: function(content) {
            res.writeHead(this.c, { 'Content-Type': 'text/css ; charset=utf-8'})
            return this.send(content);
        },

        js: function(content) {
            res.writeHead(this.c, { 'Content-Type': 'application/javascript ; charset=utf-8'})
            return this.send(content);
        },

        text: function(content) {
            res.writeHead(this.c, { 'Content-Type': 'text/plain ; charset=utf-8'})
            return this.send(content);
        }*/
    }
}