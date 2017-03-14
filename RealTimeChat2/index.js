var express = require("express");
var app = express();

app.set('views',__dirname + '/tpl');
app.set('view engine',"pug");
app.get('/',function(req,res){
	res.render('page');
});
app.use(express.static(__dirname + '/public'));
var port = 3700;
var io = require('socket.io').listen(app.listen(port));
io.sockets.on('connection',function(socket){
	//欢迎信息
	socket.emit('message',{message:'welcome to the chat'});
	socket.on('send',function(data){
		io.sockets.emit('message',data);
	});
});
console.log('Listenning on port ' + port);
