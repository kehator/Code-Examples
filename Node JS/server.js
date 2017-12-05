var server = require('http').Server(),
	io = require('socket.io')(server),
	mysql = require('mysql'),
	Redis = require('ioredis'),
	utils = require('./api/utils'),
	redis = new Redis();
	clients = [];
	
var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "****",
  database: "****"
});

con.connect((err) => {
  if (err) {
  	console.log('ERROR WITH MYSQL CONNECTION');
  	throw err;
  }
  // console.log("Connected!\n");
});

redis.subscribe('app-channel');
redis.on('message', (channel, message) => {
    message = JSON.parse(message);
	// console.log('channel: ' + channel);
	// console.log('message: ' + message.event);	
    io.emit(channel + ':' + message.event, message.data);	
});


io.on('connect', (socket) => {
	clients.push(socket.id);
	console.log(clients);

	socket.on('disconnect', function() {
		clients.splice(clients.indexOf(socket.id), 1);
		console.log(clients);
	});

	// console.log('connection made: ' + socket.id);

	socket.on('join', (userRoom) => {
		socket.join([userRoom, 'chat']);
	});

	socket.on('UserDoSomeWork', (data) => {

	  	con.query("SELECT job, job_end_time FROM users WHERE id = 1", (err, result, fields) => {
		  	if (err) {
		  		console.log('ERROR WITH MYSQL OCCURED');
		  		throw err;
		  	}

		  	if (result.length > 0 && result[0].job_end_time === null) {
		  		timestamp = Date.now();
		  		work_time = 5 * 1000;
		  		next_job_timestamp = timestamp + work_time;

		  		start_time = new Date(timestamp).toISOString().replace('T', ' ').substr(0, 19);
		  		end_time = new Date(next_job_timestamp).toISOString().replace('T', ' ').substr(0, 19);

		  		con.query("UPDATE users SET job_start_time = ?, job_end_time = ? WHERE id = 1", [start_time, end_time], (err, result) => {
		  			if (err) {
		  				console.log('ERROR WITH MYSQL OCCURED 2');
		  				throw err;
		  			}
		  			console.log(result.affectedRows + " record(s) end_time updated -> " + end_time);
		  			socket.emit('update-start', {'start_timestamp': timestamp, 'end_timestamp': next_job_timestamp});
		  		});


		  		setTimeout(() => {
				  	current_job = result[0].job
					next_job = current_job + 1;

					con.query("UPDATE users SET job = ?, job_start_time = ?, job_end_time = ? WHERE id = 1", [next_job, null, null], (err, result) => {
						if (err) {
							console.log('ERROR WITH MYSQL OCCURED 3');
							throw err;
						}
						console.log(result.affectedRows + " record(s) next_job updated -> " + next_job);
						io.emit('update-done', {job: next_job});
					});
				}, work_time);
			} else {
				socket.emit('job-update-error', 'error with processing the job');
			}
		});

		// io.in(data.userRoom).emit('updated', {'event message': 123, 'id': socket.id});
		// console.log(data.skill)
		// io.in('chat').send('we are here');
		// socket.to('chat').send('i am here');


		// //do some stuff and then...
		// setTimeout( () => {
		// 	io.in(data.userRoom).send({'event message': 123, 'id': socket.id});
		// 	io.in(data.userRoom).emit('welcome', {'start_time': 123, 'end_time': 456, 'id': socket.id});
		// }, 3000 );
	});
});


server.listen(6001, () => {
	console.log('Up and running ...\n');	
});