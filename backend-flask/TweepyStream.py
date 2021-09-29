import tweepy


class TwitterStream(tweepy.StreamListener):
    def __init__(self, api=None,):
        super(TwitterStream, self).__init__()
        self.timer_tweets = 0
        self.tweet_send = 0
        self.sno = 0
        self.tweets = []

    def on_connect(self):
        # Function called to connect to the Twitter Stream
        print("You are now connected to the Twitter streaming API.")

    def on_error(self, status_code):
        # Function displays the error or status code
        print("An Error has occured: " + repr(status_code))
        return False

    def on_status(
        self,
        status,
    ):
        if "RT @" not in status.text and status.lang == "en":
            if hasattr(status, "extended_tweet"):
                if(len(self.tweets) <= 5):
                    print(status.created_at)
