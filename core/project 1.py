#!/usr/bin/env python3
# -*- coding: utf-8 -*

# noinspection PyUnresolvedReferences

from flask_sqlalchemy import SQLAlchemy
from flask import Flask, render_template, request
# noinspection PyUnresolvedReferences
import pymysql
import sys
# sys.path.append('D:/house/roomManagement/conf/connection')
sys.path.append('../conf/connection')
print(sys.path)


from conf.connection import get_conn

app = Flask(__name__, template_folder='templates/')

class DataStore():
    a = None
data = DataStore()


# @app.route('/tenantIn', methods=['GET'])
# def op_tenant():
#     return render_template('tenant_in.html')

# @app.route('/roomIn', methods=['GET'])
# def op_room():
#     return render_template('room_in.html')

# 首页 自动跳转到每月流水录入模块
@app.route('/', methods=['GET'])
def index():
    return op_month()

# 显示每月流水的html
@app.route('/monthIn', methods=['GET'])
def op_month():
    return render_template('monthly_in.html')

# 将每月流水的值post上去
@app.route('/monthIn', methods=['POST'])
def add_monthly():
    data.a = id
    name = request.form['name']
    building = request.form['building']
    room = request.form['room']
    water = request.form['water']
    # w_c = request.form['w_c']
    w_c = 1
    electricity = request.form['electricity']
    # e_c = request.form['e_c']
    e_c = 2
    # ref_rent = request.form['ref_rent']
    ref_rent = 100
    rent = request.form['rent']
    # year = request.form['year']
    year = 100
    # month = request.form['month']
    month = 11
    ext_1 = request.form['ext_1']
    ext_2 = request.form['ext_2']
    try:
        conn = get_conn()
        cur = conn.cursor()  # 生成游标对象
        sql = "INSERT INTO monthly(name, building, room, water, w_c,electricity, e_c, ref_rent, rent, year, month, ext_1, ext_2) VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s)",(name, building, room, water, w_c,electricity, e_c, ref_rent, rent, year, month, ext_1, ext_2)
        try:
            # 执行sql语句
            cur.execute(*sql)
            # 提交到数据库执行
            conn.commit()
        except:
            # 如果发生错误则回滚
            conn.rollback()

        v_sql = "SELECT * FROM monthly WHERE 'id' = %s" % data.a
        cur.execute(v_sql)
        u = cur.fetchall()
        conn.close()
        return render_template('monthly_show.html', u=u)
        conn.close()
    except:
        return render_template('monthly_in.html', message='input successfully', var1=name, var2=building, var3=room, var4=water, var5=w_c, var6=electricity, var7=e_c,var8=ref_rent, var9=rent,var10=year, var11=month,var12=ext_1, var13=ext_2)

# 显示录入房屋信息的页面
@app.route('/roomIn', methods=['GET'])
def op_room():
    return render_template('room_in.html')

# 将房屋信息POST上去
@app.route('/roomIn', methods=['POST'])
def add_room():
    data.a = id
    building = request.form['building']
    room = request.form['room']
    area = request.form['area']
    air_condition = request.form['air_condition']
    heater = request.form['heater']
    other = request.form['other']
    rent = request.form['rent']
    remark = request.form['remark']
    ext_1 = request.form['ext_1']
    ext_2 = request.form['ext_2']
    try:
        conn = get_conn()
        cur = conn.cursor()  # 生成游标对象
        sql = "INSERT INTO room_information(building,room, area, air_condition, heater, other, rent, remark, ext_1, ext_2) VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s)",(building,room, area, air_condition, heater, other, rent, remark, ext_1, ext_2)
        try:
            # 执行sql语句
            cur.execute(*sql)
            # 提交到数据库执行
            conn.commit()
        except:
            # 如果发生错误则回滚
            conn.rollback()

        v_sql = "SELECT * FROM room_information WHERE 'id' = %s" % data.a
        cur.execute(v_sql)
        u = cur.fetchall()
        conn.close()
        return render_template('room_show.html', u=u)
        conn.close()
    except:
        return render_template('room_in.html', message='input successfully', var1=building, var2=room, var3=area, var4=air_condition, var5=heater, var6=other, var7=rent, var8=remark, var9=ext_1, var10=ext_2)

# 显示录入房客的页面
@app.route('/tenantIn', methods=['GET'])
def op_tenant():
    return render_template('tenant_in.html')

# 将房客信息POST上去
@app.route('/tenantIn', methods=['POST'])
def add_tenant():
    data.a = id
    name = request.form['name']
    room = request.form['room']
    rent = request.form['rent']
    deposit = request.form['deposit']
    idcard = request.form['idcard']
    check_in = request.form['check_in']
    check_out = request.form['check_out']
    contact = request.form['contact']
    living_number = request.form['living_number']
    ext_1 = request.form['ext_1']
    ext_2 = request.form['ext_2']
    try:
        conn = get_conn()
        cur = conn.cursor()  # 生成游标对象
        sql = "INSERT INTO tenant_information(name, room, rent, deposit, idcard, check_in, check_out, contact, living_number, ext_1, ext_2) VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s)",(name, room, rent, deposit, idcard, check_in, check_out, contact, living_number, ext_1, ext_2)
        try:
            # 执行sql语句
            cur.execute(*sql)
            # 提交到数据库执行
            conn.commit()
        except:
            # 如果发生错误则回滚
            conn.rollback()

        v_sql = "SELECT * FROM tenant_information WHERE 'id' = %s" % data.a
        cur.execute(v_sql)
        u = cur.fetchall()
        conn.close()
        return render_template('tenant_show.html', u=u)
        conn.close()
    except:
        return render_template('tenant_in.html', message='input successfully', var1=name, var2=room, var3=rent, var4=deposit, var5=idcard, var6=check_in, var7=check_out, var8=contact, var9=living_number, var10=ext_1, var11=ext_2)

if __name__ == '__main__':
    app.run(debug=True, port=8888)
    # app.run(debug=True)