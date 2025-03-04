import pandas as pd
import re
import pickle
import numpy as np
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.naive_bayes import ComplementNB
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score, precision_score, recall_score, confusion_matrix, f1_score

# -----------------------
# Preprocessing function
# -----------------------
def preprocess_text(text):
    if not isinstance(text, str):
        return ""
    # Remove URLs
    text = re.sub(r"http\S+|www.\S+", "", text)
    # Remove non-alphabetic characters (retain whitespace)
    text = re.sub(r"[^a-zA-Z\s]", "", text)
    # Convert to lowercase and strip extra whitespace
    return " ".join(text.lower().split())

# ---------------------------------------------------------
# STEP 1: Build vocabulary from a sample of the dataset
# ---------------------------------------------------------
sample_size = 100000  # use 100K rows to build vocabulary (adjust if needed)
print("Building vocabulary from a sample...")
sample_df = pd.read_csv("ratings.csv", nrows=sample_size)
sample_df.dropna(subset=["review"], inplace=True)
sample_df["review"] = sample_df["review"].apply(preprocess_text)

# You can adjust max_features to control the size of the vocabulary.
vectorizer = TfidfVectorizer(stop_words="english", max_features=50000)
vectorizer.fit(sample_df["review"].values)
print("Vocabulary built. Total features:", len(vectorizer.get_feature_names_out()))

# ---------------------------------------------------------
# STEP 2: Load full dataset and split into train and test
# ---------------------------------------------------------
print("Loading full dataset for evaluation...")
full_df = pd.read_csv("ratings.csv")
full_df.dropna(subset=["review", "sentiment"], inplace=True)
full_df["review"] = full_df["review"].apply(preprocess_text)
# Convert sentiment: if rating is 1 or 2 -> 0 (negative), else -> 1 (positive)
full_df["sentiment"] = full_df["sentiment"].apply(lambda x: 0 if x in [1, 2] else 1)

# Split the dataset into training and testing sets (e.g., 80/20 split)
train_df, test_df = train_test_split(full_df, test_size=0.2, random_state=42)
print(f"Training samples: {len(train_df)}, Testing samples: {len(test_df)}")

# ---------------------------------------------------------
# STEP 3: Train model using batch training with partial_fit
# ---------------------------------------------------------
# Initialize the classifier
model = ComplementNB()
classes = [0, 1]

# Train on the training set in batches (simulate streaming with chunks)
batch_size = 100000  # Adjust batch size if needed
num_batches = int(np.ceil(len(train_df) / batch_size))
print("Starting batch training on the training set...")
for i in range(num_batches):
    batch = train_df.iloc[i * batch_size:(i + 1) * batch_size]
    X_batch = vectorizer.transform(batch["review"].values)
    y_batch = batch["sentiment"].values.astype(int)
    model.partial_fit(X_batch, y_batch, classes=classes)
    print(f"Completed training batch {i+1}/{num_batches}. Processed {len(batch)} samples.")

print("Training completed on the training set.")

# ---------------------------------------------------------
# STEP 4: Evaluate the model on the testing set
# ---------------------------------------------------------
X_test = vectorizer.transform(test_df["review"].values)
y_test = test_df["sentiment"].values.astype(int)
y_pred = model.predict(X_test)

# Calculate Evaluation Metrics
accuracy = accuracy_score(y_test, y_pred)
precision_pos = precision_score(y_test, y_pred, pos_label=1)
recall_pos = recall_score(y_test, y_pred, pos_label=1)
f1_pos = f1_score(y_test, y_pred, pos_label=1)
cm = confusion_matrix(y_test, y_pred)

print("Evaluation Metrics (Positive Class):")
print(f"Accuracy               : {accuracy:.4f}")
print(f"Precision (Positive)   : {precision_pos:.4f}")
print(f"Recall (Positive)      : {recall_pos:.4f}")
print(f"F1 Score (Positive)    : {f1_pos:.4f}")
print("\nConfusion Matrix:")
print(cm)

# Detailed breakdown from confusion matrix
# Note: In a binary confusion matrix, the order is:
# [ [True Negatives, False Positives],
#   [False Negatives, True Positives] ]
tn, fp, fn, tp = cm.ravel()
print("\nDetailed Breakdown:")
print(f"True Positives (TP)    : {tp}")
print(f"False Positives (FP)   : {fp}")
print(f"True Negatives (TN)    : {tn}")
print(f"False Negatives (FN)   : {fn}")

# For a more complete view, we can also calculate the metrics for the Negative class (label 0)
precision_neg = precision_score(y_test, y_pred, pos_label=0)
recall_neg = recall_score(y_test, y_pred, pos_label=0)
f1_neg = f1_score(y_test, y_pred, pos_label=0)

print("\nEvaluation Metrics (Negative Class):")
print(f"Precision (Negative)   : {precision_neg:.4f}")
print(f"Recall (Negative)      : {recall_neg:.4f}")
print(f"F1 Score (Negative)    : {f1_neg:.4f}")

# ---------------------------------------------------------
# STEP 5: Save the trained model and vectorizer together
# ---------------------------------------------------------
output_file = "trained_model.pkl"
with open(output_file, "wb") as f:
    pickle.dump((model, vectorizer), f)

print(f"Model and vectorizer saved successfully to '{output_file}'.")
