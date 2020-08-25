#!/usr/bin/env python3
# -*- coding: utf-8 -*
# @Time : 2020/8/24 11:03 上午
# @Author : lijunhua
# @Email : 634134551@qq.com
# @File : globalAnalysis.py

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
globalAnalysis = Blueprint('GlobalAnalysis', __name__)
api = Api(globalAnalysis)

class GlobalAnalysis(Resource):

    # 构造函数
    def __init__(self):
        # 实例化Common类
        self._common = Common()

    def get(self, operation):
        if (operation == 'allIncome'):
            return self.allIncome()
        elif (operation == 'rentIncome'):
            return self.rentIncome()
        elif (operation == 'allIncomeMon'):
            return self.allIncomeMon()
        elif (operation == 'regionCompar'):
            return self.regionCompar()

    def post(self, operation):
        if (operation == 'allIncome'):
            return self.allIncome()
        elif (operation == 'rentIncome'):
            return self.rentIncome()
        elif (operation == 'allIncomeMon'):
            return self.allIncomeMon()
        elif (operation == 'regionCompar'):
            return self.regionCompar()

    # 某一年全部物业的总收入
    def allIncome(self):
        #这里接入年份选择的数据
        year = request.args.get("yearch")
        s_sql = f"select year ,sum(rent) as sum_rent from monthly where year = '{year}' "
        LOG.info(f"sql is : {s_sql}")
        data1 = self._common.db.execute(s_sql)
        LOG.info("sql result is : " + str(data1))
        data = data1[0]
        return jsonify(data)

    # 房租收入
    def rentIncome(self):
        # 这里接入年份选择的数据
        year = request.args.get("yearch")
        s_sql = f"select year ,sum(rent) as sum_rent from monthly where year = '{year}'"
        LOG.info(f"sql is : {s_sql}")
        data1 = self._common.db.execute(s_sql)
        LOG.info("sql result is : " + str(data1))
        data = data1[0]
        return jsonify(data)

    # 可租房间数
    def roomQuantity(self):
        # 在房屋管理表中获取
        pass

    # 可租铺位
    def shopQuantity(self):
        pass

    # 当前出租率
    def rentalRate(self):
        pass

    # 全部物业总收入中按月收入分析
    def allIncomeMon(self):
        # 这里接入年份选择的数据
        year = request.args.get("yearch")
        m_sql = f'select month ,sum(rent) as sum_rent from monthly where year = "{year}" group by month'
        LOG.info(f"sql is : {m_sql}")
        data1 = self._common.db.execute(m_sql)
        LOG.info("sql result is : " + str(data1))
        data = data1[0]
        return jsonify(data)

    # 收入对比
    def reveCompar(self):
        pass

    # 各区域占比
    def regionCompar(self):
        # 这里接入年份选择的数据
        year = request.args.get("yearch")
        A_sql = f'select year ,sum(rent) as sum_rent from monthly where year = "{year}" group by building'
        LOG.info(f"sql is : {A_sql}")
        data1 = self._common.db.execute(A_sql)
        LOG.info("sql result is : " + str(data1))
        data = data1[0]
        return jsonify(data)

    # 出租率比较
    def renRateCompar(self):
        pass








api.add_resource(GlobalAnalysis, '/globalanalysis/<operation>')