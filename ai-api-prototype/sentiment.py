# this file makes a model based on trainingsdata and then saves that model to the model.joblib file

from joblib import dump, load
import pandas as pd
import numpy as np

from sklearn.model_selection import train_test_split

from sklearn.metrics import accuracy_score
from sklearn.metrics import precision_score
from sklearn.metrics import recall_score

from sklearn.feature_extraction.text import CountVectorizer
from sklearn.feature_extraction.text import TfidfTransformer

from sklearn.naive_bayes import GaussianNB
from sklearn.linear_model import LogisticRegression
from sklearn.pipeline import Pipeline

# a little helper function that shows us the data from our model


def summarize_classification(y_test, y_pred, x_test):
    acc = accuracy_score(y_test, y_pred, normalize=True)
    num_acc = accuracy_score(y_test, y_pred, normalize=False)
    prec = precision_score(y_test, y_pred, average='weighted')
    recall = recall_score(y_test, y_pred, average='weighted')

    print('Length of testing data: ', len(y_test))
    print('accuracy_count: ', num_acc)
    print('accuracy_score: ', acc)
    print('precision_score: ', prec)
    print('recall_score: ', recall)

    # print(list(zip(x_test, y_pred)))

# loading the training data


dutch_data = pd.read_csv('./datasets/dutchData.csv', encoding="ISO-8859-1")
# we sample only 10,000 of the original 50,000 because it would take a long time otherwise
dutch_data = dutch_data.sample(10000, replace=False)
# print(dutch_data.describe())

X = dutch_data['text']
Y = dutch_data['sentiment']

# WITH PIPELINE AND LOGISTIC REGRESSION

x_train, x_test, y_train, y_test = train_test_split(X, Y, test_size=0.2)

pipeline = Pipeline([
    ('count_vectorizer', CountVectorizer(ngram_range=(2, 2))),
    ('tfidf_transformer', TfidfTransformer()),
    ('classifier', LogisticRegression(solver='lbfgs'))
])

pipeline.fit(x_train, y_train)

y_pred = pipeline.predict(x_test)

summarize_classification(y_test, y_pred, x_test)

# now we make our model persistent

dump(pipeline, 'model.joblib')
