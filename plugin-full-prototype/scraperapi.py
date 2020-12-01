from bs4 import BeautifulSoup
import flask
from flask import request
from flask_cors import CORS, cross_origin
from flask import jsonify
import json

import requests

# ai integration
from joblib import dump, load
pipeline = load('model.joblib')
# this is my dutch model - I will probably do it the other way around in the real project (translating from dutch, model in english)

app = flask.Flask(__name__)
# app.config["DEBUG"] = True

cors = CORS(app)
# app.config['CORS_HEADERS'] = 'Content-Type'

amountOfTranslations = 0


def getAIResult(txt):
    # translate from english to dutch
    global amountOfTranslations # this is just a small fix to not overload the api with requests
    if(amountOfTranslations % 10 == 0):
        resp = requests.get('https://api.mymemory.translated.net/get?q=' + txt + '&langpair=en|nl&key=4dad4d88b0d6ecbacab6')
        print(resp.json())
    amountOfTranslations += 1
   
    
    result = pipeline.predict([txt])
    return str(result[0])



@app.route('/', methods=['GET'])
@cross_origin()
def home():
    return "deze api scraped de meegegeven html."


class ResultObject:
    def __init__(self, text, klasse):
        self.text = text
        self.sentiment = getAIResult(text)
        self.klasse = klasse

    def toJson(self):
        return {"text": self.text, "sentiment": self.sentiment, "class": self.klasse}


def makeResultObjects(elementArray):
    array = []
    for element in elementArray:
        klasse = element.get('class')
        text = element.getText()
        result = ResultObject(text, klasse)
        array.append(result.toJson())
    return array


@app.route('/getTitles', methods=['POST'])
@cross_origin()
def getTitles():
    html = request.json['html']
    soup = BeautifulSoup(html, 'html.parser')
    h3s = soup.find_all('h3')
    result = makeResultObjects(h3s)
    return json.dumps(result)


@app.route('/getText', methods=['POST'])
@cross_origin()
def getText():
    html = request.json['html']
    soup = BeautifulSoup(html, 'html.parser')
    ps = soup.find_all('p')
    result = makeResultObjects(ps)
    return json.dumps(result)


@app.route('/getAll', methods=['POST'])
@cross_origin()
def getAll():
    html = request.json['html']
    soup = BeautifulSoup(html, 'html.parser')
    ps = soup.find_all('p')
    h3s = soup.find_all('h3')
    result = makeResultObjects(ps + h3s)
    return json.dumps(result)


app.run()
