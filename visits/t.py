import nimbella
kv = nimbella.redis()

def main(args):
    global kv
    count = kv.incr('page-visits')
    return { 'body': count }

