#!/usr/bin/env python3
""" flask app for alx project 0x02. i18n"""

from flask import Flask, render_template, request
from flask_babel import Babel


app = Flask(__name__)


class Config:
    """config for babel"""
    LANGUAGES = ['en', 'fr']
    BABEL_DEFAULT_LOCALE = 'en'
    BABEL_DEFAULT_TIMEZONE = 'UTC'


app.config.from_object(Config)

babel = Babel(app)


@app.route('/')
def index():
    """first root"""
    return render_template("1-index.html")


if __name__ == "__main__":
    app.run(debug=True)
