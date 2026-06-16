# 🛡️ VeriText.AI — Fake News Detection & NLP Interpretability Workbench

![VeriText AI Banner](https://img.shields.io/badge/System-NLP%20Fake%20News%20Detection%20%26%20Interpretability-4f46e5?style=for-the-badge&logo=probot&logoColor=white)
![React 19](https://img.shields.io/badge/Frontend-React%2019%20%2B%20Tailwind%20CSS-06B6D4?style=for-the-badge&logo=react&logoColor=white)
![Python Backend Model](https://img.shields.io/badge/ML%20Engine-Scikit--Learn%20%2B%20Transformers%20%2B%20LIME-10B981?style=for-the-badge&logo=python&logoColor=white)

---

## 📖 Concept & Objective that wiill blow you mbb

Misinformation deeply affects high-stakes societal domains like **elections, healthcare choices, and global financial markets**. That is why internet platforms, cyber defense agencies, and premium newsrooms invest heavily in early computational detection. 

However, building AI in sensitive social domains requires profound maturity. A well-scoped fake news project allows you to practice serious NLP while operating in a controlled, academic setting with labeled Kaggle benchmarks. **The core objective of VeriText.AI is not just to build a black-box classifier that flags likely real vs. likely fake articles, but to incorporate Local Interpretable Model-agnostic Explanations (LIME) to visually highlight the exact tokens and phrasing that drove the AI's decision.**

This serves as a definitive showcase that you understand both the underlying math of feature extraction (TF-IDF vs. pre-trained Transformers) and the inevitable **human judgment boundaries** of Artificial Intelligence.

---

## 🚀 What Problems Does This Solve?

1. **The "Black Box" Trust Deficit:** In courtrooms and investigative newsrooms, an AI that simply spits out `[Fake News: 98%]` is completely useless. VeriText solves this by using LIME text explainability to highlight green tokens that promote True News (like authentic agency datelines and objective econometric verbs) and red tokens that push towards Fake News (hyperbolic adjectives, capitalization overloads, exclamation spikes).
2. **The Labeled Feature Gap (Headline vs Body Contradictions):** Many deceptive web spammers construct highly enticing, alarming clickbait headlines but attach empty, unverified, or contradictory body text. VeriText solves this by illustrating how combining `Title + Full Text` drastically outperforms single-feature models.
3. **Noisy Labels in Human Annotations:** The system actively audits why human labels (like PolitiFact's 6-way scale or Reddit submissions) get contaminated by satire (*The Onion*), hyper-partisan framing, or decontextualized factual statistics.
4. **Bridging Jupyter Notebooks to Real Pragmatic Usage:** Inspired by real-world feedback from `r/ArtificialInteligence`, this project doesn't let ML code rot in a static notebook. It provides blueprints and runnable interactive mocks for real-world deployments: a live Discord chatbot (`NewsGuard Bot`), a YouTube video caption summarizer, and a lightweight browser RSS triage popup.

---

## 🧰 Tools & Technologies Required

* **Frontend Interactive Suite:** React 19, TypeScript, Vite, Tailwind CSS, Lucide Icons.
* **ML Baseline Baselines:** `scikit-learn`, `numpy`, `pandas`, `PassiveAggressiveClassifier`, `LogisticRegression`, `RandomForestClassifier`.
* **State-of-the-Art Deep Embeddings:** Hugging Face `transformers` (`DistilBERT`, `RoBERTa`), PyTorch.
* **Interpretability & Metrology Suite:** `lime` (`LimeTextExplainer`), `shap`, interactive confusion matrices, precision-recall metrology.
* **Ground Truth Datasets:** The benchmark **Kaggle ISOT Fake and Real News Corpus** (44,898 labeled articles) & the **LIAR PolitiFact Dataset** (12,800 nuanced statements).

---

## 📋 Step-by-Step NLP Work Process

Our interactive web application includes a fully interactive **NLP Pipeline Simulator** that guides users through the 5 exact stages of building this serious NLP architecture:

1. **Data Loading & Balance Auditing:** Inspect the class equilibrium (21,417 Real vs. 23,481 Fake in ISOT) and explore word count histograms to discover how fake news is highly skewed.
2. **Feature Ablation Analysis:** Test why training on `Titles Only` yields ~84% accuracy, `Full Text Only` yields ~92%, and concatenated `Combined Text` reaches **96.8%**.
3. **Interactive Preprocessing Sandbox:** Tokenize, stem, lemmatize, remove stopwords, and generate real-time TF-IDF sparse arrays versus 768-dimension dense Transformer embeddings.
4. **Baseline Model Training & Confusion Matrix:** Train baseline online learners (`PassiveAggressiveClassifier`) and evaluate Precision, Recall, and ROC-AUC curves on an 8,980-sample test set.
5. **LIME Explainer Integration:** Watch how local perturbation generates thousands of masked word neighborhoods to fit a localized linear ridge regression hyperplane that reveals exact single-token weights.

---

## 💻 How to Run This Web Application Locally

This workbench is packaged as an ultra-fast Vite React single-page application.

### Prerequisites
* **Node.js** (v18.0.0 or higher recommended)
* **npm** or **pnpm** or **yarn**

### Quickstart Commands

1. **Clone or unzip the repository:**
   ```bash
   git clone https://github.com/yourusername/veritext-ai-fake-news-detector.fc
   cd veritext-ai-fake-news-detector
   ```

2. **Install frontend UI dependencies:**
   ```bash
   npm install
   ```

3. **Spin up the lightning-fast Vite local dev server:**
   ```bash
   npm run dev
   ```
   *The application will instantly launch at `http://localhost:5173`.*

4. **Build for Production Deployment (Vercel, Netlify, or GitHub Pages):**
   ```bash
   npm run build
   ```
   *The highly optimized static bundle will be generated inside the `/dist` directory.*

---

## 🐍 Practicing Serious Python NLP Locally or in Google Colab

In the **Python Code Hub** tab of the web application, you can inspect, copy, and download the full, runnable Python `.py` source files. If you want to train these models locally:

1. Create a virtual environment and install ML prerequisites:
   ```bash
   python3 -m venv nlp_env
   source nlp_env/bin/activate
   pip install numpy pandas scikit-learn transformers lime matplotlib seaborn
   ```
2. Download the Kaggle ISOT dataset CSVs (`True.csv` and `Fake.csv`) into your workspace.
3. Execute the standard baseline script:
   ```bash
   python3 02_train_tfidf_baseline.py
   ```
4. Generate the HTML interpretability report:
   ```bash
   python3 03_lime_token_explainer.py
   ```

---

## 🧠 The r/ArtificialInteligence Pragmatic Builders Philosophy

Real AI projects look simple on paper because they actually get used. The common pattern shared by experienced developers who stick with their projects is: **a clear scope, real daily inputs, and a small responsive interface you can run anywhere**.

VeriText includes a special **Pragmatic Deployments Hub** illustrating how to package this ML engine into:
* 🤖 **A runnable Discord Bot (`!veritext <url>`)** for instant link triage in community chats.
* 🎙️ **A YouTube Caption Podcast Summarizer** that pulls auto-generated web transcripts and outputs audio-style bulletins with validated entity citations.
* 🌐 **A highly secure sub-15ms Browser Extension** that executes TF-IDF bigrams entirely on your local CPU to guarantee 100% reader privacy.

---

## ⚖️ Ethical & Research Aid Disclaimer

**VeriText.AI is explicitly developed as an academic NLP research aid.** It measures structural sensationalism, linguistic objectivity factor, and wire attribution syntax. **It is not an infallible real-world fact checker.** 

When making critical public health, electoral voting, or financial market decisions, please verify truth through authoritative institutional registries (`CISA.gov`, `WHO`, `FDA`, `SEC`) and authenticated human investigative investigative newsrooms.

---

## 👨‍💻 Devloper

- Ishan Maitra: Cloud & AI Developer of Google
- Contact No.: +91 9674026774
- Email: ishanmaitra2012@gmail.com
- GitHub: https://www.gihub.com/maitrawebtech
