from pyquery import PyQuery as pq
from lxml import etree
import urllib
from textblob import TextBlob
import tweepy
import re
import json
import requests

i = 1
CONSUMER_TOKEN =  's7M4RPx8KOHxXOG9LOfsgjE63'
CONSUMER_SECRET = 'WnbHNRj85JUPRPa0DBQI7HemXeHre0rDVEqeQ5WFRbaERkYTFv'

auth = tweepy.OAuthHandler(CONSUMER_TOKEN, CONSUMER_SECRET)
api = tweepy.API(auth)

# query = 'ABCWorldNews'
# max_tweets = 100
# for tweet in tweepy.Cursor(api.search, q=query, lang="es").items(50):
#     text = tweet.text
#      text
#     testimonial = TextBlob(text)
#     if testimonial.sentiment.polarity < 0.0:
#         ('Negative')
#     else:
#         ('Positive')

data = ""
stuff = api.user_timeline(screen_name='ABCWorldNews', count=100, tweet_mode="extended", include_rts=True)
#  stuff[0].full_text
for tweet in stuff:
    text = tweet.full_text
    testimonial = TextBlob(text)
    polarity = testimonial.sentiment.polarity
  

    urls = re.findall('http[s]?://(?:[a-zA-Z]|[0-9]|[$-_@.&+]|[!*\(\),]|(?:%[0-9a-fA-F][0-9a-fA-F]))+', text)
    #page = requests.get(urls[0]).content
    headers = ""
    url = ""
    d = ""
    if len(urls) > 0:
        url = urls[0]
        d = pq(url=url)
        
        headers = d('.article-header').text()  
        if headers != "":
            headers = headers.split("\n")
        if len(headers) > 0:
            headers = headers[0]

    print i
    data += '{"post": "'+headers+'", "info": { "sentiment" : "'+str(polarity)+'", "url" : "'+url+'", "text" : "'+text+'" } }, '
    i = i+1

with open('data.json','w') as outfile:
    formatted = ""
    for char in data:
        formatted += char.encode("utf8")
    outfile.write(formatted)
    sent = json.dumps(formatted,indent=4) 
