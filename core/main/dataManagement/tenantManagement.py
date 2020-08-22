#!/usr/bin/env python3
# -*- coding: utf-8 -*
# @Time : 2020/8/14 10:41 上午 
# @Author : lishuohua
# @Email : shuohualee@126.com
# @File : tenantManagement.py

# noinspection PyUnresolvedReferences
from flask import Flask, request, jsonify
from flask import Blueprint
from flask_restful import Resource, Api
import json
# noinspection PyUnresolvedReferences
import xlrd
from core.main.utils.db.db_helper import *
from core.main.utils.common import Common
import logging.config

logging.config.fileConfig("../conf/logging.conf")
LOG = logging.getLogger(name="rotatingFileLogger")
#
tenantManagement = Blueprint('TenantManagement', __name__)
api = Api(tenantManagement)

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

class TenantManagement(Resource):

    # 构造函数
    def __init__(self):
        # 实例化Common类
        self._common = Common()

    def get(self, operation):
        if (operation == 'getUserInfo'):
            return self.getUserInfo()




    def post(self, operation):
        if (operation == 'addUser'):
            return self.addUser()
        elif (operation == 'deleteUser'):
            return self.deleteUser()
        elif (operation == 'editUser'):
            return self.editUser()
        elif (operation == 'addExcel'):
            return self.addExcel()

    # 添加用户
    def addUser(self):
        # 获取post的传输数据，并使用utf-8编码为字符串
        requestData = request.data.decode("utf-8")
        # 对jason字符串格式数据，解析为dict格式
        reqDataDict = json.loads(requestData)
        data = []
        for item in reqDataDict.keys():
            data.append(reqDataDict[item])

        sql = 'INSERT INTO tenant(name,building,room,rent,deposit,idcard,check_in,contact,living_number) VALUE (%s,%s,%s,%s,%s,%s,%s,%s,%s)'
        LOG.info(f"sql is : {sql}")
        res = self._common.db.execute(sql, data)
        LOG.info("sql result is : " + str(res))



    # 问题 就是db的不适用性
    def addExcel(self):
        tenant = xlrd.open_workbook(r'D:\house\roomManagement\core\COPY.xlsx')
        sheet = tenant.sheet_by_name("tenant_sheet1")
        for i in range(2, sheet.nrows):
            name = sheet.cell(i, 0).value
            building = sheet.cell(i, 1).value
            room = sheet.cell(i, 2).value
            rent = sheet.cell(i, 3).value
            deposit = sheet.cell(i, 4).value
            idcard = sheet.cell(i, 5).value
            check_in = sheet.cell(i, 6).value
            check_out = sheet.cell(i, 7).value
            contact = sheet.cell(i, 8).value
            living_number = sheet.cell(i, 9).value
            value = (name, building, room, rent, deposit, idcard, check_in, check_out, contact, living_number)
            sql = "INSERT INTO tenant(name, building, room, rent, deposit, idcard, check_in, check_out, contact, living_number) VALUE (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s)"
            LOG.info(f"sql is : {sql}")
            res = self._common.db.execute(sql, value)
            LOG.info("sql result is : " + str(res))


    # 提交的问题
    def deleteUser(self):
        requestData = request.data.decode("utf-8")
        # 对jason字符串格式数据，解析为dict格式
        reqDataDict = json.loads(requestData)
        id = []
        for item in reqDataDict.keys():
            id.append(reqDataDict[item])
        id1 = ''.join(id)
        sql = f"DELETE FROM tenant WHERE id = '{id1}'"
        LOG.info(f"sql is : {sql}")
        res = self._common.db.execute(sql)
        LOG.info("sql result is : " + str(res))

    # 获取id的方法（问题）
    def editUser(self):
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
        name = data[3]
        rent = data[4]
        deposit = data[5]
        idcard = data[6]
        check_in = data[7]
        contact = data[8]
        living_number = data[9]
        sql = f"UPDATE tenant SET name ='{name}',building = '{building}',room = '{room}',rent = '{rent}',deposit = '{deposit}',idcard = '{idcard}',check_in = '{check_in}',contact = '{contact}', living_number = '{living_number}'  WHERE id= '{id}' "
        LOG.info(f"sql is : {sql}")
        res = self._common.db.execute(sql)
        LOG.info("sql result is : " + str(res))

    # 获取用户数据
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



#
api.add_resource(TenantManagement, '/tenant/<operation>')


