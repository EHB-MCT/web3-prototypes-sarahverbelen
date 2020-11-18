from bs4 import BeautifulSoup
import flask
from flask import request
from flask_cors import CORS, cross_origin
from flask import jsonify

app = flask.Flask(__name__)
# app.config["DEBUG"] = True

cors = CORS(app)
# app.config['CORS_HEADERS'] = 'Content-Type'


@app.route('/', methods=['GET'])
@cross_origin()
def home():
    return "deze api scraped de meegegeven html."


@app.route('/getTitles', methods=['POST'])
@cross_origin()
def getTitles():
    html = request.json['html']
    soup = BeautifulSoup(html, 'html.parser')
    h3s = soup.find_all('h3')
    array = []
    if len(h3s) > 0:
        for h3 in h3s:
            array.append(h3.getText())
    else:
        titles = soup.find_all('a', 'title')
        for title in titles:
            array.append(title.getText())

    print(array)
    return jsonify(array)


app.run()
