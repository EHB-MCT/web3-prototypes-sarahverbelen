# Chrome Extension MELON Prototype
This is a prototype of my final work. It includes a chrome extension and a dashboard page, as well as a Python API.
The extension sends the HTML to the API and receives a response that includes the information on that page as well as the result given to it by an AI.
The extension uses webpack in order to be able to use npm packages such as axios.

## How to start the prototype
**Getting the plugin into the browser**
1. Navigate to chrome://extensions/ in a chrome browser
2. On the top right, switch 'developer mode' to on
3. On the top left, choose the button 'load unpacked extension'
4. Select the folder "extension". You should now see the extension in the list of your extensions.

**Starting the API**
1. Run `python scraperapi.py`

**Seeing the results**
1. Navigate to https://www.reddit.com/ . Make sure that it is *not* the old version
2. Open your console. You will see the results logged here as they are being returned by the api. 

## Used resources
* https://www.w3schools.com/default.asp
* https://stackoverflow.com/
* https://developer.chrome.com/extensions/devguide
* https://reactjs.org/tutorial/tutorial.html
* https://www.crummy.com/software/BeautifulSoup/bs4/doc/
* https://flask.palletsprojects.com/en/1.1.x/
* https://scikit-learn.org/stable/
* https://www.tensorflow.org/
* https://deepai.org/
* https://app.pluralsight.com/library/courses/mining-data-text/table-of-contents
* https://www.kaggle.com/datasets?search=Sentiment+Analysis
* https://webpack.js.org/
* https://www.mongodb.com/
