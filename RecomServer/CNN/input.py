import pandas as pd
import numpy as np
import cv2
import requests
from io import BytesIO
from sklearn.model_selection import train_test_split

def Take_input():
    df = pd.read_csv('products.csv')  # Replace 'products.csv' with your actual file path

    print(df.head())

    product_names_array = df['product_name'].to_numpy()
    image_array = df['image'].to_numpy()

    x_train_list = []
    map = {}

    items = 0
    target_list = []

    for i, image_url in enumerate(image_array):
        try:
            response = requests.get(image_url)
            response.raise_for_status()  # Raise an HTTPError for bad responses
            np_image = cv2.imdecode(np.asarray(bytearray(response.content), dtype="uint8"), cv2.IMREAD_COLOR)
            color_image = cv2.cvtColor(np_image, cv2.COLOR_BGR2RGB)
            resized_image = cv2.resize(color_image, (120, 120))  # Resize to a common size
            x_train_list.append([resized_image,resized_image,resized_image,resized_image])
            # x_train_list.append(resized_image)
            # x_train_list.append(resized_image)
            target_list.append([items,items,items,items])
            map[items] = product_names_array[i] 
            items += 1
        except requests.exceptions.HTTPError as errh:
            print("HTTP Error:", errh)
        except requests.exceptions.ConnectionError as errc:
            print("Error Connecting:", errc)
        except requests.exceptions.Timeout as errt:
            print("Timeout Error:", errt)
        except requests.exceptions.RequestException as err:
            print("Something went wrong:", err)

    # Convert the lists to NumPy arrays

    xt = np.concatenate(x_train_list, axis=0)
    yt = np.concatenate(target_list, axis=0)
    # for i in faced

    print(xt.shape)
    print(yt.shape)
    # print(name)

    x_train, x_test, y_train, y_test = train_test_split(
        xt, yt, test_size=0.2, random_state=42
    )
    # dataset_path="dataset/"
    dataset = {
        'x_train': x_train,
        'y_train': y_train,
        'x_test': x_test,
        'y_test': y_test,
        'map': map,
        'product_names_array': product_names_array
    }

    np.savez("dataset.npz", **dataset)
    return x_train, x_test, y_train, y_test, map, product_names_array