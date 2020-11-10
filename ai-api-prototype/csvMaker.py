# dataset from: https://github.com/benjaminvdb/110kDBRD

from pathlib import Path
import csv

entriesNeg = Path('datasets/dutch_reviews/train/neg')
entriesPos = Path('datasets/dutch_reviews/train/pos')


with open('datasets/dutchData.csv', 'w', newline='') as file:
    writer = csv.writer(file)
    writer.writerow(["text", "sentiment"])
    for entry in entriesNeg.iterdir():
        text = entry.read_text(encoding='utf8')
        writer.writerow([text.replace('\n', '').encode('utf8'), "neg"])
    for entry in entriesPos.iterdir():
        text = entry.read_text(encoding='utf8')
        writer.writerow([text.replace('\n', '').encode('utf8'), "pos"])
