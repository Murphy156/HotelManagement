#!/usr/bin/env python3
# -*- coding: utf-8 -*
# @Time : 2020/8/14 3:58 下午 
# @Author : lishuohua
# @Email : shuohualee@126.com
# @File : test.py 


from core.main.utils.common import Common
import logging.config
import yaml
logging.config.fileConfig("../conf/logging.conf")
LOG = logging.getLogger(name="rotatingFileLogger")



conf = yaml.load(open('../conf/config.yaml'), Loader=yaml.FullLoader)


list1 = ["101", "102", "201", "202", "301", "302", "401", "402", "501", "502"]

dict1 = {}
for i in range(len(list1)):
    dict1[i] = list1[i]

print(dict1)