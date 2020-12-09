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
* [W3 Schools](https://www.w3schools.com/default.asp)
* [Stackoverflow](https://stackoverflow.com/)
* [Chrome Extensions Developer Guide](https://developer.chrome.com/extensions/devguide)
* [React](https://reactjs.org/tutorial/tutorial.html)
* [BeautifulSoup](https://www.crummy.com/software/BeautifulSoup/bs4/doc/)
* [Flask](https://flask.palletsprojects.com/en/1.1.x/)
* [Scikit-Learn](https://scikit-learn.org/stable/)
* [Tensorflow](https://www.tensorflow.org/)
* [DeepAI](https://deepai.org/)
* [PluralSight Tutorial on Mining Data From Text](https://app.pluralsight.com/library/courses/mining-data-text/table-of-contents)
* [Kaggle Dataset](https://www.kaggle.com/datasets?search=Sentiment+Analysis)
* [Webpack](https://webpack.js.org/)
* [MongoDB](https://www.mongodb.com/)
