from bs4 import BeautifulSoup
import flask
from flask import request
from flask_cors import CORS, cross_origin
from flask import jsonify
import json

# ai integration
from joblib import dump, load
pipeline = load('model.joblib')

app = flask.Flask(__name__)
# app.config["DEBUG"] = True

cors = CORS(app)
# app.config['CORS_HEADERS'] = 'Content-Type'


def getAIResult(text):
    result = pipeline.predict([text])
    return result[0]


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

@app.route('/getTitles', methods=['POST'])
@cross_origin()
def getTitles():
    html = request.json['html']
    soup = BeautifulSoup(html, 'html.parser')
    h3s = soup.find_all('h3')
    array = []
    if len(h3s) > 0:
        for h3 in h3s:
            klasse = h3.get('class')
            text = h3.getText()
            result = ResultObject(text, klasse)
            array.append(result.toJson())
    else:
        titles = soup.find_all('a', 'title')
        for title in titles:
            klasse = title.get('class')
            text = title.getText()
            result = ResultObject(text, klasse)
            array.append(result.toJson())

    print(array)
    return json.dumps(array)


app.run()
