#！/usr/bin/env python3
# -*- coding: utf-8 -*
# @Time : 2020/8/18 10:41 上午
# @Author : lijunhua
# @Email : 634134551@qq.com
# @File : roomManagement.py

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
roomManagement = Blueprint('RoomManagement', __name__)
api = Api(roomManagement)

USREINFO_HEADER = {
    'id': '序号',
    'building': '区域',
    'room': '房间',
    'rent': '租金',
    'remark': '参考押金',
    'area': '面积',
    'air_condition': '空调',
    'heater': '热水器',
    'other': '其他',
    'CreateTime': '登记时间'
}