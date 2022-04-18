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
        elif (operation == 'electCompar'):
            return self.electCompar()
        elif (operation == 'waterCompar'):
            return self.waterCompar()
        elif (operation == 'renRateCompar'):
            return self.renRateCompar()
        elif (operation == 'get_current_year'):
            return self.get_current_year()

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
        elif (operation == 'get_current_year'):
            return self.get_current_year()

    # 预测下个月 总收入
    def predictNextMonthIncome(self):
        sql = f"select year, month,sum(rent) as sum_rent from monthly  group by year,month order by year desc,month desc"
        LOG.info(f"sql is : {sql}")
        res = self._common.db.execute(sql)
        predictRent = self._common.predict_average(res)
        return predictRent

    # 预测下个月 纯房租收入
    def predictNextMonthRentIncome(self):
        sql = f"select year, month, sum(rent)-sum(w_c)-sum(e_c) as sum_rent from monthly  group by year,month order by year desc,month desc"
        LOG.info(f"sql is : {sql}")
        res = self._common.db.execute(sql)
        predictRent = self._common.predict_average(res)
        return predictRent

    # 某一年全部物业的总收入
    def allIncome(self):
        year = request.args.get("year")
        s_sql = f"select year ,sum(rent) as sum_rent from monthly where year = '{year}' "
        LOG.info(f"sql is : {s_sql}")
        data1 = self._common.db.execute(s_sql)
        LOG.info("sql result is : " + str(data1))
        allIncome = round((data1[0]['sum_rent'] / 10000),2)
        predictIncome = self.predictNextMonthIncome()
        res = {
            'allIncome' : allIncome,
            'predictIncome' : predictIncome
        }
        return jsonify(res)

    # 房租收入
    def rentIncome(self):
        # 这里接入年份选择的数据
        year = request.args.get("year")
        s_sql = f"select year ,sum(rent)-sum(w_c)-sum(e_c) as sum_rent from monthly where year = '{year}'"
        LOG.info(f"sql is : {s_sql}")
        data1 = self._common.db.execute(s_sql)
        LOG.info("sql result is : " + str(data1))
        rentIncome = round((data1[0]['sum_rent'] / 10000),2)
        predictRent = self.predictNextMonthRentIncome()
        res = {
            'rentIncome' : rentIncome,
            'predictRent' : predictRent
        }
        return jsonify(res)

    # 可租房间数,返回的是一个数字
    def roomQuantity(self):
        year = request.args.get("year")
        B_sql = f"select count(month) as nums from monthly where year = '{year}' and building = 'A' AND room = '101'"
        LOG.info(f"renratecomper sql is : {B_sql}")
        # data1这里返回的是有多少个月
        dat1 = self._common.db.execute(B_sql)
        LOG.info("dat1 : " + str(dat1))
        data1 = dat1[0]
        LOG.info("data1 : " + str(data1))
        month = data1['nums']
        LOG.info("numb : " + str(month))
        A_sql = f"select count(*) as total_room from room_information as a join (select * from monthly where year = '{year}' and month = '{month}') as b on a.building = b.building and a.room = b.room where b.rent != 0 and a.is_shop = 'N';"
        LOG.info(f"sql is : {A_sql}")
        res = self._common.db.execute(A_sql)
        LOG.info("A_sql result is : " + str(res))
        total_room = res[0]['total_room']
        return jsonify(total_room)

    # 可租铺位，返回的是一个数字
    def shopQuantity(self):
        year = request.args.get("year")
        B_sql = f"select count(month) as nums from monthly where year = '{year}' and building = 'A' AND room = '101'"
        LOG.info(f"renratecomper sql is : {B_sql}")
        # data1这里返回的是有多少个月
        dat1 = self._common.db.execute(B_sql)
        LOG.info("dat1 : " + str(dat1))
        data1 = dat1[0]
        LOG.info("data1 : " + str(data1))
        month = data1['nums']
        LOG.info("numb : " + str(month))

        sql = f"select count(*) as tol from room_information as a join (select * from monthly where year = '{year}' and month = '{month}') as b on a.building = b.building and a.room = b.room where b.rent != 0 and a.is_shop = 'Y';"
        LOG.info(f"sql is : {sql}")
        data = self._common.db.execute(sql)
        LOG.info("data : " + str(data))

        dat = data[0]['tol']
        LOG.info("dat : " + str(dat))
        return jsonify(dat)


    #当前出租率
    def rentalRate(self):
        year = request.args.get("year")
        B_sql = f"select count(month) as nums from monthly where year = '{year}' and building = 'A' AND room = '101'"
        LOG.info(f"renratecomper sql is : {B_sql}")
        # data1这里返回的是有多少个月
        dat1 = self._common.db.execute(B_sql)
        LOG.info("dat1 : " + str(dat1))
        data1 = dat1[0]
        LOG.info("data1 : " + str(data1))
        numb = data1['nums']
        LOG.info("numb : " + str(numb))
        A_sql = f'select count(*) as rate_c from (SELECT a.building, a.room, b.rent,a.ext_1 FROM room_information a LEFT JOIN (select * from monthly where month = "{numb}" AND year = "{year}")  b ON a.building = b.building and a.room = b.room ) a where a.rent is not null and a.rent > 0'
        LOG.info(f"rent rate sql is : {A_sql}")
        a = self._common.db.execute(A_sql)
        rate = a[0]
        LOG.info("ratetest111111111111 : " + str(rate))

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
        s_sql = f'select month ,sum(rent)-sum(w_c)-sum(e_c) as sum_rent from monthly where year = "{year}" group by month'
        LOG.info(f"sql is : {s_sql}")
        data1 = self._common.db.execute(s_sql)
        LOG.info("reveComper1111111: " + str(data1))
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
        LOG.info(f"renratecomper sql is : {B_sql}")
        # data1这里返回的是有多少个月
        dat1 = self._common.db.execute(B_sql)
        LOG.info("dat1 : " + str(dat1))
        data1 = dat1[0]
        LOG.info("data1 : " + str(data1))
        numb = data1['nums']
        LOG.info("numb : " + str(numb))
        rate = []
        for i in range(numb):
            A_sql = f'select count(*) as rate_c from (SELECT a.building, a.room, b.rent,a.ext_1 FROM room_information a LEFT JOIN (select * from monthly where month = "{i+1}" AND year = "{year}")  b ON a.building = b.building and a.room = b.room ) a where a.rent is not null and a.rent > 0'
            LOG.info(f"rent rate sql is : {A_sql}")
            a = self._common.db.execute(A_sql)
            rent_rate = a[0]
            rate.append(rent_rate)
        LOG.info("ratetest111111111111 : " + str(rate))

        return jsonify(rate)

    # 电费对比
    def electCompar(self):
        year = request.args.get("year")
        sql = f'select month ,sum(e_c) as sum_rent from monthly where year = "{year}" group by month'
        LOG.info(f"electricity sql is : {sql}")
        res = self._common.db.execute(sql)
        LOG.info("electCompar : " + str(res))
        #下面代码用来表示下年数据的
        return jsonify(res)

    # 水费对比
    def waterCompar(self):
        year = request.args.get("year")
        sql = f'select month ,sum(w_c) as sum_rent from monthly where year = "{year}" group by month'
        LOG.info(f"water sql is : {sql}")
        res = self._common.db.execute(sql)
        LOG.info("waterCompar : " + str(res))
        # 下面代码用来表示下年数据的
        return jsonify(res)




api.add_resource(GlobalAnalysis, '/globalanalysis/<operation>')