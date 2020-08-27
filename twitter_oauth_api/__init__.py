from flask import Flask,redirect,url_for
from flask_dance.contrib.twitter import make_twitter_blueprint,twitter
app = Flask(__name__)

app.config.from_pyfile('config.py')

twitter_blueprint = make_twitter_blueprint(
    api_key=app.config['TWITTER_CONSUMER_KEY'],
    api_secret=app.config['TWITTER_CONSUMER_SECRET']
)

app.register_blueprint(twitter_blueprint)

@app.route('/api')
def index():
    if not twitter.authorized:
        return {"screen_name":"Please click on Log in with Twitter button"}
    resp = twitter.get("account/settings.json")
    assert resp.ok
    print(twitter.token)
    return {"screen_name":resp.json()["screen_name"]}

@app.route("/api/twitter")
def login_with_twitter():
    if not twitter.authorized:
        return redirect(url_for("twitter.login"))
    resp = twitter.get("account/settings.json")
    assert resp.ok
    print(twitter.token)
    return {"screen_name":resp.json()["screen_name"]}

@app.route("/")
def indexHome():
    return redirect("http://localhost:3000/")
