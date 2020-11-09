# based on pluralsight tutorial https://app.pluralsight.com/library/courses/mining-data-text/table-of-contents

import sklearn

# COUNTVECTORIZER
from sklearn.feature_extraction.text import CountVectorizer
train_text = ["Afwezigheid doodt liefde niet, tenzij ze al ziek was bij het afscheid.",
              "Humor en geduld zijn de kamelen waarmee je door alle woestijnen kunt gaan.",
              "Een overdrijving is een waarheid die haar geduld heeft verloren.",
              "Er zijn mensen, die vol geduld sterven, maar er zijn ook gehoorzame mensen, die met geduld blijven leven.",
              "Gelukkig merken de meeste mensen niet dat hun huwelijk slecht is."]
count_vectorizer = CountVectorizer()
count_vectorizer.fit(train_text)

# print (count_vectorizer.vocabulary_)

transformed_vector = count_vectorizer.transform(train_text)
# print (transformed_vector.toarray())

n_gram_vectorizer = CountVectorizer(ngram_range=(2, 2))
transformed_ngram_vector = n_gram_vectorizer.fit_transform(train_text)
print(n_gram_vectorizer.vocabulary_)
# print (transformed_ngram_vector.toarray())
