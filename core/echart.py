# noinspection PyUnresolvedReferences
# noinspection PyUnresolvedReferences
import json

# noinspection PyUnresolvedReferences
import pymysql
from flask import Flask, render_template, url_for, jsonify, request
# noinspection PyUnresolvedReferences
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
# noinspection PyUnresolvedReferences
from conf.connection import get_conn
# noinspection PyUnresolvedReferences
from jinja2 import Markup
# noinspection PyUnresolvedReferences
from pyecharts import options as opts
# noinspection PyUnresolvedReferences
from pyecharts.charts import Bar, Grid
app = Flask(__name__, static_folder="templates")

import sys
sys.path.append('D:/house/roomManagement/conf/connection')
print(sys.path)

#选择数据库中A栋的2020年每月数据
def chose_Adata():
    # 连接数据库
    conn = get_conn()
    cur = conn.cursor()
    sql = 'select month,sum(rent) as sum_rent from monthly where building = "A" and year = "2020" group by month'
    cur.execute(sql)
    mon_t = cur.fetchall()
    cur.close()
    conn.close()
    mon_A = []
    # 返回的是A栋每月的income的列表
    for i in range(len(mon_t)):
        mon_A.append(mon_t[i][1])
    return mon_A

#选择数据库中B栋的2020年每月数据
def chose_Bdata():
    conn = get_conn()
    cur = conn.cursor()
    sql = 'select month,sum(rent) as sum_rent from monthly where building = "B" and year = "2020" group by month'
    cur.execute(sql)
    mon_t = cur.fetchall()
    cur.close()
    conn.close()
    # 用于存放B栋每月的数据
    mon_B = []
    # 返回的是B栋每月的income的列表
    for i in range(len(mon_t)):
        mon_B.append(mon_t[i][1])
    return mon_B

#选择数据库中C栋的2020年每月数据
def chose_Cdata():
    conn = get_conn()
    cur = conn.cursor()
    sql = 'select month,sum(rent) as sum_rent from monthly where building = "C" and year = "2020" group by month'
    cur.execute(sql)
    mon_t = cur.fetchall()
    cur.close()
    conn.close()
    # 用于存放C栋每月的数据
    mon_C = []
    # 返回的是C栋每月的income的列表
    for i in range(len(mon_t)):
        mon_C.append(mon_t[i][1])
    return mon_C

#选择数据库中D栋的2020年每月数据
def chose_Ddata():
    conn = get_conn()
    cur = conn.cursor()
    sql = 'select month,sum(rent) as sum_rent from monthly where building = "D" and year = "2020" group by month'
    cur.execute(sql)
    mon_t = cur.fetchall()
    cur.close()
    conn.close()
    # 用于存放D栋每月的数据
    mon_D = []
    # 返回的是B栋每月的income的列表
    for i in range(len(mon_t)):
        mon_D.append(mon_t[i][1])
    return mon_D

def A_draweccharts():

    data_A = chose_Adata()
    data_B = chose_Bdata()
    data_C = chose_Cdata()
    data_D = chose_Ddata()

    bar_A = (
        Bar()
        .add_xaxis(["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"])
        .add_yaxis("A栋每月流水", y_axis=data_A)
        .set_global_opts(title_opts=opts.TitleOpts(title="A栋的去年每月收入", subtitle="每月流水")),
    )

    bar_B = (
        Bar()
        .add_xaxis(["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"])
        .add_yaxis("B栋每月流水", y_axis=data_B)
        .set_global_opts(title_opts=opts.TitleOpts(title="B栋的全年每月收入", subtitle="每月流水"))
    )

    bar_C = (
        Bar()
        .add_xaxis(["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"])
        .add_yaxis("C栋每月流水", y_axis=data_C)
        .set_global_opts(title_opts=opts.TitleOpts(title="C栋的全年每月收入", subtitle="每月流水"))
    )

    bar_D = (
        Bar()
        .add_xaxis(["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"])
        .add_yaxis("D栋每月流水", y_axis=data_D)
        .set_global_opts(title_opts=opts.TitleOpts(title="C栋的全年每月收入", subtitle="每月流水"))
    )
    grid = (
        Grid(init_opts=opts.InitOpts(width="1200px", height="720px"))
        .add(bar_A, grid_opts=opts.GridOpts(pos_bottom="60%", pos_left="60%"))
        .add(bar_B, grid_opts=opts.GridOpts(pos_bottom="60%", pos_right="60%"))
        .add(bar_C, grid_opts=opts.GridOpts(pos_top="60%", pos_left="60%"))
        .add(bar_D, grid_opts=opts.GridOpts(pos_top="60%", pos_right="60%"))
    )
    grid.render()

@app.route("/")
def index():
    A_draweccharts()


if __name__ == "__main__":
    app.run(debug=True, port=2222)