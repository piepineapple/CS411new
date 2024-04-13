import nltk
from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize
from nltk.stem import WordNetLemmatizer
import re

# Download NLTK resources
nltk.download('punkt')
nltk.download('stopwords')
nltk.download('wordnet')

def preprocess_journal_entry(journal_entry):
    # Text cleaning: Remove non-alphanumeric characters and convert to lowercase
    journal_entry = re.sub(r'[^a-zA-Z0-9\s]', '', journal_entry)
    journal_entry = journal_entry.lower()

    # Tokenization
    tokens = word_tokenize(journal_entry)

    # Stopword removal
    stop_words = set(stopwords.words('english'))
    tokens = [token for token in tokens if token not in stop_words]

    # Lemmatization
    lemmatizer = WordNetLemmatizer()
    tokens = [lemmatizer.lemmatize(token) for token in tokens]

    return tokens

# Example journal entry
journal_entry = "Today I went for a walk in the park and listened to some music. The weather was beautiful."

# Preprocess journal entry
processed_journal_entry = preprocess_journal_entry(journal_entry)
print("Processed Journal Entry:", processed_journal_entry)
