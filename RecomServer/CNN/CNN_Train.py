import keras
import numpy as np
from io import BytesIO
from cnn import CNN
from input import Take_input


# x_train = np.array(x_train_list)
# y_train = np.array(target_list)

try:
    # dataset = np.load("dataset.npz",allow_pickle=True)
    loaded_dict = np.load('dataset.npz',allow_pickle=True)
    # x_train = dataset[0]
    # y_train = dataset[1]
    # x_test = dataset[2]
    # y_test = dataset[3]
    # map = dataset[4]
    # product_names_array = dataset[5]
    x_train = loaded_dict['x_train']
    y_train = loaded_dict['y_train']
    x_test = loaded_dict['x_test']
    y_test = loaded_dict['y_test']
    map = loaded_dict['map']
    product_names_array = loaded_dict['product_names_array']
except Exception as e:
    print(e)
    x_train, x_test, y_train, y_test, map, product_names_array = Take_input()

choice = input("Do you want to Take input (y/n) : ")
if choice.capitalize() == "Y":
    x_train, x_test, y_train, y_test, map, product_names_array = Take_input()

IMG_SIZE = 120

X_trainr = np.array(x_train).reshape(-1, IMG_SIZE, IMG_SIZE, 3)
X_testr = np.array(x_test).reshape(-1, IMG_SIZE, IMG_SIZE,3)

print(x_train.shape)
print(y_train.shape)
output_range = len(np.unique(y_train))
print(output_range)

choice = input("Do you want to Train Model (y/n) : ")
if choice.capitalize() == "Y":
    model = CNN(x_train, y_train, x_test, y_test, 50, output_range)
    model.save("grocery_cnn_model.h5")

# model = KNeighborsClassifier(n_neighbors=3)
# print(model.fit(xt, yt))

'''
model = keras.models.load_model("grocery_cnn_model.h5")



# The rest of your code...
print(x_train[0].shape)

data = x_train[7].reshape(-1, IMG_SIZE, IMG_SIZE, 3)
print(map[y_train[7]])
prediction = model.predict(data)
print(prediction)
output = prediction.argmax(axis=1)
print(output)
output = int(output)
print(output)
print(map[output])
print(map)

top_indices = np.argsort(prediction[0])[-2:]
print(top_indices)
# Get the corresponding labels and product names
top_labels = [map[index] for index in top_indices]
# top_product_names = [product_names_array[index] for index in top_indices]

print("Top 2 products:", top_labels)
# print("Top 2 Product Names:", top_product_names)

'''