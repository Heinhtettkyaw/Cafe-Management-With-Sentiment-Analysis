from flask import Flask, request, jsonify
from flask_cors import CORS  # Import flask_cors
from datetime import datetime
import pickle
import re

app = Flask(__name__)

# Enable CORS for all routes globally
CORS(app)

# Preprocessing function (same as used during training)
def preprocess_text(text):
    if not isinstance(text, str):
        return ""
    # Remove URLs
    text = re.sub(r"http\S+|www.\S+", "", text)
    # Remove non-alphabetic characters
    text = re.sub(r"[^a-zA-Z\s]", "", text)
    # Convert to lowercase and strip extra whitespace
    text = " ".join(text.lower().split())
    return text

# Load the trained model and vectorizer from the pickle file
with open("trained_model.pkl", "rb") as f:
    model, vectorizer = pickle.load(f)

@app.route("/predict", methods=["POST"])
def predict():
    try:
        data = request.get_json()
        review = data.get("review", "")
        if not review:
            return jsonify({"error": "No review provided"}), 400

        # Preprocess the input review
        processed_review = preprocess_text(review)
        # Transform the review into vectorized form
        review_vec = vectorizer.transform([processed_review])
        # Get the prediction (0 for negative, 1 for positive)
        prediction = model.predict(review_vec)[0]
        sentiment = "Positive" if prediction == 1 else "Negative"
        return jsonify({"sentiment": sentiment})

    except Exception as e:
        return jsonify({"error": f"Error during prediction: {str(e)}"}), 500

        return jsonify({
        "sentiment": sentiment,
        "timestamp": datetime.now().isoformat()  # Add ISO timestamp
         })

if __name__ == "__main__":
    app.run(debug=True, port=5000)
