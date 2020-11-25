from bs4 import BeautifulSoup
import flask
from flask import request
from flask_cors import CORS, cross_origin
from flask import jsonify
import json

# translator from IBM Watson: https://cloud.ibm.com/apidocs/language-translator?code=python
from ibm_watson import LanguageTranslatorV3
from ibm_cloud_sdk_core.authenticators import IAMAuthenticator

authenticator = IAMAuthenticator(
    'pvMuR9pNaQEzufd5NRY3Fvf1IjmkH2iBW3WfWBwqr8Ao')
language_translator = LanguageTranslatorV3(
    version='2018-05-01',
    authenticator=authenticator
)

language_translator.set_service_url(
    'https://api.eu-gb.discovery.watson.cloud.ibm.com')  # /instances/f2a5347b-3ce0-48b0-887c-0858ce210d71

# ai integration
from joblib import dump, load
pipeline = load('model.joblib')
# this is my dutch model - I will probably do it the other way around in the real project (translating from dutch, model in english)

app = flask.Flask(__name__)
# app.config["DEBUG"] = True

cors = CORS(app)
# app.config['CORS_HEADERS'] = 'Content-Type'


def getAIResult(txt):
    # translate from english to dutch
    # translation = language_translator.translate(
    #     text=txt, model_id='en-nl').get_result()  # throws 404????
    # # run it through the AI model
    # print(translation)
    translation = txt
    result = pipeline.predict([translation])
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
