timer.js
========

Timer.js is a small JavaScript library to set up and handle timed events.

# Dependencies

Timer.js requires underscore.js and jquery.js.

# Usage

## Initialize timer
Provide the HTML element in which you want to display the stopwatch in format 'mm:ss':

```javascript
var timer = new Timer('#output');
```

```html
<p id="output"></p>
```

## Add events
Each event is provided with an id and with the time of occurrence in seconds. Events can also be removed.

```javascript
timer.addEvent("event_a", 1);
timer.addEvent("event_b", 4);
timer.addEvent("event_c", 5);
timer.removeEvent("event_b");
```

## React to events
Subscribe to "timedEvent" to set up handler for any event. The callback will get the event object (probably irrelevant) and the id provided for the event originally.

```javascript
var subscription = timer.subscribe('timedEvent', function(e, identifier){
	console.log(identifier); // will output "event_a" after one second and "event_c" after 5 seconds
});
```

You can also subscribe to an individual event using its identifier:

```javascript
var subscriptionIndividual = timer.subscribe('event_a', function(e){
	console.log("event_a");
});
```

You can later also unsubscribe, if desired:

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

Use jQuery to make use of the controls:
```javascript
$('#start-stop-btn').click(function(){
	var running = timer.isRunning();
	if(running){
		timer.stop();
		$('#start-stop-btn').html("Resume");
	} else {
		timer.start();
		$('#start-stop-btn').html("Pause");
	};
});

$('#reset-btn').click(function(){
	timer.reset();
});
```

