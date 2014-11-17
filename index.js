var port = process.env.PORT;
var Hapi = require('hapi');
var server = new Hapi.Server(port);
//http request (Get request) to the home page path that will print Hello World! //
server.route({
    method: 'GET',
    path: '/',
    handler: function (request, reply) {
        reply('Hello, world!');
    }
});

server.route({
    method: 'GET',
    path: '/{name}',
    handler: function (request, reply) { // same as req, res (request response) in Express //
        reply('Hello, ' + request.params.name + '!' + request.query.limit); // app.get('/:name', fn) <-- how it's written in Express //
    }
});

server.route({
    method: 'GET',
    path: '/static/{param*}',
    handler: {
        directory: {
            path: 'static'
        }
    }
});

server.pack.register({
    plugin: require('good'),
    options: {
        reporters: [{
            reporter: require('good-console'),
            args:[{ log: '*', request: '*' }]
        }]
    }
}, function (err) {
    if (err) {
        throw err; // something bad happened loading the plugin
    }

    server.start(function () {
        server.log('info', 'Server running at: ' + server.info.uri);
    });
});