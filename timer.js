// 
// Timer.js
// https://github.com/ewittern/timerjs
//
// Copyright (c) 2013 Erik Wittern
// Licensed under the MIT license
//
;(function(exports,window){
	if(typeof module !== "undefined" && module.exports) {
		module.exports = exports.Timer; // CommonJS
   }else{
		window.Timer = exports.Timer; //script
   }

}((function($){
	var exports = {};
	exports.name = 'timer-js';
	exports.version = '0.0.1';
	exports.Timer = Timer;

	var running = false,
		seconds = 0,
		outputElement = null,
		topics = {},
		subUid = -1,
		eventList = [];

	function Timer(el){
		outputElement = el;
		$(el).html("00:00");
		this.measureSecond();
	};

	Timer.prototype.measureSecond = function() {
		var self = this;
		setTimeout(function (){
			if(running){
				seconds++;
				// get all events for current time-stamp:
				var e = _.where(eventList, {time: seconds});
				// for all events, publish 'timedEvent':
				_.each(e, function(event, key, e){
					self.publish('timedEvent', event.identifier);
					self.publish(event.identifier);
				});
				$(outputElement).html(self.getFormatedTime());
			}
			self.measureSecond();
		}, 1000);
	};

	Timer.prototype.getFormatedTime = function() {
		var mins = Math.floor(seconds/60);
		var secs = seconds % 60;
		if(mins < 10){
			mins = "0" + mins;
		}
		if(secs < 10){
			secs = "0" + secs;
		}
		return mins + ":" + secs;
	};


	//
	//	Controlling the time measuring:
	// 
	Timer.prototype.start = function(){
		running = true;
	};

	Timer.prototype.stop = function(){
		running = false;
	};

	Timer.prototype.reset = function () {
		seconds = 0;
		$(outputElement).html("00:00");
	};

	Timer.prototype.isRunning = function () {
		return running;
	};


	//
	//	Add / remove events:
	//
	Timer.prototype.addEvent = function (identifier, time){
		var event = {
			identifier: identifier,
			time: time
		};
		eventList.push(event);
	};

	Timer.prototype.removeEvent = function (identifier) {
		eventList = _(eventList).reject(function(el) { 
			return el.identifier === identifier;
		});
	};


	//
	//	Publish/Subscribe implementation
	// 	Note:
	//		This part is based on Addy Osmani's Publish/Subscribe implementation
	//		available at: http://addyosmani.com/resources/essentialjsdesignpatterns/book/
	//		License: Creative Commons Attribution-Noncommercial-No Derivative Works 3.0 )
	//
	Timer.prototype.publish = function(topic, args){
		if( !topics[topic] ){
			return false;
		};
		var subscribers = topics[topic],
			len = subscribers ? subscribers.length : 0;
		while (len--) {
			subscribers[len].func(topic, args);
		};
		return this;
	};

	Timer.prototype.subscribe = function(topic, func){
		if (!topics[topic]) {
			topics[topic] = [];
		};
		var token = (++subUid).toString();
		topics[topic].push({
			token: token,
			func: func
		});
		return token;
	};

	Timer.prototype.unsubscribe = function(token) {
		for (var m in topics) {
			if (topics[m]) {
				for(var i = 0, j = topics[m].length; i<j ; i++) {
					if (topics[m][i].token === token){
						topics[m].splice(i,1);
						return token;
					};
				};
			};
		}
		return this;
	};

	return exports;

}(jQuery)),this));