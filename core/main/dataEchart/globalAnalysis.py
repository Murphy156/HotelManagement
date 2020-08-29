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
        elif (operation == 'roomQuantity'):
            return self.roomQuantity()
        elif (operation == 'shopQuantity'):
            return self.shopQuantity()
        elif (operation == 'rentalRate'):
            return self.rentalRate()
        elif (operation == 'reveCompar'):
            return self.reveCompar()
        elif (operation == 'renRateCompar'):
            return self.renRateCompar()

    def post(self, operation):
        if (operation == 'allIncome'):
            return self.allIncome()
        elif (operation == 'rentIncome'):
            return self.rentIncome()
        elif (operation == 'allIncomeMon'):
            return self.allIncomeMon()
        elif (operation == 'regionCompar'):
            return self.regionCompar()
        elif (operation == 'roomQuantity'):
            return self.roomQuantity()
        elif (operation == 'shopQuantity'):
            return self.shopQuantity()
        elif (operation == 'rentalRate'):
            return self.rentalRate()
        elif (operation == 'reveCompar'):
            return self.reveCompar()
        elif (operation == 'renRateCompar'):
            return self.renRateCompar()

    # 某一年全部物业的总收入
    def allIncome(self):
        #这里接入年份选择的数据
        year = request.args.get("year")
        s_sql = f"select year ,sum(rent) as sum_rent from monthly where year = '{year}' "
        LOG.info(f"sql is : {s_sql}")
        data1 = self._common.db.execute(s_sql)
        LOG.info("sql result is : " + str(data1))
        data = data1[0]
        return jsonify(data)

    # 房租收入
    def rentIncome(self):
        # 这里接入年份选择的数据
        year = request.args.get("year")
        s_sql = f"select year ,sum(ref_rent) as sum_rent from monthly where year = '{year}'"
        LOG.info(f"sql is : {s_sql}")
        data1 = self._common.db.execute(s_sql)
        LOG.info("sql result is : " + str(data1))
        data = data1[0]
        return jsonify(data)

    # 可租房间数,返回的是一个数字
    def roomQuantity(self):
        # 取A栋的房间数
        A_sql = f"select count(building) from room_information where building = 'A'"
        LOG.info(f"sql is : {A_sql}")
        data1 = self._common.db.execute(A_sql)
        LOG.info("A_sql result is : " + str(data1))
        a = data1[0]
        dat1 = a['count(building)']
        LOG.info("dat1  : " + str(dat1))
        # 取B栋的房间数
        B_sql = f"select count(building) from room_information where building = 'B'"
        LOG.info(f"sql is : {B_sql}")
        data2 = self._common.db.execute(B_sql)
        LOG.info("B_sql result is : " + str(data2))
        b = data2[0]
        dat2 = b['count(building)']
        LOG.info("dat2 : " + str(dat2))
        # 取C栋的房间数
        D_sql = f"select count(building) from room_information where building = 'D'"
        LOG.info(f"sql is : {D_sql}")
        data3 = self._common.db.execute(D_sql)
        LOG.info("D_sql result is : " + str(data3))
        c = data3[0]
        dat3 = c['count(building)']
        LOG.info("dat3 : " + str(dat3))
        sum = dat1+dat2+dat3
        LOG.info("sum : " + str(sum))
        return jsonify(sum)

    # 可租铺位，返回的是一个数字
    def shopQuantity(self):
        sql = f"select count(building) from room_information where building = 'C'"
        LOG.info(f"sql is : {sql}")
        data = self._common.db.execute(sql)
        LOG.info("data : " + str(data))
        c = data[0]
        dat = c['count(building)']
        LOG.info("dat : " + str(dat))
        return jsonify(dat)

    # 当前出租率
    def rentalRate(self):
        # 这里计算的是已经出租的房间数
        A_sql = f"select count(building) from room_information where state = 'on' "
        LOG.info(f"sql is : {A_sql}")
        data1 = self._common.db.execute(A_sql)
        LOG.info("data1 : " + str(data1))
        a = data1[0]
        dat1 = a['count(building)']
        LOG.info("dat1 : " + str(dat1))
        # 这里计算的是全部的房间数
        B_sql = f"select count(building) from room_information "
        LOG.info(f"sql is : {B_sql}")
        data2 = self._common.db.execute(B_sql)
        LOG.info("data2 : " + str(data2))
        b = data2[0]
        dat2 = b['count(building)']
        LOG.info("dat2 : " + str(dat2))
        # 这里计算的是出租率
        rat = dat1/dat2*100
        LOG.info("rat : " + str(rat))
        rat1 = round(rat)
        rate = str(rat1) + '%'
        LOG.info("rate : " + str(rate))
        return jsonify(rate)

    # 全部物业总收入中按月收入分析
    def allIncomeMon(self):
        # 这里接入年份选择的数据
        year = request.args.get("year")
        m_sql = f'select month ,sum(rent) as sum_rent from monthly where year = "{year}" group by month'
        LOG.info(f"sql is : {m_sql}")
        data1 = self._common.db.execute(m_sql)
        LOG.info("sql result is : " + str(data1))
        return jsonify(data1)

    # 收入对比
    def reveCompar(self):
        year = request.args.get("year")
        s_sql = f'select month ,sum(rent) as sum_rent from monthly where year = "{year}" group by month'
        LOG.info(f"sql is : {s_sql}")
        data1 = self._common.db.execute(s_sql)
        LOG.info("data1 : " + str(data1))
        #下面代码用来表示下年数据的
        return jsonify(data1)

    # 各区域占比
    def regionCompar(self):
        # 这里接入年份选择的数据
        year = request.args.get("year")
        A_sql = f'select year ,sum(rent) as sum_rent from monthly where year = "{year}" group by building'
        LOG.info(f"sql is : {A_sql}")
        data1 = self._common.db.execute(A_sql)
        LOG.info("sql result is : " + str(data1))
        return jsonify(data1)

    # 出租率比较
    def renRateCompar(self):
        year = request.args.get("year")
        B_sql = f"select count(month) as nums from monthly where year = '{year}' and building = 'A' AND room = '101'"
        LOG.info(f"sql is : {B_sql}")
        # data1这里返回的是有多少个月
        dat1 = self._common.db.execute(B_sql)
        LOG.info("dat1 : " + str(dat1))
        data1 = dat1[0]
        LOG.info("data1 : " + str(data1))
        numb = data1['nums']
        LOG.info("numb : " + str(numb))
        #

        rate = []
        for i in range(numb):
            A_sql = f'select count(*) as rate_c from (SELECT a.building, a.room, b.rent,a.ext_1 FROM room_information a LEFT JOIN (select * from monthly where month = "{i+1}" AND year = "{year}")  b ON a.building = b.building and a.room = b.room ) a where a.rent is not null  '
            a = self._common.db.execute(A_sql)
            rate.append(a[0])
        LOG.info("rate : " + str(rate))

        return jsonify(rate)








api.add_resource(GlobalAnalysis, '/globalanalysis/<operation>')