#!/usr/bin/env python3
""" flask app for alx project 0x02. i18n"""

from typing import Optional
from flask import Flask, render_template, request, g
from flask_babel import Babel, gettext as _
from flask_babel import format_datetime
from datetime import datetime
import pytz

app = Flask(__name__)


class Config:
    """config for babel"""
    LANGUAGES = ['en', 'fr']
    BABEL_DEFAULT_LOCALE = 'en'
    BABEL_DEFAULT_TIMEZONE = 'UTC'


app.config.from_object(Config)

babel = Babel(app)
users = {
    1: {"name": "Balou", "locale": "fr", "timezone": "Europe/Paris"},
    2: {"name": "Beyonce", "locale": "en", "timezone": "US/Central"},
    3: {"name": "Spock", "locale": "kg", "timezone": "Vulcan"},
    4: {"name": "Teletubby", "locale": None, "timezone": "Europe/London"},
}


def get_user() -> dict:
    """user login"""
    user_id = request.args.get("login_as")
    if user_id is not None and int(user_id) in users:
        return users[int(user_id)]
    return None


@app.before_request
def before_request():
    """executed before all other functions"""
    g.user = get_user()


@babel.localeselector
def get_locale() -> Optional[str]:
    """some doc string"""
    locale = request.args.get('locale')
    if locale in app.config['LANGUAGES']:
        return locale
    if g.user and g.user.get("locale") in app.config["LANGUAGES"]:
        return g.user["locale"]
    return request.accept_languages.best_match(app.config['LANGUAGES'])


@babel.timezoneselector
def get_timezone():
    """getting the time """
    try:
        if request.args.get("timezone"):
            return pytz.timezone(request.args.get("timezone")).zone
        if g.user and g.user.get("timezone"):
            return pytz.timezone(g.user["timezone"]).zone
    except pytz.exceptions.UnknownTimeZoneError:
        pass
    return "UTC"


@app.route('/')
def index() -> str:
    """first root"""
    current_time = format_datetime(datetime.now())
    print(current_time)
    return render_template("index.html", current_time=current_time)


if __name__ == "__main__":
    app.run(host="0.0.0.0", port="5000")