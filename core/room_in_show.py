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
    return render_template('room_in.html')


@app.route('/', methods=['POST'])
def add():
    data.a = id
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
        sql = "INSERT INTO room_information(room, area, air_condition, heater, other, rent, remark, ext_1, ext_2) VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s)",(room, area, air_condition, heater, other, rent, remark, ext_1, ext_2)
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
        return render_template('room_in.html', message='input successfully', var1=room, var2=area, var3=air_condition, var4=heater, var5=other, var6=rent, var7=remark, var8=ext_1, var9=ext_2)


if __name__ == '__main__':
    app.run(debug=True)