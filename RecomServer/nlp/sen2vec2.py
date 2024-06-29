from scipy import spatial
import numpy as np
from sent2vec.vectorizer import Vectorizer
import csv
data = np.load('data.npy')
filename = "test.product_apis.csv"
id=[]
with open(filename, 'r') as csvfile:
    csvreader = csv.reader(csvfile)
    for row in csvreader:
        id.append(row[0])
del id[0]
sentences=["This finely processed butter is natural"]
vectorizer = Vectorizer()
vectorizer.run(sentences)
v1 = vectorizer.vectors
d1=2
d2=2
x=0
for i in data:
    dist_1 = spatial.distance.cosine(v1[0], i[0])
    print(dist_1)
    if(dist_1 < d1):
        d1=dist_1
        i1=id[x]
    elif (dist_1 < d2):
        d2=dist_1
        i2=id[x]
    x=x+1
print(i1)
print(i2)
dist_1 = spatial.distance.cosine(v1[0],data[0][0])
print(dist_1)