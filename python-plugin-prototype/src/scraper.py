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


@app.route('/getH3', methods=['POST'])
@cross_origin()
def getH3():
    html = request.json['html']
    soup = BeautifulSoup(html, 'html.parser')
    h3s = soup.find_all('h3')
    h3array = []
    for h3 in h3s:
        # print(h3.getText())
        h3array.append(h3.getText())

    print(h3array)
    return jsonify(h3array)


app.run()
