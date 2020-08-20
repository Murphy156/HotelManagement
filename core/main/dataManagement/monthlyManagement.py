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

class MonthlyManagement(Resource):

    # 构造函数
    def __init__(self):
        # 实例化Common类
        self._common = Common()

    def get(self, operation):
        if (operation == 'getMonthlyInfo'):
            return self.getMonthlyInfo()



    def post(self, operation):
        if (operation == 'addMonthly'):
            return self.addMonthly()
        elif (operation == 'editMonthly'):
            return self.editMonthly()
        elif (operation == 'addMonthlyExcel'):
            return self.addMonthlyExcel()
        elif (operation == 'deleteMonthly'):
            return self.deleteMonthly()

    def addMonthly(self):
        year = request.args.get("year")
        month = request.args.get("month")
        name = request.args.get("name")
        building = request.args.get("building")
        room = request.args.get("room")
        water = request.args.get("water")
        w_c = request.args.get("w_c")
        electricity = request.args.get("electricity")
        e_c = request.args.get("e_c")
        ref_rent = request.args.get("ref_rent")
        rent = request.args.get("rent")
        sql = 'INSERT INTO monthly(year, month, name, building, room, water, w_c, electricity, e_c, rent, ref_rent) VALUE (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s)'
        LOG.info(f"sql is : {sql}")
        res = self._common.db.execute(sql, [year, month, name, building, room, water, w_c, electricity, e_c, rent, ref_rent])
        LOG.info("sql result is : " + str(res))

    # 问题 就是db的不适用性
    def addMonthlyExcel(self):
        tenant = xlrd.open_workbook(r'D:\house\roomManagement\core\COPY.xlsx')
        sheet = tenant.sheet_by_name("tenant_sheet1")
        for i in range(2, sheet.nrows):
            year = sheet.cell(i, 0).value
            month = sheet.cell(i, 1).value
            name = sheet.cell(i, 2).value
            building = sheet.cell(i, 3).value
            room = sheet.cell(i, 4).value
            water = sheet.cell(i, 5).value
            w_c = sheet.cell(i, 6).value
            electricity = sheet.cell(i, 7).value
            e_c = sheet.cell(i, 8).value
            ref_rent = sheet.cell(i, 9).value
            rent = sheet.cell(i, 10).value
            value = (year, month, name, building, room, water, w_c, electricity, e_c, rent, ref_rent)
            sql = "INSERT INTO monthly(year, month, name, building, room, water, w_c, electricity, e_c, rent, ref_rent) VALUE (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s)"
            LOG.info(f"sql is : {sql}")
            res = self._common.db.execute(sql, value)
            LOG.info("sql result is : " + str(res))


    # 提交的问题
    def deleteMonthly(self):
        building = request.args.get("building")
        room = request.args.get("roomNum")
        name = request.args.get("name")
        sql = f"DELETE FROM monthly WHERE building = '{building}' AND room = '{room}' AND name = '{name}'"
        LOG.info(f"sql is : {sql}")
        res = self._common.db.execute(sql)
        LOG.info("sql result is : " + str(res))

    #
    def editMonthly(self):
        id = request.args.get("id")
        year = request.args.get("year")
        month = request.args.get("month")
        name = request.args.get("name")
        building = request.args.get("building")
        room = request.args.get("room")
        water = request.args.get("water")
        w_c = request.args.get("w_c")
        electricity = request.args.get("electricity")
        e_c = request.args.get("e_c")
        ref_rent = request.args.get("ref_rent")
        rent = request.args.get("rent")
        value = (year, month, name, building, room, water, w_c, electricity, e_c, rent, ref_rent)
        sql = f"UPDATE monthly SET(year, month, name, building, room, water, w_c, electricity, e_c, rent, ref_rent) VALUE (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s) WHERE id= '{id}' "
        self._common.db.execute(sql, value)

    # 获取每月数据
    def getMonthlyInfo(self):
        region = request.args.get("region")
        room = request.args.get("roomNum")
        #
        whereStr = "where 1 = 1 "
        if (not region is None) and (region != '') and (region != '所有'):
            whereStr += f"and building = '{region}'"
        if (not room is None) and (room != ''):
            whereStr += f"and room = '{room}'"

        sql = f"select * from monthly {whereStr}"
        #
        LOG.info(f"sql is : {sql}")
        res = self._common.db.execute(sql)

        LOG.info("sql result is : " + str(res))
        outputData = self.formatMonthlyInfoOutput(res)
        return jsonify(outputData)

    # 生成动态表格
    def formatMonthlyInfoOutput(self, monthlyInfo):
        rows = []
        #
        for user in monthlyInfo:
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

#
api.add_resource(MonthlyManagement, '/monthly/<operation>')






