#!/usr/bin/env python3
""" flask app for alx project 0x02. i18n"""

from flask import Flask, render_template, request
from flask_babel import Babel, gettext as _

app = Flask(__name__)


class Config(object):
    """config for babel"""
    LANGUAGES = ['en', 'fr']
    BABEL_DEFAULT_LOCALE = 'en'
    BABEL_DEFAULT_TIMEZONE = 'UTC'


app.config.from_object(Config)

babel = Babel(app)


@babel.localeselector
def get_locale() -> str:
    """some doc string"""
    return request.accept_languages.best_match(app.config['LANGUAGES'])


@app.route('/')
def index() -> str:
    """first root"""
    return render_template("3-index.html")


if __name__ == "__main__":
    app.run(debug=True)
