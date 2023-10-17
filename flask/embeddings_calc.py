from flask import Flask, request, jsonify
import numpy as np
import tensorflow as tf
from tensorflow.keras.preprocessing import image
from tensorflow.keras.applications.resnet50 import ResNet50, preprocess_input
import requests

app = Flask(__name__)

model = ResNet50(weights='imagenet', include_top=False, input_shape=(224, 224, 3))
model.trainable = False

def extract_features(image_path):
    img = image.load_img(image_path, target_size=(224, 224))
    img_array = image.img_to_array(img)
    expanded_img_array = np.expand_dims(img_array, axis=0)
    preprocessed_img = preprocess_input(expanded_img_array)
    features = model.predict(preprocessed_img).flatten()
    return features

@app.route('/calculate_embedding', methods=['POST'])
def calculate_embedding():
    data = request.get_json()
    image_url = data.get('image_url')

    if not image_url:
        return jsonify({"error": "No image URL provided"})

    try:
        response = requests.get(image_url)
        if response.status_code != 200:
            return jsonify({"error": "Failed to download the image"})

        with open('temp_image.jpg', 'wb') as f:
            f.write(response.content)

        extracted_features = extract_features('temp_image.jpg')

        return jsonify({"embedding": extracted_features.tolist()})
    except Exception as e:
        return jsonify({"error": str(e)})

if __name__ == '__main__':
    app.run(debug=True)
