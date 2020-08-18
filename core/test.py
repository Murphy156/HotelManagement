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
common = Common()

sql = "insert into lsh_test(name) values ('test')"
common.db.execute(sql)


