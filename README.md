timer.js
========

Timer.js is a small JavaScript library to set up and handle timed events.

# Dependencies

Timer.js requires underscore.js and jquery.js.

# Usage

## Initialize timer
Initialize a new timer in the following way:
```javascript
var timer = new Timer();
```

If desired, provide an HTML element where to display the stopwatch in format 'mm:ss':

```html
<p id="output"></p>
```

```javascript
var timer = new Timer('#output');
```

## Add events
Each event is provided with an id and with the time of occurrence in seconds.

```javascript
timer.addEvent("event_a", 1);
timer.addEvent("event_b", 4);
timer.addEvent("event_c", 5);
```
Events can also be removed.

```javascript
timer.removeEvent("event_b");
```

## React to events
Subscribe to "timedEvent" to set up handler for any event. The callback will get the event object (probably irrelevant) and the id provided for the event originally.

```javascript
var subscription = timer.subscribe('timedEvent', function(e, identifier){
	console.log(identifier); // will output "event_a" after 1 second and "event_c" after 5 seconds
});
```

You can also subscribe to an individual event using its identifier:

```javascript
var subscriptionIndividual = timer.subscribe('event_a', function(e){
	console.log("event_a");
});
```

You can also unsubscribe from events:

```javascript
timer.unsubscribe(subscription);
```

## Control timer
You can control the timer in the following way:

```javascript
timer.start() // starts timer initially or resumes stopped timer
timer.stop() // stops running timer
timer.reset() // resets timer to 0 - already fired events will be fired again
```

## UI control of timer (optional)
To illustrate the usage of timer.js in combination with UI elements, consider the following example:

Set up the html:
```html
<button id="start-stop-btn">Start</button>
<button id="reset-btn">Reset</button>
```

Use jQuery to allow users to start/stop the timer:
```javascript
$('#start-stop-btn').click(function(){
	if(timer.isRunning()){
		timer.stop();
		$('#start-stop-btn').html("Resume");
	} else {
		timer.start();
		$('#start-stop-btn').html("Pause");
	};
});
```

Allow users to reset the timer:

```javascript
$('#reset-btn').click(function(){
	timer.reset();
});
```

