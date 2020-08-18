#！/usr/bin/env python3
# -*- coding: utf-8 -*
# @Time : 2020/8/18 10:41 上午
# @Author : lijunhua
# @Email : 634134551@qq.com
# @File : monthlyManagement.py

# noinspection PyUnresolvedReferences
from flask import Flask, request, jsonify
from flask import Blueprint
# noinspection PyUnresolvedReferences
from flask_restful import Resource, Api
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
monthlyManagement = Blueprint('MonthlyManagement', __name__)
api = Api(monthlyManagement)

USREINFO_HEADER = {
    'id': '序号',
    'year': '入住年份',
    'month': '入住月份',
    'name': '姓名',
    'building': '栋号',
    'room': '房间号',
    'water': '用水量',
    'w_c': '水费',
    'electricity': '电量',
    'e_c': '电费',
    'ref_rent': '参考房租',
    'rent': '房租',
    'CreateTime': '登记时间'
}