import pandas as pd
import numpy as np
import nltk
import os
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.preprocessing import LabelEncoder
import pickle
from nltk.stem import WordNetLemmatizer
import re
from nltk.corpus import stopwords


print(os.getcwd)

nltk.download("stopwords")
nltk.download('wordnet')

# df = pd.read_csv('data/test_data.csv', delimiter=',')


def predictByRules(txt):
    txt = txt.lower()

    compliment_phrases = [
        'welldone',
        'well done',
        'Salute',
        'congratulations',
        'congratulation',
        'congratulate',
        'good job',
        'good work',
        'great sir',
        'great job',
        'very good',
        'good going',
        'good news',
        'appreciable work',
        'appreciate']

    incident_phrases = [
        'please look',
        'plz look',
        'pls look',
        'pls help',
        'violation',
        'negligence',
        'criminal',
        'criminals',
        'serious matter',
        'initiate inquiry',
        'initiate enquiry',
        'inquiry',
        'enquiry',
        'request attention',
        'take apt action',
        'please look',
        'immediate action',
        'please help',
        'thief',
        'steal',
        'murder',
        'missing person',
        'missing son',
        'child lost',
        'accident',
        'blood',
        'injury',
        'violence',
        'crime',
        'need help',
        'strict action',
        'incite riot',
        'communal riot',
        'hate speech',
        'incite hatred',
        'penalise'
    ]

    complain_phrases = [
        'mafia',
        'illegal',
        'false news',
        'fake news',
        'lynch',
        'charging more',
        'fraud',
        'please speak up',
        'want justice',
        'shameful',
        'fake video',
        'watch the video',
        'watch video',
        'illegal',
        'kill muslims',
        'killing muslims',
        'kill hindus',
        'killing hindus',
        'shoot them',
        'hang them',
        'harassment',
        'terrorist',
        'tortured',
        'dangerous',
        'traumatic',
        'justice is done',
        'law and order',
        'goons',
        'lawless',
        'muslims',
        'hindus',
        'dalits',
        'corrupt',
        'not safe',
        'unsafe',
        'safety',
        'irresponsible',
        'accountable',
        'accountability',
        'inhuman',
        'sad',
        'barbaric',
        'cruel',
        'shame',
        'shameful',
        'shameless',
        'not acceptable',
        'cognizance',
        'strictest action'
    ]

    info_phrases = [
        'fir lodged',
        'arrested',
        'beware',
        'info',
        'information'
    ]

    if any(substring in txt for substring in compliment_phrases):
        return "Compliment"

    if any(substring in txt for substring in incident_phrases):
        return "Incident"

    if any(substring in txt for substring in complain_phrases):
        return "Complain"

    if any(substring in txt for substring in info_phrases):
        return "Info"

    return "Other"


# This funciton will clean the content text
def CleanBody(text):
    text = text.lower()
    text = re.sub(r"what's", "what is ", text)
    text = re.sub(r"\'s", " ", text)
    text = re.sub(r"\'ve", " have ", text)
    text = re.sub(r"can't", "can not ", text)
    text = re.sub(r"n't", " not ", text)
    text = re.sub(r"i'm", "i am ", text)
    text = re.sub(r"\'re", " are ", text)
    text = re.sub(r"\'d", " would ", text)
    text = re.sub(r"\'ll", " will ", text)
    text = re.sub(r"\'scuse", " excuse ", text)
    text = re.sub(r"\'\n", " ", text)
    text = re.sub(r"\'\xa0", " ", text)
    text = re.sub('\s+', ' ', text)
    text = text.strip(' ')
    return text


# This function will help in lemitizing of text
lemma = WordNetLemmatizer()


def lemitizeWords(text):
    words = text.split(" ")
    listLemma = []
    for w in words:
        x = lemma.lemmatize(w, pos="v")
        listLemma.append(x)
    return ' '.join(map(str, listLemma))


# This function will remove all stopwords from text
def stopWordsRemove(text):
    all_stopwords = stopwords.words("english")
    words = text.split(" ")
    filtered = [w for w in words if not w in set(all_stopwords)]
    return ' '.join(map(str, filtered))


# df['text'] = df['text'].apply(lambda text: CleanBody(text))
# df['text'] = df['text'].apply(lambda text: lemitizeWords(text))
# df['text'] = df['text'].apply(lambda text: stopWordsRemove(text))
#
# df['Prediction'] = df['text'].apply(lambda text: predictByRules(text))
#
# df.to_csv('data/test_output.csv')