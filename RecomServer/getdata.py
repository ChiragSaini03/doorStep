#  fetching data from API

import requests
import json

def get_data_from_api(api):
    response = requests.get(api)
    if response.status_code == 200:
        print("Successfully fetched the data")
        print(response.json())
        # print(json.dumps(response.json(), sort_keys=True, indent=4))
    else:
        print(f"Error: {response.status_code}. Failed to fetch data.")
        print("Response content:", response.content)

get_data_from_api("http://127.0.0.1:5000/demo");
