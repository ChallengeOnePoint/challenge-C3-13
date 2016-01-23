var fs = require('fs');
var html = fs.readFileSync(__dirname+'/index.html');
var app = require('http').createServer(function(req, res){ res.end(html); });

app.listen(8080);

var io = require("socket.io");
var io = io.listen(app);

var uid = (new Date()).getTime(),
    lastId = -1,
    list = {};

io.sockets.on('connection', function (socket) {
    socket.emit('faitUneAlerte', {
        'uid' : 666,
        'piList' : list
    });
});
io.sockets.on('new', function (socket) {
    ++lastId;

    socket.emit('new_confirm', {
        'uid' : 666,
        'piList' : []
    });
});