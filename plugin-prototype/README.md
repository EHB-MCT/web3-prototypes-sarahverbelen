# Plugin Prototype
A chrome extension that scrapes r/worldnews and saves the titles, the karma and the user that posted the post into a MongoDB database. 

## How to start the prototype
**Getting the plugin into the browser**
1. Navigate to chrome://extensions/ in a chrome browser
2. On the top right, switch 'developer mode' to on
3. On the top left, choose the button 'load unpacked extension'
4. Select this folder. You should now see the extension in the list of your extensions.

**Starting the API**
1. run `npm install`
2. Run `node api.js`

**Seeing the results**
1. Navigate to https://www.reddit.com/ 
2. Open your console. You will see the results logged here as they are being returned by the api. 

## Used Resources
* [Stackoverflow](https://stackoverflow.com/)
* [Chrome Extensions Developer Guide](https://developer.chrome.com/extensions/devguide)
* [Restify](http://restify.com/docs/home/)
* [JQuery](https://jquery.com/)
* [MongoDB](https://www.mongodb.com/)
* [Reddit](https://www.reddit.com) (as a 'subject' for the extension)