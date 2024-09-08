import tensorflow as tf
import numpy as np
from PIL import Image
import io
from fastapi import FastAPI, File, UploadFile

model = tf.keras.models.load_model("./model.keras")
app = FastAPI()

plant_diseases = [
    "Apple__black_rot", "Apple__healthy", "Apple__rust", "Apple__scab",
    "Cassava__bacterial_blight", "Cassava__brown_streak_disease", "Cassava__green_mottle", 
    "Cassava__healthy", "Cassava__mosaic_disease",
    "Cherry__healthy", "Cherry__powdery_mildew",
    "Chili__healthy", "Chili__leaf_curl", "Chili__leaf_spot", "Chili__whitefly", "Chili__yellowish",
    "Coffee__cercospora_leaf_spot", "Coffee__healthy", "Coffee__red_spider_mite", "Coffee__rust",
    "Corn__common_rust", "Corn__gray_leaf_spot", "Corn__healthy", "Corn__northern_leaf_blight",
    "Cucumber__diseased", "Cucumber__healthy",
    "Gauva__diseased", "Gauva__healthy",
    "Grape__black_measles", "Grape__black_rot", "Grape__healthy", "Grape_leaf_blight(isariopsis_leaf_spot)",
    "Jamun__diseased", "Jamun__healthy",
    "Lemon__diseased", "Lemon__healthy",
    "Mango__diseased", "Mango__healthy",
    "Peach__bacterial_spot", "Peach__healthy",
    "Pepper_bell__bacterial_spot", "Pepper_bell__healthy",
    "Pomegranate__diseased", "Pomegranate__healthy",
    "Potato__early_blight", "Potato__healthy", "Potato__late_blight",
    "Rice__brown_spot", "Rice__healthy", "Rice__hispa", "Rice__leaf_blast", "Rice__neck_blast",
    "Soybean__bacterial_blight", "Soybean__caterpillar", "Soybean__diabrotica_speciosa",
    "Soybean__downy_mildew", "Soybean__healthy", "Soybean__mosaic_virus", "Soybean__powdery_mildew", 
    "Soybean__rust", "Soybean__southern_blight",
    "Strawberry___leaf_scorch", "Strawberry__healthy",
    "Sugarcane__bacterial_blight", "Sugarcane__healthy", "Sugarcane__red_rot", "Sugarcane__red_stripe", "Sugarcane__rust",
    "Tea__algal_leaf", "Tea__anthracnose", "Tea__bird_eye_spot", "Tea__brown_blight", "Tea__healthy", "Tea__red_leaf_spot",
    "Tomato__bacterial_spot", "Tomato__early_blight", "Tomato__healthy", "Tomato__late_blight", "Tomato__leaf_mold", 
    "Tomato__mosaic_virus", "Tomato__septoria_leaf_spot", "Tomato_spider_mites(two_spotted_spider_mite)",
    "Tomato__target_spot", "Tomato__yellow_leaf_curl_virus",
    "Wheat__brown_rust", "Wheat__healthy", "Wheat__septoria", "Wheat__yellow_rust"
]

def preprocessimage(image: Image.Image, target_size: tuple) -> np.ndarray:
    image = image.resize(target_size)
    image_array = np.array(image)
    image_array = image_array / 255.0 
    image_array = np.expand_dims(image_array, axis=0)
    return image_array

def apply_softmax(logits):
    softmax_probs = tf.nn.softmax(logits, axis=-1).numpy()
    return softmax_probs

def get_top_3_probabilities_scaled(probs):
    flat_probs = probs.flatten()
    
    top_3_indices = np.argsort(flat_probs)[-3:][::-1]
    
    top_3_probs = flat_probs[top_3_indices]
    
    top_prob = top_3_probs[0]
    top_3_probs_scaled = (top_3_probs / top_prob) * 100
    
    return top_3_probs_scaled, top_3_indices

@app.post("/predict")
async def predict_image(file: UploadFile = File(...)):
    contents = await file.read()
    image = Image.open(io.BytesIO(contents))
  
    input_tensor = preprocessimage(image, target_size=(128, 128))
  
    prediction = model.predict(input_tensor)
  
    softmax_prediction = apply_softmax(prediction)
  
    top_3_probs_scaled, top_3_indices = get_top_3_probabilities_scaled(softmax_prediction)
  
    results = [
        {
            "disease": plant_diseases[idx],
            "probability": float(prob)
        }
        for idx, prob in zip(top_3_indices, top_3_probs_scaled)
    ]
  
    return {"top_3_predictions": results}
