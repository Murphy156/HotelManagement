#!/usr/bin/env python3
# -*- coding: utf-8 -*
# @Time : 2021/5/3 下午9:34 
# @Author : lishuohua
# @Email : shuohualee@126.com
# @File : exception_income_check.py 

from core.main.utils.db.db_helper import *
import yaml
import logging.config

logging.config.fileConfig("../../conf/logging.conf")
LOG = logging.getLogger(name="rotatingFileLogger")

'''
将查询的结果转为 Dict(K-V) 存储
'''
def format_rs(res):
    ret = {}
    for rs in res:
        key = f"{rs['building']}_{rs['room']}"
        ret[key] = {}
        ret[key]['wc'] = rs['w_c']
        ret[key]['ec'] = rs['e_c']
        ret[key]['ref_rent'] = rs['ref_rent']
        ret[key]['rent'] = rs['rent']
    return ret


'''
计算本月和上个月的差值
'''
def cal_gap(now_rs, before_rs):
    if int(before_rs) <= 0:
        LOG.info("before month value is empty! return ")
        return 0
    gap = round((abs(int(now_rs) - int(before_rs)) / int(before_rs)), 4)
    # LOG.info(f"gap info : now_value : {now_rs}, before_value : {before_rs}, gap : {round(gap * 100, 2)}%")
    return gap


if __name__ == '__main__':
    configFile = open('../../conf/config.yaml')
    conf = yaml.load(configFile, Loader=yaml.FullLoader)
    db_conf = conf['db_conf']

    # 实例化DB连接
    db_conn = DbObject(db_conf)

    # 入参
    now_month = '5'
    before_month = '4'

    # 获取本月数据
    sql = f"select building,room,w_c,e_c,ref_rent,rent from monthly where year = '2021' and month = '{now_month}'"
    LOG.info(f"SQL  : {sql}")
    now_month_res = db_conn.execute(sql)
    format_now_month_res = format_rs(now_month_res)

    # 获取上月数据
    sql = f"select building,room,w_c,e_c,ref_rent,rent from monthly where year = '2021' and month = '{before_month}'"
    LOG.info(f"SQL  : {sql}")
    before_month_res = db_conn.execute(sql)
    format_before_month_res = format_rs(before_month_res)

    for key,value in format_now_month_res.items():
        # 按房间 计算每月总收入与上个月的gap，超过阈值则输出
        rent_gap = cal_gap(value['rent'], format_before_month_res[key]['rent'])
        if rent_gap > 0.1:
            LOG.info(f"room : {key}, now_month : {value['rent']}, before_month : {format_before_month_res[key]['rent']}, gap : {round(rent_gap * 100, 2)}%")
        # exit(1)




