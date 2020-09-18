""" 
 
"""
import xmltodict, requests, json


def main(args):
    data = requests.get(
        "https://news.google.com/rss/search?q=us+election&hl=en-US&gl=US&ceid=US:en"
    )
    xpars = xmltodict.parse(data.text)
    return {'body': xpars}
