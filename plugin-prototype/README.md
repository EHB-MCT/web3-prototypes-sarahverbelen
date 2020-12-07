# Plugin Prototype
A chrome extension that scrapes r/worldnews and saves the titles, the karma and the user that posted the post into a MongoDB database. 

## How to start the prototype
**Getting the plugin into the browser**
1. Navigate to chrome://extensions/ in a chrome browser
2. On the top right, switch 'developer mode' to on
3. On the top left, choose the button 'load unpacked extension'
4. Select this folder. You should now see the extension in the list of your extensions.

**Starting the API**
1. Run `node api.js`

**Seeing the results**
1. Navigate to https://www.reddit.com/ . Make sure that it is *not* the old version
2. Open your console. You will see the results logged here as they are being returned by the api. 