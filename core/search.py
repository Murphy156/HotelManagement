# noinspection PyUnresolvedReferences
from flask_sqlalchemy import SQLAlchemy

# noinspection PyUnresolvedReferences
from flask import Flask, render_template, request

# noinspection PyUnresolvedReferences
from flask_sqlalchemy import SQLAlchemy

# noinspection PyUnresolvedReferences
from flask import Flask, render_template, request

# noinspection PyUnresolvedReferences
import pymysql

from conf.connection import get_conn
# noinspection PyUnresolvedReferences
import cgi, cgitb

import sys
sys.path.append('../conf/connection')
print(sys.path)

app = Flask(__name__, template_folder='templates/')


class DataStore():
    a = None
data = DataStore()

@app.route('/tenant_sear', methods=['GET'])
def show_sear_te():
    return render_template('search_in.html')

@app.route('/tenant_sear', methods=['POST'])
def hand_sear_te():
    #在这里获取表单里的输入的数据
    #form = cgi.FieldStorage()
    #dat = form.getvalue('sear')
    dat1 = request.form.get("sear1")
    dat2 = request.form.get("sear2")
    conn = get_conn()
    cur = conn.cursor()  # 生成游标对象
    #想通过dat来做where的条件
    sql = f"SELECT * FROM tenant where building = '{dat1}' AND room = '{dat2}'"
    # 执行sql语句
    cur.execute(sql)
    u = cur.fetchall()
    conn.close()
    return render_template('search_in.html', u=u)

if __name__ == '__main__':
    app.run(debug=True, port=8888)
