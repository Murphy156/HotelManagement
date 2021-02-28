#!/usr/bin/env python3
# -*- coding: utf-8 -*
# @Time : 2020/10/25 21:00
# @Author : lijunhua
# @Email : 634134551@qq.com
# @File : unpaid_bill

# noinspection PyUnresolvedReferences
from flask import Flask, request, jsonify
from flask import Blueprint
# noinspection PyUnresolvedReferences
from flask_restful import Resource, Api
# noinspection PyUnresolvedReferences
import json
# noinspection PyUnresolvedReferences
import xlrd
# noinspection PyUnresolvedReferences
from core.main.utils.db.db_helper import *
# noinspection PyUnresolvedReferences
from core.main.utils.common import Common
import logging.config

logging.config.fileConfig("../conf/logging.conf")
LOG = logging.getLogger(name="rotatingFileLogger")
#
unpaidBill = Blueprint('UnpaidBill', __name__)
api = Api(unpaidBill)

class UnpaidBill (Resource):

    # 构造函数
    def __init__(self):
        # 实例化Common类
        self._common = Common()

    def get(self, operation):
        pass

    def post(self, operation):
        pass

    # 筛选出未交租的人----先获取当前的年份和月份,然后,吧没有这一行数据的人挑选出来,再判断他是否在这里居住
    def delay(self):
        year = request.args.get("year")
        month = request.args.get("month")
        # 把当前月份,年份输入,得到的是当前已交电费的名单,将这份名单输入到tranfor中再进行处理,处理完后将这个tranfor数据表里面的数据清空.
        sql_1 = f"insert into tranfor select id,building,room,w_c,e_c,rent from monthly where month = '{month}' and year = '{year}';'"
        self._common.db.execute(sql_1)



api.add_resource(UnpaidBill, '/unpaid/<operation>')