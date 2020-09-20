#!/usr/bin/env python3
# -*- coding: utf-8 -*
# @Time : 2020/8/24 10:11 上午
# @Author : lijunhua
# @Email : 634134551@qq.com
# @File : regionEchart.py

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
regionEchart = Blueprint('RegionEchart ', __name__)
api = Api(regionEchart)

class RegionEchart(Resource):

    def __init__(self):
        # 实例化Common类
        self._common = Common()

    def get(self, operation):
        if (operation == 'yearIncome'):
            return self.yearIncome()
        elif (operation == 'allMonth'):
            return self.allMonth()
        elif (operation == 'aveHousePri'):
            return self.aveHousePri()
        elif (operation == 'regMonInc'):
            return self.regMonInc()
        elif (operation == 'incClafi'):
            return self.incClafi()
        elif (operation == 'roomNumb'):
            return self.roomNumb()
        elif (operation == 'roRentRate'):
            return self.roRentRate()



    def post(self, operation):
        if (operation == 'yearIncome'):
            return self.yearIncome()
        elif (operation == 'allMonth'):
            return self.allMonth()
        elif (operation == 'aveHousePri'):
            return self.aveHousePri()
        elif (operation == 'regMonInc'):
            return self.regMonInc()
        elif (operation == 'incClafi'):
            return self.incClafi()
        elif (operation == 'roomNumb'):
            return self.roomNumb()
        elif (operation == 'roRentRate'):
            return self.roRentRate()


    # 某区域的年总收入数值-----------------------------------------------------------------------------------------（实现函数）
    def yearIncome(self):
        # 注意这里接收前端返回的年份和区域号
        region = request.args.get("region")
        year = request.args.get("year")
        # 这里返回的是某一区域，某一年的全年总收入
        sumIncomeSql = f'select sum(rent) as sum_rent from monthly where building = "{region}" AND year = "{year}"'
        LOG.info(f"sql is : {sumIncomeSql}")
        sumIncome = self._common.db.execute(sumIncomeSql)
        LOG.info("sql result is : " + str(sumIncome))
        res = sumIncome[0]['sum_rent']
        return jsonify(res)

    # 返回的是某区域当月的总收入------------------------------------------------------------------------------------（实现函数）
    def allMonth(self):
        region = request.args.get("region")
        year = request.args.get("year")
        month = request.args.get("month")
        #返回的是当月的总收入、电费总收入、水费总收入
        A_sql = f"select sum(rent) as total_rent, sum(ref_rent) as rent_income, sum(w_c) as sum_w_c, sum(e_c) as sum_e_c from monthly where year = '{year}' and month = '{month}' and building = '{region}' "
        LOG.info(f"sql is : {A_sql}")
        res = self._common.db.execute(A_sql)
        LOG.info("data : " + str(res))
        monthlyIncome = res[0]
        return jsonify(monthlyIncome)

    #某区域的房间均价----------------------------------------------------------------------------------------------(实现函数)
    def aveHousePri(self):
        # 挑选某一区域，某个年月的均价,要传入年，月，区域参数
        region = request.args.get("region")
        month = request.args.get("month")
        year = request.args.get("year")

        # 改区域房屋平均租金
        a_sql = f"select avg(ref_rent) as avg_rent from monthly where  building = '{region}' and month = '{month}' and year = '{year}'"
        LOG.info(f"sql is : {a_sql}")
        avgRoomPrice = self._common.db.execute(a_sql)
        LOG.info("data1 : " + str(avgRoomPrice))
        avgRoomPrice = round(avgRoomPrice[0]['avg_rent'],2)

        # 当月房租平均收入
        sql = f"select avg(rent) as avg_income from monthly where  building = '{region}' and month = '{month}' and year = '{year}'"
        LOG.info(f"sql is : {sql}")
        avgRoomIncome = self._common.db.execute(sql)
        LOG.info("avgRoomIncome : " + str(avgRoomIncome))
        avgRoomIncome = round(avgRoomIncome[0]['avg_income'], 2)

        res = {
            'avgRoomPrice' : avgRoomPrice,
            'avgRoomIncome' : avgRoomIncome
        }
        return jsonify(res)

    # 可出租房间数
    def roomNumb(self):
        region = request.args.get("region")
        sql = f"select count(building) from room_information where state = 'on' and building = '{region}' "
        LOG.info(f"sql is : {sql}")
        roomNum = self._common.db.execute(sql)
        LOG.info("data : " + str(roomNum))
        data = roomNum[0]
        return jsonify(data)

    # 房屋出租率
    def roRentRate(self):
        region = request.args.get("region")
        # 这里取出的是某区域的全部房间数
        A_sql = f"select count(building) from room_information where building = '{region}'"
        LOG.info(f"sql is : {A_sql}")
        data1 = self._common.db.execute(A_sql)
        LOG.info("data1 : " + str(data1))
        a = data1[0]
        dat1 = a['count(building)']
        LOG.info("dat1 : " + str(dat1))
        # 这里取出的是某区域现在在租的房间数
        B_sql = f"select count(building) from room_information where state = 'on' and building = '{region}' "
        LOG.info(f"sql is : {B_sql}")
        data2 = self._common.db.execute(B_sql)
        LOG.info("data1 : " + str(data2))
        b = data2[0]
        dat2 = b['count(building)']
        LOG.info("dat2 : " + str(dat2))
        # 这里是计算出租率的
        rat = dat2 / dat1*100
        LOG.info("rat : " + str(rat))
        rat1 = round(rat)
        rate = str(rat1) + '%'
        LOG.info("rate : " + str(rate))
        return jsonify(rate)



    #某区域某年按月总收入-------------------------------------------------------------------------------------------(实现函数)
    def regMonInc(self):
        # 这里执行的是某年，某区域全年的按月总收入数据，输入年份 区域参数
        region = request.args.get("region")
        year = request.args.get("year")
        s_sql = f'select month ,sum(rent) as sum_rent from monthly where building = "{region}" and year = "{year}" group by month'
        LOG.info(f"sql is : {s_sql}")
        data = self._common.db.execute(s_sql)
        LOG.info("sql result is : " + str(data))
        return jsonify(data)

    #某年某区域的收入分类比-----------------------------------------------------------------------------------------(实现函数)
    def incClafi(self):
        # 这里返回的是，某年，某区域每月的房租收入，传入区域和年份
        region = request.args.get("region")
        year = request.args.get("year")
        A_sql = f'select month ,sum(ref_rent) as sum_rent from monthly where building = "{region}" AND year = "{year}" group by month'
        LOG.info(f"sql is : {A_sql}")
        # 这里的data返回的是某一年，某区域的按月总收入
        data1 = self._common.db.execute(A_sql)
        LOG.info("data1 : " + str(data1))
        e_sql = f'select month ,sum(e_c) as sum_e_c from monthly where building = "{region}" AND year = "{year}" group by month'
        LOG.info(f"sql is : {e_sql}")
        data2 = self._common.db.execute(e_sql)
        LOG.info("data2 : " + str(data2))
        w_sql = f'select month ,sum(w_c) as sum_w_c from monthly where building = "{region}" AND year = "{year}" group by month'
        LOG.info(f"sql is : {w_sql}")
        data3 = self._common.db.execute(w_sql)
        LOG.info("data3 : " + str(data3))
        data = data1 + data2 + data3
        LOG.info("data : " + str(data))
        return jsonify(data)



api.add_resource(RegionEchart, '/region/<operation>')