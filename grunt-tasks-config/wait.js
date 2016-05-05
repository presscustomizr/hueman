module.exports = {
	options : {
		delay : 1000
	},
	pause : {
		options : {
			before : function(options) {
				console.log('pausing %dms (waiting for FTP transfer', options.delay);
			},
			after : function() {
				console.log('pause end');
			}
		}
	}
};