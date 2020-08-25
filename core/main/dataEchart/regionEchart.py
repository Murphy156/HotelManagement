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
        elif (operation == 'yearIncome_bar'):
            return self.yearIncome_bar()
        elif (operation == 'reture_month'):
            return self.reture_month()
        elif (operation == 'allMonth'):
            return self.allMonth()
        elif (operation == 'monWater'):
            return self.monWater()
        elif (operation == 'monelec'):
            return self.monelec()
        elif (operation == 'aveHousePri'):
            return self.aveHousePri()
        elif (operation == 'regMonInc'):
            return self.regMonInc()
        elif (operation == 'incClafi'):
            return self.incClafi()
        elif (operation == 'electClafi'):
            return self.electClafi()
        elif (operation == 'wateClafi'):
            return self.wateClafi()



    def post(self, operation):
        if (operation == 'yearIncome'):
            return self.yearIncome()
        elif (operation == 'yearIncome_bar'):
            return self.yearIncome_bar()
        elif (operation == 'reture_month'):
            return self.reture_month()
        elif (operation == 'allMonth'):
            return self.allMonth()
        elif (operation == 'monWater'):
            return self.monWater()
        elif (operation == 'monelec'):
            return self.monelec()
        elif (operation == 'aveHousePri'):
            return self.aveHousePri()
        elif (operation == 'regMonInc'):
            return self.regMonInc()
        elif (operation == 'incClafi'):
            return self.incClafi()
        elif (operation == 'electClafi'):
            return self.electClafi()
        elif (operation == 'wateClafi'):
            return self.wateClafi()


    # 某区域的年总收入数值
    def yearIncome(self):
        # 注意这里接收前端返回的年份和区域号
        region = request.args.get("region")
        year = request.args.get("year")
        m_sql = f'select year ,sum(rent) as sum_rent from monthly where building = "{region}" AND year = "{year}"'
        LOG.info(f"sql is : {m_sql}")
        data1 = self._common.db.execute(m_sql)
        LOG.info("sql result is : " + str(data1))
        data = data1[0]
        LOG.info("data : " + str(data))
        return jsonify(data)


    # 某区域的年总收入bar
    def yearIncome_bar(self):
        # 这里取出来的是哪一年，哪个区域全年总收入
        region = request.args.get("region")
        year = request.args.get("year")
        s_sql = f'select month ,sum(rent) as sum_rent from monthly where building = "{region}" and year = "{year}" group by month'
        LOG.info(f"sql is : {s_sql}")
        data2 = self._common.db.execute(s_sql)
        LOG.info("sql result is : " + str(data2))
        data = data2[0]
        return jsonify(data)

    # 返回当前月份
    def reture_month(self):
        # 要传入年，月，区域参数
        # 返回month当前列的最大值
        # 这里要加一个年份的数据选择
        year = request.args.get("year")
        M_sql = f'select month from monthly where year = "{year}" order by month desc limit 1'
        LOG.info(f"sql is : {M_sql}")
        data1 = self._common.db.execute(M_sql)
        a = data1[0]
        #data2返回的是当月月份值
        data2 = []
        for item in a.keys():
            data2.append(a[item])
        LOG.info("sql result is : " + str(data2))
        return data2

    # 返回的是某区域当月的总收入
    def allMonth(self):
        # 返回区域的当月总收入 ,还要从前端获取一个building的值
        data2 = self.reture_month
        region = request.args.get("region")
        A_sql = f"select month ,sum(rent) as sum_rent from monthly where month = '{data2}' and building = '{region}' "
        LOG.info(f"sql is : {A_sql}")
        #data3返回的是当月的总收入
        data3 = self._common.db.execute(A_sql)
        LOG.info("sql result is : " + str(data3))
        data = data3[0]
        return jsonify(data)

    # 返回的是某区域当月的水费
    def monWater(self):
        data2 = self.reture_month
        region = request.args.get("region")
        w_sql = f"select month ,sum(w_c) as sum_w_c from monthly where month = '{data2}' and building = '{region}' "
        LOG.info(f"sql is : {w_sql}")
        #data4返回的是当月的水费
        data4 = self._common.db.execute(w_sql)
        LOG.info("sql result is : " + str(data4))
        data = data4[0]
        return jsonify(data)

    # 返回的是某区域当月的电费
    def monelec(self):
        data2 = self.reture_month
        region = request.args.get("region")
        e_sql = f"select month ,sum(e_c) as sum_e_c from monthly where month = '{data2}' and building = '{region}' "
        LOG.info(f"sql is : {e_sql}")
        # data5返回的是当月的电费
        data5 = self._common.db.execute(e_sql)
        LOG.info("sql result is : " + str(data5))
        data = data5[0]
        return jsonify(data)

    #某区域的房间均价
    def aveHousePri(self):
        # 挑选某一区域，某个年月的均价,要传入年，月，区域参数
        region = request.args.get("region")
        month = request.args.get("month")
        year = request.arg.get("year")
        a_sql = f"select avg(rent) from monthly where building = '{region}' AND month = '{month}' AND year = '{year}'"
        LOG.info(f"sql is : {a_sql}")
        #这里的data返回的是某一年，月，区域的平均房价
        data1 = self._common.db.execute(a_sql)
        LOG.info("sql result is : " + str(data1))
        data = data1[0]
        return jsonify(data)
    # 可出租房间数
    def kechuzu(self):
        pass

    #某区域某年按月总收入
    def regMonInc(self):
        # 这里执行的是某年，某区域全年的按月总收入数据，输入年份 区域参数
        region = request.args.get("region")
        year = request.arg.get("year")
        sql = f'select month ,sum(rent) as sum_rent from monthly where building = "{region}" AND year = "{year}" group by month'
        LOG.info(f"sql is : {sql}")
        # 这里的data返回的是某一年，某区域的按月总收入
        data1 = self._common.db.execute(sql)
        LOG.info1("sql result is : " + str(data1))
        data = data1[0]
        return jsonify(data)

    #某年某区域的收入分类比
    def incClafi(self):
        # 这里返回的是，某年，某区域每月的房租收入，传入区域和年份
        region = request.args.get("region")
        year = request.arg.get("year")
        A_sql = f'select month ,sum(rent) as sum_rent from monthly where building = "{region}" AND year = "{year}" group by month'
        LOG.info(f"sql is : {A_sql}")
        # 这里的data返回的是某一年，某区域的按月总收入
        data1 = self._common.db.execute(A_sql)
        LOG.info("sql result is : " + str(data1))
        data = data1[0]
        return jsonify(data)

    # 这里返回的还是，某年，某区域每月的电费收入，传入区域和年份
    def electClafi(self):
        region = request.args.get("region")
        year = request.arg.get("year")
        e_sql = f'select month ,sum(e_c) as sum_e_c from monthly where building = "{region}" AND year = "{year}" group by month'
        LOG.info(f"sql is : {e_sql}")
        # 这里的data返回的是某一年，某区域的按月电费收入
        data2 = self._common.db.execute(e_sql)
        LOG.info("sql result is : " + str(data2))
        data = data2[0]
        return jsonify(data)

    # 这里返回的还是，某年，某区域每月的水费收入，传入区域和年份
    def wateClafi(self):
        region = request.args.get("region")
        year = request.arg.get("year")
        w_sql = f'select month ,sum(w_c) as sum_w_c from monthly where building = "{region}" AND year = "{year}" group by month'
        LOG.info(f"sql is : {w_sql}")
        # 这里的data返回的是某一年，某区域的按月水费收入
        data3 = self._common.db.execute(w_sql)
        LOG.info("sql result is : " + str(data3))
        data = data3[0]
        return jsonify(data)



api.add_resource(RegionEchart, '/region/<operation>')