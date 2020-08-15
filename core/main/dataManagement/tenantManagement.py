#!/usr/bin/env python3
# -*- coding: utf-8 -*
# @Time : 2020/8/14 10:41 上午 
# @Author : lishuohua
# @Email : shuohualee@126.com
# @File : tenantManagement.py

from flask import Flask, request,jsonify
from flask import Blueprint
from flask_restful import Resource, Api

from core.main.utils.db.db_helper import *
from core.main.utils.common import Common
import logging.config
logging.config.fileConfig("../conf/logging.conf")
LOG = logging.getLogger(name="rotatingFileLogger")

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

    def __init__(self):
        self._common = Common()

    def get(self,operation):
        if (operation == 'getUserInfo'):
            return self.getUserInfo()

    def post(self):
        pass

    # 获取用户信息
    def getUserInfo(self):
        region = request.args.get("region")
        room = request.args.get("roomNum")

        whereStr = "where 1 = 1 "
        if (not region is None) and (region != '') and (region != '所有'):
            whereStr += f"and building = '{region}'"
        if (not room is None) and (room != ''):
            whereStr += f"and room = '{room}'"

        sql = f"select * from tenant {whereStr}"
        LOG.info(f"sql is : {sql}")
        res = self._common.db.execute(sql)

        LOG.info("sql result is : " + str(res))
        outputData = self.formatUserInfoOutput(res)
        return jsonify(outputData)

    def formatUserInfoOutput(self,userInfo):
        rows = []
        for user in userInfo:
            user['CreateTime'] = str(user['CreateTime'])
            row = {}
            for key,value in USREINFO_HEADER.items():
                row[key] = user[key]
            rows.append(row)

        outputData = {
            'header' : USREINFO_HEADER,
            'body' : rows
        }
        return outputData


api.add_resource(TenantManagement, '/tenant/<operation>')


