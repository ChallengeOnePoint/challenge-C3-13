var fs = require('fs');
var app = require('http').createServer(function(req, res){

    var html = fs.readFileSync(__dirname+'/index.html');
    res.end(html);

});



app.listen(8080);

var io = require("socket.io");
var io = io.listen(app);

var lastId = -1,
    list = {};



io.sockets
    .on('connection', function (socket) {
        console.log('new user');

        var uid = (new Date()).getTime();

        socket.emit('initApp', {
            'uid' : uid,
            'list' : list
        });


        socket.on('new_pi', function () {
            console.log('new PI');

            ++lastId;

            var pi = list[lastId] = {
                'id' : lastId,
                'title' : '',
                'desc' : '',
                'editor' : uid
            };

            socket.emit('new_pi', {
                'uid' : uid,
                'pi' : pi
            });

            socket.broadcast.emit('new_pi', {
                'uid' : uid,
                'pi' : pi
            });
        });
        socket.on('edit_pi', function (obj) {
            console.log('edit PI');


            var pi = list[obj.pid];
            pi.editor = uid;

            socket.emit('edit_pi', {
                'uid' : uid,
                'pid' : pid
            });

            socket.broadcast.emit('edit_pi', {
                'uid' : uid,
                'pid' : pid
            });
        });
        socket.on('update_pi', function (obj) {
            console.log('update PI');


            var pi = list[obj.pid];
            pi.editor = null;

            socket.emit('edit_pi', {
                'uid' : uid,
                'pid' : pid
            });

            socket.broadcast.emit('edit_pi', {
                'uid' : uid,
                'pid' : pid
            });
        });
    });