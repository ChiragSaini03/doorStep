from scipy import spatial
import numpy as np
from sent2vec.vectorizer import Vectorizer
import csv
filename = "test.product_apis.csv"
sentences = []
id=[]
with open(filename, 'r') as csvfile:
    csvreader = csv.reader(csvfile)
    for row in csvreader:
        sentences.append(row[6])
        id.append(row[0])
del id[0]
del sentences[0]
sentence=[]
sentence.append(sentences[0])
ans=[]
x=0
for i in sentences:
    sentence[0]=sentences[x]
    x=x+1
    vectorizer = Vectorizer()
    vectorizer.run(sentence)
    vectors = vectorizer.vectors
    ans.append(vectors)
np.save('data.npy',ans)