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
    return render_template('tenant_in.html')


@app.route('/', methods=['POST'])
def add():
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
    app.run(debug=True)