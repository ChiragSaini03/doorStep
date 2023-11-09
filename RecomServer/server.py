from flask import Flask, request, render_template
import pickle
import pandas as pd
from flask_cors import CORS, cross_origin
import json
from CNN import CNN

app=Flask(__name__)
CORS(app)

@app.route("/apriori", methods=["POST","GET"])
def apriori():
    data = request.get_json()
    model = pickle.load( open( "amodel.pb", "rb" ) )
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

@app.route("/cnnArch", methods=["POST","GET"]):
def cnnArch():
    res=[];
    # algo

    res={"data":res}
    return json.dumps(res);

app.run(debug=True)


#virtualenv venv
#.\\venv\Scripts\activate

#python server.py