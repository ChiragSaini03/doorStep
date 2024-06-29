import keras
import numpy as np
import cv2
import requests
from io import BytesIO
# from input import Take_input

def predict(image_url):

    try:
        loaded_dict = np.load('dataset.npz', allow_pickle=True)
        x_train = loaded_dict['x_train']
        y_train = loaded_dict['y_train']
        x_test = loaded_dict['x_test']
        y_test = loaded_dict['y_test']
        map = loaded_dict['map']
        product_names_array = loaded_dict['product_names_array']
    except Exception as e:
        print(e)
        # x_train, x_test, y_train, y_test, map, product_names_array = Take_input()

    model = keras.models.load_model("grocery_cnn_model.h5")

    # input_image = []

    try:
        response = requests.get(image_url)
        response.raise_for_status()  # Raise an HTTPError for bad responses
        np_image = cv2.imdecode(np.asarray(bytearray(response.content), dtype="uint8"), cv2.IMREAD_COLOR)
        color_image = cv2.cvtColor(np_image, cv2.COLOR_BGR2RGB)
        resized_image = cv2.resize(color_image, (120, 120))  # Resize to a common size
        IMG_SIZE = 120
        input_image = np.array(resized_image).reshape(-1, IMG_SIZE, IMG_SIZE, 3)
        prediction = model.predict(input_image)
        output = prediction.argmax(axis=1)
        if np.isscalar(output):
            print("converting to int")
            # output = output.item()
        
        output = int(output)
        # print(type(output))
        # print(map)
        # print(output)
        # print(type(map))
        # print(product_names_array [output])
        return product_names_array [output]

    except requests.exceptions.HTTPError as errh:
            print("HTTP Error:", errh)
    except requests.exceptions.ConnectionError as errc:
        print("Error Connecting:", errc)
    except requests.exceptions.Timeout as errt:
        print("Timeout Error:", errt)
    except requests.exceptions.RequestException as err:
        print("Something went wrong:", err)

    # The rest of your code...
    '''
    print(x_train[0].shape)

    data = x_train[7].reshape(-1, IMG_SIZE, IMG_SIZE, 3)
    print(map[y_train[7]])
    
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

# itemt = predict("https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=85,metadata=none,w=120,h=120/app/images/products/sliding_image/421700a.jpg?ts=1690788440")
# print(itemt)