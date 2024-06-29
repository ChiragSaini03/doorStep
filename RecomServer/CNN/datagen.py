import pickle

data=[
    ["Tomato","Onion","Desi Tomato"],
    ["Orange","Apple","Tomato"],
    ["Maggi","Lays"],
    ["Milk","Bournvita","Tea"],
    ["Asirwad Atta","Indiagate Basmati Rice","Ashirwad Multigrain Atta","Fortune Mogra Rice","Milk"],
    ["Cornflakes","Lays","Maggi"],
    ["Horlicks","Jam"],
    ["Braed","Jam","Horlicks","Coffee"],
    ["Biscuit","Cornflakes"],
    ["Orange Carrot","Pea"],
    ["Brinjal","Pea","Ginger"],
    ["Orange","Sugar","Egg"]
]

pickle.dump(data,open("cnnmodelac.pb",'wb'));