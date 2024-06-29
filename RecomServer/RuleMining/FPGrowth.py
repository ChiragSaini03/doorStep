import numpy as np
import pandas as pd
import seaborn as sns
import matplotlib.pyplot as plt
import datetime as dt
import pickle
from mlxtend.preprocessing import TransactionEncoder
from mlxtend.frequent_patterns import apriori, fpgrowth, association_rules
import itertools
import warnings
import pyfpgrowth
warnings.filterwarnings("ignore")
warnings.simplefilter(action='ignore', category=FutureWarning)

pd.set_option('display.max_columns', None)
pd.options.display.float_format = '{:.2f}'.format

df = pd.read_csv('groc1.csv',names=['products'],header=None)

# data = list(df["products"].apply(lambda x:x.split(',')))

from mlxtend.preprocessing import TransactionEncoder

data = list(df["products"].apply(lambda x:x.split(',')))

from mlxtend.preprocessing import TransactionEncoder
te = TransactionEncoder()
te_data = te.fit(data).transform(data)
df = pd.DataFrame(te_data,columns=te.columns_).astype(int)

# te = TransactionEncoder()
# te_data = te.fit(data).transform(data)
# df = pd.DataFrame(te_data,columns=te.columns_).astype(int)


# Product Frequency / Total Sales
# first = pd.DataFrame(df.sum() / df.shape[0], columns = ["Support"]).sort_values("Support", ascending = False)

# second = list(itertools.combinations(first.index, 2))
# second = [list(i) for i in second]

# Finding support values
# value = []
# for i in range(0, len(second)):
#     temp = df.T.loc[second[i]].sum()
#     temp = len(temp[temp == df.T.loc[second[i]].shape[0]]) / df.shape[0]
#     value.append(temp)
# # Create a data frame
# secondIteration = pd.DataFrame(value, columns = ["Support"])
# secondIteration["index"] = [tuple(i) for i in second]
# secondIteration['length'] = secondIteration['index'].apply(lambda x:len(x))
# secondIteration = secondIteration.set_index("index").sort_values("Support", ascending = False)
# # Elimination by Support Value
# secondIteration = secondIteration[secondIteration.Support > 0.1]

# def ar_iterations(data, num_iter = 1, support_value = 0.1, iterationIndex = None):

#     # Next Iterations
#     def ar_calculation(iterationIndex = iterationIndex):
#         # Calculation of support value
#         value = []
#         for i in range(0, len(iterationIndex)):
#             result = data.T.loc[iterationIndex[i]].sum()
#             result = len(result[result == data.T.loc[iterationIndex[i]].shape[0]]) / data.shape[0]
#             value.append(result)
#         # Bind results
#         result = pd.DataFrame(value, columns = ["Support"])
#         result["index"] = [tuple(i) for i in iterationIndex]
#         result['length'] = result['index'].apply(lambda x:len(x))
#         result = result.set_index("index").sort_values("Support", ascending = False)
#         # Elimination by Support Value
#         result = result[result.Support > support_value]
#         return result

#     # First Iteration
#     first = pd.DataFrame(df.T.sum(axis = 1) / df.shape[0], columns = ["Support"]).sort_values("Support", ascending = False)
#     first = first[first.Support > support_value]
#     first["length"] = 1

#     if num_iter == 1:
#         res = first.copy()

#     # Second Iteration
#     elif num_iter == 2:

#         second = list(itertools.combinations(first.index, 2))
#         second = [list(i) for i in second]
#         res = ar_calculation(second)

#     # All Iterations > 2
#     else:
#         nth = list(itertools.combinations(set(list(itertools.chain(*iterationIndex))), num_iter))
#         nth = [list(i) for i in nth]
#         res = ar_calculation(nth)

#     return res

# iteration2 = ar_iterations(df, num_iter=2, support_value=0.1)
# iteration3 = ar_iterations(df, num_iter=3, support_value=0.01,
#               iterationIndex=iteration2.index)
# iteration4 = ar_iterations(df, num_iter=4, support_value=0.01,
#               iterationIndex=iteration3.index)
# FP Growth

freq_items = fpgrowth(df, min_support = 0.05, use_colnames = True, verbose = 1)

# Association Rules & Info
df_ar = association_rules(freq_items, metric = "confidence", min_threshold = 0.05)
# freq_items.sort_values("support", ascending = False)
# freq_items.sort_values("support", ascending = False).tail(5)# Association Rules & Info
# df_ar = association_rules(freq_items, metric = "confidence", min_threshold = 0.05)
print(df_ar)
pickle.dump(df_ar,open("fpgmodel.pb",'wb'));
