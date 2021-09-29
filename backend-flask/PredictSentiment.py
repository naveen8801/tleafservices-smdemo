from textblob import TextBlob


def TellmeSentiment(text):
    analysis = TextBlob(text).sentiment
    if analysis.polarity > 0.3:
        return "Positive"
    if analysis.polarity < -0.3:
        return "Negative"
    else:
        return "Neutral"
