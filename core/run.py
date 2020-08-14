#!/usr/bin/env python3
# -*- coding: utf-8 -*
# @Time : 2020/8/14 11:31 上午 
# @Author : lishuohua
# @Email : shuohualee@126.com
# @File : run.py 

from flask import Flask, render_template
import logging.config
import yaml
from core.main.utils.common import common

app = Flask(__name__, template_folder='templates/', static_folder='templates/static')

@app.route('/dataManagement/userManagement')
def userManagement():
    return render_template('userManagement.html')


@app.route('/dataAnalysis')



@app.route('/')
def index():
    return render_template('index.html')

if __name__ == '__main__':
    print("start!")

    # Blueprints
    app.register_blueprint(common, url_prefix='/api/v1')

    app.run(host = "0.0.0.0", port=8888, debug=True)

    print("running!")