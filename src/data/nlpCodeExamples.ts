export interface CodeSnippet {
  id: string;
  title: string;
  filename: string;
  library: 'scikit-learn' | 'transformers' | 'lime' | 'pandas';
  description: string;
  code: string;
}

export const NLP_CODE_SNIPPETS: CodeSnippet[] = [
  {
    id: 'data-loader',
    title: '1. Load & Inspect Kaggle Fake News Dataset (Pandas)',
    filename: '01_load_kaggle_dataset.py',
    library: 'pandas',
    description: 'Load the standard ISOT Fake News Dataset from Kaggle, inspect target class distributions, and perform preliminary text cleaning.',
    code: `import pandas as pd
import re

# 1. Load labeled Kaggle ISOT dataset
print("Loading real and fake news CSV files...")
real_df = pd.read_csv('True.csv')
fake_df = pd.read_csv('Fake.csv')

# 2. Assign binary labels (1 for Real, 0 for Fake)
real_df['label'] = 1
fake_df['label'] = 0

# 3. Concatenate and shuffle the combined dataset
df = pd.concat([real_df, fake_df], axis=0).sample(frac=1, random_state=42).reset_index(drop=True)

# 4. Feature engineering decision: Combine Title and Full Text
# Many fake news articles have hyper-clickbait titles but contradictory/empty text bodies.
df['full_text'] = df['title'] + " " + df['text']

print(f"Total records loaded: {len(df)}")
print(f"Class distribution:\\n{df['label'].value_counts(normalize=True) * 100}")

# 5. Text Cleaning Pipeline
def clean_text(text):
    text = re.sub(r'https?://\\S+|www\\.\\S+', '', text) # Remove URLs
    text = re.sub(r'<.*?>', '', text)                  # Remove HTML tags
    text = re.sub(r'[^a-zA-Z0-9\\s!?,.]', '', text)     # Keep normal punctuation for sensationalism detection
    return text.strip()

df['cleaned_text'] = df['full_text'].apply(clean_text)
print("Data preprocessing complete. Ready for feature extraction.")`
  },
  {
    id: 'baseline-tfidf',
    title: '2. Train Baseline TF-IDF + PassiveAggressiveClassifier',
    filename: '02_train_tfidf_baseline.py',
    library: 'scikit-learn',
    description: 'Build a TF-IDF sparse matrix with unigrams and bigrams, train an ultra-fast baseline classifier, and evaluate with a confusion matrix and F1 score.',
    code: `import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import PassiveAggressiveClassifier, LogisticRegression
from sklearn.metrics import classification_report, confusion_matrix, f1_score
import matplotlib.pyplot as plt
import seaborn as sns

X_train, X_test, y_train, y_test = train_test_split(
    df['cleaned_text'], df['label'], test_size=0.2, random_state=42, stratify=df['label']
)

# 1. Initialize TF-IDF Vectorizer with n-grams
print("Extracting TF-IDF features...")
tfidf = TfidfVectorizer(stop_words='english', max_df=0.8, min_df=5, ngram_range=(1, 2), max_features=75000)
X_train_tfidf = tfidf.fit_transform(X_train)
X_test_tfidf = tfidf.transform(X_test)

# 2. Train Baseline PassiveAggressive Classifier
print("Training PassiveAggressive online learner...")
pac = PassiveAggressiveClassifier(max_iter=50, random_state=42, C=0.5)
pac.fit(X_train_tfidf, y_train)

# 3. Predictions and Evaluation Metrics
y_pred = pac.predict(X_test_tfidf)
test_f1 = f1_score(y_test, y_pred)

print(f"\\nBaseline Model F1 Score: {test_f1:.4f}")
print("\\nClassification Report:")
print(classification_report(y_test, y_pred, target_names=['Fake (0)', 'Real (1)']))

# 4. Generate & Plot Confusion Matrix
cm = confusion_matrix(y_test, y_pred)
plt.figure(figsize=(7, 5))
sns.heatmap(cm, annot=True, fmt='d', cmap='Blues', xticklabels=['Predicted Fake', 'Predicted Real'], yticklabels=['Actual Fake', 'Actual Real'])
plt.title(f"TF-IDF + PAC Confusion Matrix (F1: {test_f1:.3f})")
plt.show()`
  },
  {
    id: 'interpretability-lime',
    title: '3. NLP Interpretability Explainer (LIME)',
    filename: '03_lime_token_explainer.py',
    library: 'lime',
    description: 'Use the Local Interpretable Model-agnostic Explanations (LIME) framework to highlight the exact phrases and tokens that push a prediction toward Fake or Real.',
    code: `from lime.lime_text import LimeTextExplainer
from sklearn.pipeline import make_pipeline

# 1. We wrap the TF-IDF vectorizer and Scikit-learn Logistic Regression into a single seamless callable pipeline
logreg = LogisticRegression(C=2.0, max_iter=500, random_state=42)
logreg.fit(X_train_tfidf, y_train)
c_pipeline = make_pipeline(tfidf, logreg)

# 2. Initialize LIME Text Explainer
explainer = LimeTextExplainer(class_names=['Likely Fake', 'Likely Real'])

# 3. Select a sensational sample text from the validation set
sample_headline = "BREAKING: Top Official Whistleblower Exposes Secret Algorithm That Flipped 500,000 Votes!!"

print(f"Analyzing sample input: '{sample_headline}'")
exp = explainer.explain_instance(
    sample_headline, 
    c_pipeline.predict_proba, 
    num_features=8
)

# 4. Display token contributions
print("\\nLIME Key Influential Tokens (Positive = Real, Negative = Fake):")
for token, weight in exp.as_list():
    direction = "➡️ Promotes Likely Real" if weight > 0 else "🟥 Promotes Likely Fake"
    print(f"{token:>18}: {weight:+.4f} ({direction})")

# 5. Save HTML explanation visualizer
exp.save_to_file('lime_explanation_demo.html')
print("\\nSaved interactive interpretability highlights to 'lime_explanation_demo.html'")`
  },
  {
    id: 'transformer-distilbert',
    title: '4. State-of-the-Art Transformer Fine-tuning (Hugging Face)',
    filename: '04_finetune_distilbert.py',
    library: 'transformers',
    description: 'Fine-tune a pre-trained bidirectional transformer (DistilBERT) on our fake news corpus using the PyTorch Hugging Face Trainer API.',
    code: `import torch
from transformers import AutoTokenizer, AutoModelForSequenceClassification, Trainer, TrainingArguments
from datasets import Dataset

# 1. Load Hugging Face Tokenizer & Model
model_name = "distilbert-base-uncased"
tokenizer = AutoTokenizer.from_pretrained(model_name)
model = AutoModelForSequenceClassification.from_pretrained(model_name, num_labels=2)

# 2. Convert Pandas DataFrames to Hugging Face Arrow Datasets
train_ds = Dataset.from_pandas(pd.DataFrame({'text': X_train.tolist(), 'label': y_train.tolist()}))
test_ds = Dataset.from_pandas(pd.DataFrame({'text': X_test.tolist(), 'label': y_test.tolist()}))

# 3. Tokenize texts
def tokenize_function(examples):
    return tokenizer(examples['text'], padding="max_length", truncation=True, max_length=256)

tokenized_train = train_ds.map(tokenize_function, batched=True)
tokenized_test = test_ds.map(tokenize_function, batched=True)

# 4. Define Training Arguments
training_args = TrainingArguments(
    output_dir="./veri_distilbert_results",
    learning_rate=2e-5,
    per_device_train_batch_size=16,
    per_device_eval_batch_size=32,
    num_train_epochs=2,
    weight_decay=0.01,
    evaluation_strategy="epoch",
    save_strategy="epoch",
    load_best_model_at_end=True,
    fp16=torch.cuda.is_available() # Use mixed precision if GPU is active
)

# 5. Execute Fine-tuning
trainer = Trainer(
    model=model,
    args=training_args,
    train_dataset=tokenized_train,
    eval_dataset=tokenized_test,
)

print("Starting distributed Transformer training run...")
trainer.train()

# 6. Evaluate Final Benchmark Performance
eval_results = trainer.evaluate()
print(f"\\nTransformer Evaluation Results: {eval_results}")`
  }
];
