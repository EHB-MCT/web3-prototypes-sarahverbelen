# Python Plugin Prototype
This was the prototype where I tried to research how I could combine a chrome extension (which only works with Javascript) and a Python back-end. Among other things, I tried to compile Python code into Javascript by using 'Rapydscript', although this turned out to create more problems then it solved. In the end, I decided to work with a Python API that could be called from the Javascript of the chrome extension.

## How to start this prototype
**Getting the plugin into the browser**
1. Navigate to chrome://extensions/ in a chrome browser
2. On the top right, switch 'developer mode' to on
3. On the top left, choose the button 'load unpacked extension'
4. Select the folder "src". You should now see the extension in the list of your extensions.

**Starting the API**
1. Run `python src/scraper.py`