#!/usr/bin/env python3
# -*- coding: utf-8 -*
# @Time : 2020/8/14 3:51 下午 
# @Author : lishuohua
# @Email : shuohualee@126.com
# @File : common.py 

# noinspection PyUnresolvedReferences
from flask import Flask, request,jsonify
# noinspection PyUnresolvedReferences
from flask import Blueprint,views
from flask_restful import Resource, Api
# noinspection PyUnresolvedReferences
import xlrd
from core.main.utils.db.db_helper import *
import logging.config
import yaml

logging.config.fileConfig("../conf/logging.conf")
LOG = logging.getLogger(name="rotatingFileLogger")

common = Blueprint('common', __name__)
api = Api(common)

class Common(Resource):

    # 构造函数
    def __init__(self):
        conf = yaml.load(open('../conf/config.yaml', encoding='UTF-8'), Loader=yaml.FullLoader)
        self._conf = conf
        self.db = DbObject(self._conf['db_conf'])

    #接收get请求
    def get(self, operation):
        if (operation == 'getRoomNum'):
            return self.getRoomNum()
        elif (operation == 'getyeartotally'):
            return self.getyeartotally()
    #接收post请求
    def post(self,operation):
        if (operation == 'getRoomNum'):
            return self.getRoomNum()
        elif (operation == 'getyeartotally'):
            return self.getyeartotally()

    #获取房间信息
    def getRoomInfo(self, region = None):
        whereStr = "where 1 = 1"
        if not region is None:
            whereStr += f" and building = '{region}'"

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
        res = {
            'code' : 0,
            'msg' : "success",
            'data' : roomNumDict
        }
        LOG.info("sql result is ： " + str(res))
        return jsonify(res)

    # 获取总共的年份
    def getyeartotally(self):
        sql = f"select distinct year from monthly order by year desc"
        res = self.db.execute(sql)
        year_list = res
        yearNumDict = {}
        num = 0
        for year in year_list:
            yearNumDict[num] = year['year']
            num += 1
        res = {
            'code': 0,
            'msg': "success",
            'data': yearNumDict
        }
        LOG.info("sql result is ： " + str(res))
        return jsonify(res)

    '''
    @desc 使用移动平均算法，预测下个月的收入
    @:param trainData 训练数据，period 移动平均的周期数据
    @:return dict, 返回下个月的预测收入
    '''
    def predict_average(self, trainData, period = 2):
        total = 0
        for i in range(0, period):
            total += trainData[i]['sum_rent']

        return int(total/period)

api.add_resource(Common, '/common/<operation>')
