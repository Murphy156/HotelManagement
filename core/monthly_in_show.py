# noinspection PyUnresolvedReferences
from flask_sqlalchemy import SQLAlchemy
from flask import Flask, render_template, request
# noinspection PyUnresolvedReferences
import pymysql

import sys
sys.path.append('D:/house/roomManagement/conf/connection')
print(sys.path)

from conf.connection import get_conn

app = Flask(__name__, template_folder='templates/')

class DataStore():
    a = None
data = DataStore()


@app.route('/', methods=['GET'])
def home():
    return render_template('monthly_in.html')


@app.route('/', methods=['POST'])
def add():
    data.a = id
    name = request.form['name']
    room = request.form['room']
    water = request.form['water']
    electricity = request.form['electricity']
    rent = request.form['rent']
    pay_time = request.form['pay_time']
    ext_1 = request.form['ext_1']
    ext_2 = request.form['ext_2']
    try:
        conn = get_conn()
        cur = conn.cursor()  # 生成游标对象
        sql = "INSERT INTO monthly(name, room, water, electricity, rent, pay_time, ext_1, ext_2) VALUES (%s,%s,%s,%s,%s,%s,%s,%s)",(name, room, water, electricity, rent, pay_time, ext_1, ext_2)
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
        return render_template('monthly_in.html', message='input successfully', var1=name, var2=room, var3=water, var4=electricity, var5=rent, var6=pay_time, var7=ext_1, var8=ext_2)


if __name__ == '__main__':
    app.run(debug=True)