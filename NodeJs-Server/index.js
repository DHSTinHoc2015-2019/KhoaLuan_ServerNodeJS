var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);

var mysql = require('mysql');

var cors = require('cors');

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "tpack"
});

server.listen(3000);

app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8000');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

app.get('/demoLike', function (req, res) {
	con.connect(function(err) {
		con.query("SELECT * FROM demolike", function (err, result, fields) {
			res.send(result)
			// console.log(result);
		});
	});
});

io.on('connection', function (socket) {
	console.log(`Đã có thằng vào với id là: ${socket.id}`);
	// socket.emit('news', { hello: 'world' });
	socket.on('ten_tin_hieu', function (data) {
		console.log(data)
		// socket.emit('tin_hieu_ve')
		io.emit('tin_hieu_ve', data)
	});
});
