from flask import Flask, request, render_template
import pickle
import pandas as pd
from flask_cors import CORS, cross_origin
import json
import predict


app=Flask(__name__)
CORS(app)

@app.route("/demo", methods=["GET"])
def demo():
    # data = request.get_json()
    res="final data fetched!!"
    res={"data":res}
    return json.dumps(res)


@app.route("/fpgrowth", methods=["POST","GET"])
def fpgrowth():
    data = request.get_json()
    model = pickle.load( open( "RuleMining/fpgmodel.pb", "rb" ) )
    print(data['data'])
    
    rules=[]
    for i in data['data']:
        rules.append(i.lower())
    res=[]
    for i in range(0,48):
        ante=[]
        for j in model.loc[i].antecedents:
            ante.append(j.lower())
        if (set(ante).issubset(rules)):
            for j in model.loc[i].consequents:
                if (j not in res) and (j not in rules):
                    res.append(j)
    print("FPGrowth response: ")
    print(res)
    res={"data":res}
    return json.dumps(res)

@app.route("/apriori", methods=["POST","GET"])
def apriori():
    data = request.get_json()
    model = pickle.load( open( "RuleMining/amodel.pb", "rb" ) )
    print(data['data'])
    
    rules=[]
    for i in data['data']:
        rules.append(i.lower())
    res=[]
    for i in range(0,48):
        ante=[]
        for j in model.loc[i].antecedents:
            ante.append(j.lower())
        if (set(ante).issubset(rules)):
            for j in model.loc[i].consequents:
                if (j not in res) and (j not in rules):
                    res.append(j)
    res={"data":res}
    return json.dumps(res)

@app.route("/cnnArch", methods=["POST","GET"])
def cnnArch():
    data = request.get_json()
    model = pickle.load( open( "cnn/cnnmodelac.pb", "rb" ) )
    res=[]
    # algo
    
    items=[] # containing the cart items
    for i in data['data']:
        items.append(i)
    if (len(items)>0):
        first=items[0]
    for i in model:
        if first in i:
            for j in i:
                if j not in items:
                    if j not in res:
                        res.append(j)
    
    url_list=data['urls']
    for image_url in url_list:
        res.append(predict.predict(image_url))
    # cnn_suggestion = predict(image_url)
    
    print("cnn response: ")
    print(res)
    res=list(set(res))
    res={"data":res}
    return json.dumps(res)

app.run(debug=True)


#virtualenv venv
#.\\venv\Scripts\activate

#python server.py
