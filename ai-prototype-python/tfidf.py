# based on pluralsight tutorial https://app.pluralsight.com/library/courses/mining-data-text/table-of-contents

from sklearn.feature_extraction.text import HashingVectorizer
import sklearn
from sklearn.feature_extraction.text import TfidfVectorizer

tfidf_vectorizer = TfidfVectorizer()

train_text = ["Afwezigheid doodt liefde niet, tenzij ze al ziek was bij het afscheid.",
              "Humor en geduld zijn de kamelen waarmee je door alle woestijnen kunt gaan.",
              "Een overdrijving is een waarheid die haar geduld heeft verloren.",
              "Er zijn mensen, die vol geduld sterven, maar er zijn ook gehoorzame mensen, die met geduld blijven leven.",
              "Gelukkig merken de meeste mensen niet dat hun huwelijk slecht is."]

tfidf_vector = tfidf_vectorizer.fit_transform(train_text)
# print(tfidf_vectorizer.vocabulary_)
# print(tfidf_vector.toarray())

# print(dict(zip(tfidf_vectorizer.get_feature_names(), tfidf_vectorizer.idf_)))


# norm: l1 norm = all features add up to 1; l2 norm = square root of sum of squares will be 1
hashing_vectorizer = HashingVectorizer(n_features=16, norm=None)
feature_vector = hashing_vectorizer.transform(train_text)
print(feature_vector.toarray())
