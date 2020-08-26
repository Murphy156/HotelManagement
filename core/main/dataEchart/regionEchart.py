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
        m_sql = f'select year ,sum(rent) as sum_rent from monthly where building = "{region}" AND year = "{year}"'
        LOG.info(f"sql is : {m_sql}")
        data1 = self._common.db.execute(m_sql)
        LOG.info("sql result is : " + str(data1))
        # 这里返回的是某一区域，某一年的全年收入按月分配
        s_sql = f'select month ,sum(rent) as sum_rent from monthly where building = "{region}" and year = "{year}" group by month'
        LOG.info(f"sql is : {s_sql}")
        data2 = self._common.db.execute(s_sql)
        LOG.info("sql result is : " + str(data2))
        data = data1 + data2
        LOG.info("sql result is : " + str(data))
        #data = data1[0]
        #LOG.info("data : " + str(data))
        return jsonify(data)

    # 返回的是某区域当月的总收入------------------------------------------------------------------------------------（实现函数）
    def allMonth(self):
        # 返回区域的当月总收入 ,还要从前端获取一个building的值
        #data2 = self.reture_month
        year = request.args.get("year")
        region = request.args.get("region")
        # 返回当前的月份
        M_sql = f'select month from monthly where year = "{year}" order by month desc limit 1'
        LOG.info(f"sql is : {M_sql}")
        data1 = self._common.db.execute(M_sql)
        a = data1[0]
        data2 = []
        for item in a.keys():
            data2.append(a[item])
        data = data2[0]

        # data3返回的是当月的总收入
        A_sql = f"select month ,sum(rent) as mon_rent from monthly where month = '{data}' and building = '{region}' "
        LOG.info(f"sql is : {A_sql}")
        data3 = self._common.db.execute(A_sql)
        LOG.info("data3 : " + str(data3))

        # data4返回的是某区域当月的水费
        w_sql = f"select month ,sum(w_c) as sum_w_c from monthly where month = '{data}' and building = '{region}' "
        LOG.info(f"sql is : {w_sql}")
        data4 = self._common.db.execute(w_sql)
        LOG.info("data4 : " + str(data4))

        # data5返回的是某区域当月的电费
        e_sql = f"select month ,sum(e_c) as sum_e_c from monthly where month = '{data}' and building = '{region}' "
        LOG.info(f"sql is : {e_sql}")
        data5 = self._common.db.execute(e_sql)
        LOG.info("data5 : " + str(data5))
        data = data3 + data4 + data5
        LOG.info("data : " + str(data))
        return jsonify(data)

    #某区域的房间均价----------------------------------------------------------------------------------------------(实现函数)
    def aveHousePri(self):
        # 挑选某一区域，某个年月的均价,要传入年，月，区域参数
        region = request.args.get("region")
        month = request.args.get("month")
        year = request.args.get("year")
        a_sql = f"select avg(rent) from monthly where building = '{region}' AND month = '{month}' AND year = '{year}'"
        LOG.info(f"sql is : {a_sql}")
        #这里的data返回的是某一年，月，区域的平均房价
        data1 = self._common.db.execute(a_sql)
        LOG.info("data1 : " + str(data1))
        dat = data1[0]
        data = dat['avg(rent)']
        return jsonify(data)

    # 可出租房间数
    def roomNumb(self):
        region = request.args.get("region")
        sql = f"select count(building) from room_information where state = 'on' and building = '{region}' "
        LOG.info(f"sql is : {sql}")
        data = self._common.db.execute(sql)
        LOG.info("data : " + str(data))
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
        rat = dat2 / dat1
        LOG.info("rat : " + str(rat))
        rate = str(rat * 100) + '%'
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
        A_sql = f'select month ,sum(rent) as sum_rent from monthly where building = "{region}" AND year = "{year}" group by month'
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