# netdb.io-plugins
netdb.io plugins.

## This is the oficial repository for netdb.io

## What is a netdb plugin?
Plugins are tools that will run agains the dataset of specific workspace. PLugins run sandboxed, so no plugin can comunicate with the netdb software, but netdb suftware can. Plugin trying to access to the netdb platform itself, will be deleted.

We are ussing the API method 'postMessage', the Window.postMessage() method safely enables cross-origin communication. 

## Coding standars


## How it works?
QUite simple.

1. netdb will dispatch to your html, postMesage event with an array.
2. Array will contain two key:values which are: data and configuration.
3. Then.. You will recivie the event message, and do something with the data and config.
 
## Current plugins
* host screenshot
* 

##  Submit your plugin

## Tutorial
1. Create and folder with the name of your plugin
2. Add an index.html file to the root of your folder.
3. Create an app.js file to the root of your folder.
4. Add the following code to your html to recieve the data from the netdb app. The Window.postMessage() method safely enables cross-origin communication.  [see here API](https://developer.mozilla.org/en-US/docs/Web/API/Window/postMessage)
```javascript
// we are reciving the data with this "magic" method
	window.addEventListener('message', function(event){
	    if (~event.origin.indexOf('http://netdb.io')) 
	    initPlugin(event.data);
	});
 // we prefer to use this naming convention
	function initPlugin(response){
			var config = response['config']['key']; 
			var data = response['data'];
   console.log(config, data);
   // ...do whatever with your plugin
	}
```
5. Create a config.json file, containing separted by comma, all the fields required to be sent by netdb app to the plugin(eh:ip, latitude, longitude).

### Data format
The data sent to the plugin will be an array of two keys.
1. Key config: contains array with configuration key/values configured from the netdbapp of this specific plugin.
2. Key data: contains an array of the full/selected workspace hosts, will only contains the existing keys in the config file


## Contributors so far

* @jamesjara
* @fmonge
