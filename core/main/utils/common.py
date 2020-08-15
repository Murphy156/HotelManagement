#!/usr/bin/env python3
# -*- coding: utf-8 -*
# @Time : 2020/8/14 3:51 下午 
# @Author : lishuohua
# @Email : shuohualee@126.com
# @File : common.py 

from flask import Flask, request,jsonify
from flask import Blueprint,views
from flask_restful import Resource, Api

from core.main.utils.db.db_helper import *
import logging.config
import yaml
logging.config.fileConfig("../conf/logging.conf")
LOG = logging.getLogger(name="rotatingFileLogger")

common = Blueprint('common', __name__)
api = Api(common)

class Common(Resource):

    def __init__(self):
        conf = yaml.load(open('../conf/config.yaml',encoding='UTF-8'), Loader=yaml.FullLoader)
        self._conf = conf
        self.db = DbObject(self._conf['db_conf'])

    def get(self,operation):
        if (operation == 'getRoomNum'):
            return self.getRoomNum()

    def post(self):
        pass

    def getRoomInfo(self, region = None):
        whereStr = "where 1 = 1 "
        if not region is None:
            whereStr += f"and building = '{region}'"

        sql = f"select * from room_information {whereStr}"
        LOG.info("sql is : " + sql)
        res = self.db.execute(sql)
        return res

    # 获取房间编号
    def getRoomNum(self):
        region = request.args.get("region")
        room_list = self.getRoomInfo(region)
        roomNumDict = {}
        num = 0
        for room in room_list:
            roomNumDict[num] = room['room']
            num += 1
        LOG.info("sql result is ： " + str(roomNumDict))
        roomNum = jsonify(roomNumDict)
        return roomNum


api.add_resource(Common, '/common/<operation>')
