# 介绍
酒店（客房）管理系统

## 主要功能特性
### 信息录入：
- 人：租客信息录入
- 物：房屋信息录入
- 关系：每月收入流水录入

### 数据统计分析
- 大盘统计
- 区域分析
- 单元分析

## 系统整体架构
```
后续补充
```



## 安装手册
### 环境依赖
- Python3.7+ 
- Mysql5.7
- Nginx1.14.0

### pip dependency
```
pip3 install --ignore-installed PyYAML
pip3 install PyMySQL
pip3 install flask_restful
pip3 install flask

```

###环境初始化
####Mysql
```
示例：
mysql -uXXXX -pXXX -h XXX.XXX.XXX.XXX -PXXXX < ./create_mysql_table.sql
```


## 更新最新代码
```
cd /data/opt/HotelManagement/bin
git pull origin master
```

## 启动
```
bash /data/opt/HotelManagement/bin/start.sh
```

## 停止
```
bash /data/opt/HotelManagement/bin/stop.sh
```

## 相关文档
```
后续补充
```

## 交流群
```
后续补充
```