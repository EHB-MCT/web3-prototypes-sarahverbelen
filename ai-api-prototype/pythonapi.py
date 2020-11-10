import flask
from flask import request
from joblib import dump, load
pipeline = load('model.joblib')

# print(pipeline.predict(['ik haat je en je suckt bleh']))


app = flask.Flask(__name__)
app.config["DEBUG"] = True


@app.route('/', methods=['GET'])
def home():
    return "<h1>Python AI API</h1><p>Deze api geeft 'pos' of 'neg' terug als antwoord op een nederlandstalige tekst.</p>"


@app.route('/getResult', methods=['POST'])
def getResult():
    result = pipeline.predict([request.json['text']])
    return result[0]


app.run()
