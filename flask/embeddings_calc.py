from flask import Flask, request, jsonify
import numpy as np
import tensorflow as tf
from tensorflow.keras.preprocessing import image
from tensorflow.keras.applications.resnet50 import ResNet50, preprocess_input
import requests
from pymongo import MongoClient
from sklearn.metrics.pairwise import cosine_similarity
from flask_cors import CORS

app = Flask(__name__)

cors = CORS(app, resources={r"/calculate_embedding": {"origins": "*"}})

model = ResNet50(weights='imagenet', include_top=False, input_shape=(224, 224, 3))
model.trainable = False

client = MongoClient('mongodb+srv://m0hibsayed1393:BarterX@cluster0.hyssrie.mongodb.net/BarterX?retryWrites=true&w=majority')  # Replace with your MongoDB connection URL
db = client['BarterX']
products_collection = db['products']

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

        with open('uploads/temp_image.jpg', 'wb') as f:
            f.write(response.content)

        extracted_features = extract_features('uploads/temp_image.jpg')

        return jsonify({"embedding": extracted_features.tolist()})
    except Exception as e:
        return jsonify({"error": str(e)})

@app.route('/get_similar_products', methods=['POST'])
def get_similar_products():
    try:
        data = request.get_json()

        if not data:
            return jsonify({"error": "Invalid JSON data"})

        image_url = data.get('image_url')

        if not image_url:
            return jsonify({"error": "No image URL provided"})

        response = requests.get(image_url)
        if response.status_code != 200:
            return jsonify({"error": "Failed to download the image"})

        with open('temp_image.jpg', 'wb') as f:
            f.write(response.content)

        uploaded_features = extract_features('temp_image.jpg')

        products = list(products_collection.find({}))  # Fetch all products

        similarities = []
        for product in products:
            product_features = product.get("images", [])[0].get("embedding")
            similarity = cosine_similarity([uploaded_features], [product_features])[0][0]
            product_id_str = str(product["_id"])
            similarities.append({"product_id": product_id_str, "similarity": similarity})

        similarities.sort(key=lambda x: x["similarity"], reverse=True)

        top_n_similar_products = similarities[:5]

        response = jsonify({"similar_products": top_n_similar_products})
        return response

    except Exception as e:
        error_message = str(e)
        print("Error:", error_message) 
        error_response = jsonify({"error": error_message})
        return error_response

if __name__ == '__main__':
    app.run(debug=True)
