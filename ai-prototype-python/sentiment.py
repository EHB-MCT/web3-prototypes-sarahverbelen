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


def summarize_classification(y_test, y_pred):
    acc = accuracy_score(y_test, y_pred, normalize=True)
    num_acc = accuracy_score(y_test, y_pred, normalize=False)
    prec = precision_score(y_test, y_pred, average='weighted')
    recall = recall_score(y_test, y_pred, average='weighted')

    print('Length of testing data: ', len(y_test))
    print('accuracy_count: ', num_acc)
    print('accuracy_score: ', acc)
    print('precision_score: ', prec)
    print('recall_score: ', recall)

# loading the training data


imdb_df = pd.read_csv('./datasets/imdb_dataset.csv', encoding="ISO-8859-1")
# we sample only 10,000 of the original 50,000 because it would take a long time otherwise
imdb_df = imdb_df.sample(10000, replace=False)
# print(imdb_df.describe())

X = imdb_df['review']
Y = imdb_df['sentiment']

# WITH NAIVE BAYES

# # count the frequency of each word
# count_vectorizer = CountVectorizer()
# transformed_vector = count_vectorizer.fit_transform(X)

# # convert word frequency to tf-idf representation
# tfidf_transformer = TfidfTransformer()
# tfidf_vector = tfidf_transformer.fit_transform(transformed_vector)

# # split the data into data to train the model and data to test the model
# x_train, x_test, y_train, y_test = train_test_split(
#     tfidf_vector, Y, test_size=0.2)

# train the naive bayes classifier with skilearn
# clf = GaussianNB().fit(x_train.toarray(), y_train)
# # use the classifier on our training data
# y_pred = clf.predict(x_test.toarray())
# summarize_classification(y_test, y_pred)
# # this model doesn't have great results; I should test and optimize with other classifiers (look on sklearn)
# # I should also try and find a dataset or make one?

# WITH PIPELINE AND LOGISTIC REGRESSION

x_train, x_test, y_train, y_test = train_test_split(X, Y, test_size=0.2)

pipeline = Pipeline([
    ('count_vectorizer', CountVectorizer(ngram_range=(2, 2))),
    ('tfidf_transformer', TfidfTransformer()),
    ('classifier', LogisticRegression(solver='lbfgs'))
])

pipeline.fit(x_train, y_train)

y_pred = pipeline.predict(x_test)

summarize_classification(y_test, y_pred)
# this is already a lot more accurate than the previous version.
