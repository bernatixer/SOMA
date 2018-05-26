from textblob import TextBlob
import tweepy
import json

CONSUMER_TOKEN =  's7M4RPx8KOHxXOG9LOfsgjE63'
CONSUMER_SECRET = 'WnbHNRj85JUPRPa0DBQI7HemXeHre0rDVEqeQ5WFRbaERkYTFv'

auth = tweepy.OAuthHandler(CONSUMER_TOKEN, CONSUMER_SECRET)
api = tweepy.API(auth)

# query = 'ABCWorldNews'
# max_tweets = 100
# for tweet in tweepy.Cursor(api.search, q=query, lang="es").items(50):
#     text = tweet.text
#     print text
#     testimonial = TextBlob(text)
#     if testimonial.sentiment.polarity < 0.0:
#         print('Negative')
#     else:
#         print('Positive')

stuff = api.user_timeline(screen_name='ABCWorldNews', count=100, tweet_mode="extended", include_rts=True)
# print stuff[0].full_text
for tweet in stuff:
    text = tweet.full_text
    print text
    testimonial = TextBlob(text)
    polarity = testimonial.sentiment.polarity
    if polarity < 0.1:
        print('Negative -> ' + str(polarity))
    else:
        print('Positive -> ' + str(polarity))
    print "\n"
