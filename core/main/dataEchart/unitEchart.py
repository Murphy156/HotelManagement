#!/usr/bin/env python3
# -*- coding: utf-8 -*
# @Time : 2020/8/24 10:11 上午
# @Author : lijunhua
# @Email : 634134551@qq.com
# @File : unitEchart.py

# noinspection PyUnresolvedReferences
import json
# noinspection PyUnresolvedReferences
from flask import Flask, request, jsonify, send_file
from flask import Blueprint
from flask_restful import Resource, Api
from core.main.utils.db.db_helper import *
from core.main.utils.common import Common
import logging.config

logging.config.fileConfig("../conf/logging.conf")
LOG = logging.getLogger(name="rotatingFileLogger")
#
unitEchart = Blueprint('UnitEchart ', __name__)
api = Api(unitEchart)

USREINFO_HEADER = {
    'id': '序号',
    'name': '姓名',
    'building': '区域',
    'room': '房间',
    'rent': '租金',
    'deposit': '押金',
    'check_in': '入住时间',
    'check_out': '退租时间',
    'contact': '联系电话',
    'living_number': '入住人数',
    'CreateTime': '登记时间'
}

class UnitEchart(Resource):

    def __init__(self):
        # 实例化Common类
        self._common = Common()

    def get(self, operation):
        if (operation == 'roomAllInc'):
            return self.roomAllInc()
        elif (operation == 'roomRent'):
            return self.roomRent()
        elif (operation == 'waterConsum'):
            return self.waterConsum()
        elif (operation == 'elecConsum'):
            return self.elecConsum()
        elif (operation == 'getUserInfo'):
            return self.getUserInfo()
        elif (operation == 'roomincClafi'):
            return self.roomincClafi()
        elif (operation == 'curaStat'):
            return self.curaStat()
        elif (operation == 'idle'):
            return self.idle()

    def post(self, operation):
        if (operation == 'roomAllInc'):
            return self.roomAllInc()
        elif (operation == 'roomRent'):
            return self.roomRent()
        elif (operation == 'waterConsum'):
            return self.waterConsum()
        elif (operation == 'elecConsum'):
            return self.elecConsum()
        elif (operation == 'getUserInfo'):
            return self.getUserInfo()
        elif (operation == 'roomincClafi'):
            return self.roomincClafi()
        elif (operation == 'curaStat'):
            return self.curaStat()
        elif (operation == 'idle'):
            return self.idle()

    # 某个房间的年总收入
    def roomAllInc(self):
        # 这里SQL语句执行的是某个房间的年总收入， 需要传入区域，房间号，年份
        region = request.args.get("region")
        year = request.args.get("year")
        room = request.args.get("room")
        sql = f'select year, sum(rent) as sum_rent from monthly WHERE building = "{region}" AND room = "{room}" AND year = "{year}" '
        LOG.info(f"sql is : {sql}")
        data1 = self._common.db.execute(sql)
        LOG.info("data1 : " + str(data1))
        data = data1[0]
        return jsonify(data)

    # 获取月租金
    def roomRent(self):
        # 这里获取某个房间的月租金,需要传入区域号和房间号
        region = request.args.get("region")
        room = request.args.get("room")
        sql = f'select rent from room_information where building = "{region}" AND room = "{room}"'
        LOG.info(f"sql is : {sql}")
        data1 = self._common.db.execute(sql)
        LOG.info("sql result is : " + str(data1))
        data = data1[0]
        return jsonify(data)

    # 获取某月某区域某房间的用水量
    def waterConsum(self):
        # 这里获取某个房间的用水量， 需要传入区域号，房间号，年份，和月份
        region = request.args.get("region")
        year = request.args.get("year")
        room = request.args.get("room")
        month = request.args.get("month")
        sql = f'select water from monthly where building = "{region}" AND room = "{room}" AND year = "{year}" AND month = "{month}" '
        LOG.info(f"sql is : {sql}")
        data1 = self._common.db.execute(sql)
        LOG.info("sql result is : " + str(data1))
        data = data1[0]
        return jsonify(data)

    # 获取某月某区域某房间的用电量
    def elecConsum(self):
        # 这里获取某个房间的用电量， 需要传入区域号，房间号，年份，和月份
        region = request.args.get("region")
        year = request.args.get("year")
        room = request.args.get("room")
        month = request.args.get("month")
        sql = f'select electricity from monthly where building = "{region}" AND room = "{room}" AND year = "{year}" AND month = "{month}" '
        LOG.info(f"sql is : {sql}")
        data1 = self._common.db.execute(sql)
        LOG.info("sql result is : " + str(data1))
        data = data1[0]
        return jsonify(data)

    # 本年闲置时间
    def idle(self):
        pass

    # 这里返回的是某一年，某个区域，某个房间，，某个月的房屋状态
    def curaStat(self):
        region = request.args.get("region")
        room = request.args.get("room")
        sql = f'select state from room_information where building = "{region}" AND room = "{room}" '
        LOG.info(f"sql is : {sql}")
        rs = self._common.db.execute(sql)
        LOG.info("curaStat data : " + str(rs))
        res = {}
        res['state'] = '闲置'
        if (rs[0]['state'] == 'on'):
            res['state'] = '已租'
        return jsonify(res)

    # 这里返回的是 某一年，某一区域，某个房间：1、全年每月收入，2、全年每月水费收入，3、全年每月电费收入
    def roomincClafi(self):
        region = request.args.get("region")
        year = request.args.get("year")
        room = request.args.get("room")
        A_sql = f'select month ,sum(rent) as sum_rent from monthly where building = "{region}" AND year = "{year}" AND room = "{room}" group by month'
        LOG.info(f"sql is : {A_sql}")
        # 这里的data1返回的是某一年，某一区域，某个房间的按月总收入
        data1 = self._common.db.execute(A_sql)
        LOG.info("data1 : " + str(data1))

        # 这里的data2返回的是某一年，某一区域，某个房间的按月电费总收入
        e_sql = f'select month ,sum(e_c) as sum_e_c from monthly where building = "{region}" AND year = "{year}" AND room = "{room}" group by month'
        LOG.info(f"sql is : {e_sql}")
        data2 = self._common.db.execute(e_sql)
        LOG.info("data2 : " + str(data2))

        # 这里的data3返回的是某一年，某一区域，某个房间的按月水费总收入
        w_sql = f'select month ,sum(w_c) as sum_w_c from monthly where building = "{region}" AND year = "{year}" AND room = "{room}" group by month'
        LOG.info(f"sql is : {w_sql}")
        data3 = self._common.db.execute(w_sql)
        LOG.info("data3 : " + str(data3))
        data = data1 + data2 + data3
        LOG.info("data : " + str(data))
        return jsonify(data)



    # 获取入住人信息数据
    def getUserInfo(self):
        region = request.args.get("region")
        room = request.args.get("roomNum")
        #
        whereStr = "where 1 = 1 "
        if (not region is None) and (region != '') and (region != '所有'):
            whereStr += f"and building = '{region}'"
        if (not room is None) and (room != ''):
            whereStr += f"and room = '{room}'"

        sql = f"select * from tenant {whereStr}"
        #
        LOG.info(f"sql is : {sql}")
        res = self._common.db.execute(sql)

        LOG.info("sql result is : " + str(res))
        outputData = self.formatUserInfoOutput(res)
        a = jsonify(outputData)
        print(a)
        return jsonify(outputData)

    # 生成动态表格
    def formatUserInfoOutput(self, userInfo):
        rows = []
        #
        for user in userInfo:
            user['CreateTime'] = str(user['CreateTime'])
            row = {}
            for key, value in USREINFO_HEADER.items():
                row[key] = user[key]
            rows.append(row)
        #
        outputData = {
            'header': USREINFO_HEADER,
            'body': rows
        }
        return outputData








api.add_resource(UnitEchart, '/unit/<operation>')