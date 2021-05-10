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
## 关于程序部署在服务器的方法以及常见问题
```
- 方法
  - 首先要用git clone 将项目的源码克隆到服务器中
  - 添加项目的配置文件
  - 修改启动和暂停脚本中的地址问题
  - 先使用python3 run.py来对程序进行跑通，这时注意重定向到当前目录
  - 遇到需要下载的库先下载pip3
  - 跑通后 再运行 脚本程序
  - 完成网站的部署
  - 如遇无法打开网页的问题，什么信息都没有反馈的情况，去开服务器的网络安全组有没有对 all的TCP的规则


- 常见问题
  - 如何开启、关闭、重启nginx
    - 开启：sudo systemctl start nginx
    - 停止：sudo systemctl stop nginx
    - 重启：sudo systemctl reload nginx
    - 查看状态：sudo systemctl status nginx
    - 强制重启：sudo systemctl restart nginx
    
```
## 关于在github上新建一个库并且把本地的工程文件关联到这个库的方法
```
- 方法
  - 首先先在本地的终端 git init //初始化
  - 然后再用命令 ： git remote add origin git地址 // 添加远端库
  - 要注意的是提交时要看看对应的分支是否是正确的
```

## 关于在同一台服务器上部署多个不同的站点
```
- 方法
  - 这种工作一般交给nginx来进行部署
  - 首先要改好代码后端的端口，然后再nginx中的conf.d添加相应的信息
  - 然后要注意解析一下不同的监听端口，在安全组中解析
    
```

## 相关文档
```
后续补充
```

## 交流群
```
后续补充
```
