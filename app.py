from fastapi import FastAPI, File, UploadFile
from pydantic import BaseModel
import tensorflow as tf
import numpy as np
from PIL import Image
import io

model = tf.keras.models.load_model("./testing.keras")

app = FastAPI()

def preprocessimage(image: Image.Image, target_size: tuple) -> np.ndarray:
  image = image.resize(target_size)
  image_array = np.array(image)  
  image_array = image_array / 255.0
    
  image_array = np.expand_dims(image_array, axis=0)
    
  return image_array

@app.post("/predict")
async def predict_image(file: UploadFile = File(...)):
    contents = await file.read()
    image = Image.open(io.BytesIO(contents))
  
    input_tensor = preprocessimage(image, target_size=(64, 64))
  
    prediction = model.predict(input_tensor)
    predictions_list = prediction.tolist()
  
    return {"predictions": predictions_list}