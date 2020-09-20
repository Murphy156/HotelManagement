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
roomManagement = Blueprint('RoomManagement', __name__)
api = Api(roomManagement)

USREINFO_HEADER = {
    'id': '序号',
    'building': '区域',
    'room': '房间',
    'rent': '参考租金',
    'area': '面积',
    'air_condition': '空调',
    'heater': '热水器',
    'other': '其他',
    'remark': '备注',
    'state': '房屋状态',
    'CreateTime': '登记时间'
}

class RoomManagement(Resource):

    # 构造函数
    def __init__(self):
        # 实例化Common类
        self._common = Common()

    def get(self, operation):
        if (operation == 'getRoomInfo'):
            return self.getRoomInfo()

    def post(self, operation):
        if (operation == 'addRoom'):
            return self.addRoom()
        elif (operation == 'editRoom'):
            return self.editRoom()
        elif (operation == 'addRoomExcel'):
            return self.addRoomExcel()
        elif (operation == 'deleteRoom'):
            return self.deleteRoom()

    def addRoom(self):
        # 获取post的传输数据，并使用utf-8编码为字符串
        requestData = request.data.decode("utf-8")
        # 对jason字符串格式数据，解析为dict格式
        reqDataDict = json.loads(requestData)
        data = []
        for item in reqDataDict.keys():
            data.append(reqDataDict[item])
        sql = 'INSERT INTO room_information(building,room,area,air_condition,rent,heater,other,remark,state) VALUE (%s,%s,%s,%s,%s,%s,%s,%s,%s)'
        LOG.info(f"sql is : {sql}")
        res = self._common.db.execute(sql, data)
        LOG.info("sql result is : " + str(res))

    def addRoomExcel(self):
        room = xlrd.open_workbook(r'D:\house\roomManagement\core\room_information.xlsx')
        sheet = room.sheet_by_name("room_sheet1")
        for i in range(2, sheet.nrows):
            building = sheet.cell(i, 0).value
            room = sheet.cell(i, 1).value
            area = sheet.cell(i, 2).value
            air_condition = sheet.cell(i, 3).value
            heater = sheet.cell(i, 4).value
            other = sheet.cell(i, 5).value
            rent = sheet.cell(i, 6).value
            remark = sheet.cell(i, 7).value
            state = sheet.cell(i, 8).value
            value = (building, room, area, air_condition, heater, other, rent, remark, state)
            sql = "INSERT INTO room_information(building, room, area, air_condition, heater, other, rent, remark, state) VALUE (%s,%s,%s,%s,%s,%s,%s,%s,%s)"
            LOG.info(f"sql is : {sql}")
            res = self._common.db.execute(sql, value)
            LOG.info("sql result is : " + str(res))

        # 提交的问题
    def deleteRoom(self):
        requestData = request.data.decode("utf-8")
        # 对jason字符串格式数据，解析为dict格式
        reqDataDict = json.loads(requestData)
        id = []
        for item in reqDataDict.keys():
            id.append(reqDataDict[item])
        id1 = ''.join(id)
        sql = f"DELETE FROM room_information WHERE id = '{id1}' "
        LOG.info(f"sql is : {sql}")
        res = self._common.db.execute(sql)
        LOG.info("sql result is : " + str(res))

    def editRoom(self):
        # 获取post的传输数据，并使用utf-8编码为字符串
        requestData = request.data.decode("utf-8")
        # 对jason字符串格式数据，解析为dict格式
        reqDataDict = json.loads(requestData)
        data = []
        for item in reqDataDict.keys():
            data.append(reqDataDict[item])
        id = data[0]
        building = data[1]
        room = data[2]
        rent = data[3]
        area = data[4]
        air_condition = data[5]
        heater = data[6]
        other = data[7]
        remark = data[8]
        state = data[9]
        sql = f"UPDATE room_information SET building = '{building}' ,room = '{room}',rent = '{rent}' ,area = '{area}' , air_condition = '{air_condition}',heater = '{heater}' ,other = '{other}' ,remark = '{remark}' ,state = '{state}' WHERE id='{id}'"
        LOG.info(f"sql is : {sql}")
        res = self._common.db.execute(sql)
        LOG.info("sql result is : " + str(res))

# 获取用户数据
    def getRoomInfo(self):
        region = request.args.get("region")
        room = request.args.get("roomNum")
        #
        whereStr = "where 1 = 1 "
        if (not region is None) and (region != '') and (region != '所有'):
            whereStr += f"and building = '{region}'"
        if (not room is None) and (room != '') and (room != '所有'):
            whereStr += f"and room = '{room}'"

        sql = f"select * from room_information {whereStr}"
        #
        LOG.info(f"sql is : {sql}")
        res = self._common.db.execute(sql)

        LOG.info("sql result is : " + str(res))
        outputData = self.formatRoomInfoOutput(res)
        return jsonify(outputData)

    def formatRoomInfoOutput(self, roomInfo):
        rows = []
        #
        for room in roomInfo:
            room['CreateTime'] = str(room['CreateTime'])
            row = {}
            for key, value in USREINFO_HEADER.items():
                row[key] = room[key]
            rows.append(row)
        #
        outputData = {
            'header': USREINFO_HEADER,
            'body': rows
        }
        return outputData

#
api.add_resource(RoomManagement, '/room_information/<operation>')