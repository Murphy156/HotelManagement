"use strict"
var show_region_data = function () {
    var d = new Date();
	var current_year = d.getFullYear();
	var option_1
    console.log(current_year);
    option_1 = "<option value=\"" + current_year + "\" >" + current_year + "</option>";
    $('#yearNum').html(option_1);
    console.log($('#yearNum').html())
    getyearNum();
    setTimeout(show_region_data_2,50);
}
var show_region_data_2 = function () {
    yearIncome();
    nowIncome();
    aveRoomPri();
    rentAlRate();
    roomNumb();
    monthCome();
    incClaFi();
}

// 获取总共年份
var getyearNum = function () {
    var url = "/api/v1/common/getyeartotally";
    console.log(url);
    $.get(url, function (data, status) {
        if (status == 'success') {
            console.log(data)
            var yearNumList = data.data
            var optionstring
            for (var item in yearNumList) {
                optionstring += "<option value=\"" + yearNumList[item] + "\" >" + yearNumList[item] + "</option>";
            }
            $("#yearNum").html(optionstring);
        } else {
            alert("无数据")
        }
    });
}

// 这里返回一个收入总数
var sum = function (data) {
    var a = data;
    var sum_tol = data[0].sum_rent;
    var x = new Array();
    for (var i = 0; i < a.length; i++) {
        x[i] = a[i].sum_rent;
    }
    var y = x[0];
    return y;
}

//这里实现的是每月收入（专用：yearIncome（））
var egiMon1 = function (data) {
    var a = data;
    var x = new Array();
    for (var i = 0; i < a.length; i++) {
        x[i] = a[i].sum_rent;
    }
    var y = new Array();
    for (var i = 0; i < x.length - 1; i++) {
        y[i] = x[i + 1];
    }
    return y;
}

//按月收入（专用：）
var regiMon2 = function (data) {
    var a = data;
    var x = new Array();
    for (var i = 0; i < a.length; i++) {
        x[i] = a[i].sum_rent;
    }
    var y = new Array();
    for (var i = 0; i < x.length; i++) {
        y[i] = x[i];
    }
    return y;
}

//这里取出的是每个数据对应的月份数

var tol_month = function (data){
    var a = data;
    var x = new Array();
    for (var i = 0;i<a.length;i++){
        x[i] = a[i].month;
    }
    return x;
}

// 得到的数据是 某年某区域 1、年总收入，2、每月收入
var yearIncome = function () {
    var region = $('#region option:selected').val();
    var year = $('#yearNum').val();
    var url1 = "/api/v1/region/yearIncome?region=" + region + "&year=" + year;
    console.log(url1);

    $.get(url1, function (data, status) {
        if (status == 'success') {
            console.log(data);
            var sumIncomeYear = data;
            var totalIncomeHtml = "<h4>年总收入：" + sumIncomeYear + " 元</h4>";
            $("#yearincome").html(totalIncomeHtml);
        } else {
            alert("无数据")
        }

    });
}

//这里得到的数据是 某一区域，某一年：1、当月总收入，2、当月总电费，3、当月总水费
var nowIncome = function () {
    var region = $('#region option:selected').val();
    var year = $('#yearNum').val();
    var month = $('#texmonth option:selected').val();
    var url = "/api/v1/region/allMonth?region=" + region + "&year=" + year + "&month=" + month;
    console.log(url);

    $.get(url, function (data, status) {
        if (status == 'success') {
            console.log(data)
            var m_total_income = data.total_rent;
            var m_rent_income = data.rent_income;
            var w_c = data.sum_w_c;
            var e_c = data.sum_e_c;
            var totalIncomeHtml = "<h4>" + month + "月总收入：" + m_total_income + "元</h4>" + "<h6>" + month + "月房租收入：" + m_rent_income + "元</h6>" + "<h6>" + month + "月电费收入：" + e_c + "元</h6>" + "<h6>" + month + "月水费收入：" + w_c + "元</h6>";
            $("#nowincome").html(totalIncomeHtml);
        } else {
            alert("无数据")
        }
    });
}
//这里得到的数据是 某一区域，某一年，某一月：1、某月客房均价
var aveRoomPri = function () {
    var region = $('#region option:selected').val();
    var year = $('#yearNum').val();
    var month = $('#texmonth option:selected').val();
    var url = "/api/v1/region/aveHousePri?region=" + region + "&year=" + year + "&month=" + month;
    console.log(url);

    $.get(url, function (data, status) {
        if (status == 'success') {
            console.log(data)
            var averageRoomPrice = data;
            var totalIncomeHtml = "<h4>" + region + "栋出租均价：" + averageRoomPrice + "元</h4>";
            var avgRoomPrice = data['avgRoomPrice'];
            var avgRoomIncome = data['avgRoomIncome']
            var totalIncomeHtml = "<h4>单元收入均价：" + avgRoomIncome + "元</h4>" + "<h4>单元纯房租收入均价：" + avgRoomPrice + "元</h4>";
            $("#averRoomPri").html(totalIncomeHtml);
        } else {
            alert("无数据")
        }
    });
}

// 处理前一年多出来的数据!
var deal_over = function(data1,data2){
    var old_data = data1;
    var current_tol_month = data2;
    var x = new Array();
    console.log(old_data)
    console.log(current_tol_month)
    for (var i = 0;i<current_tol_month.length;i++){
        x[i] = old_data[i];
    }
    console.log(x)
    return x;
}


//这里得到的数据是按月收入，某区域，某年：1、每个月的收入统计
var monthCome = function () {
    var tolmonth = new Array();
    var new_data = new Array();
    var old_data = new Array();
    var current_month = new Array();
    var region = $('#region option:selected').val();
    var year = $('#yearNum').val();
    var for_year = $('#yearNum').val()-1;
    var url1 = "/api/v1/region/regMonInc?region=" + region + "&year=" + year;
    var url2 = "/api/v1/region/regMonInc?region=" + region + "&year=" + for_year;

    $.get(url2,function(data,status){
        if(status == 'success'){
            console.log(data)
            old_data = regiMon2(data);
            console.log(old_data)
            }
        else {
            alert("NO DATA")
        }
    });

    $.ajaxSettings.async = true;
    $.get(url1, function (data, status) {
        if (status == 'success') {
            console.log(data)
            new_data = regiMon2(data); //mon是每月收入
            tolmonth = tol_month(data);
            old_data = deal_over(old_data,tolmonth);
            console.log(tolmonth)
            console.log(old_data)
            console.log(new_data)
            var myChart = echarts.init(document.getElementById('monthcome'));
            var option = {
                backgroundColor: "#F0FFFF",
                title: {
                    text: '按月收入分析',
                    left: "left",
                    textStyle: {
                        fontSize: 20
                    }
                },
                tooltip: {
                    extraCssText: 'width:200px;height:100px;;',
                    trigger: 'axis',
                    axisPointer: {
                        type: "shadow"
                    }
                },
                legend: {
                    type: "plain",
                    show: true,
                    right: "4%",
                    width: "5%"
                },
                xAxis: {
                    type: "category",
                    data: tolmonth,
                    axisLabel: {
                        show: true,
                        color: "rgba(86, 72, 72, 1)",
                        fontWeight: "bold",
                        fontSize: 10
                    }
                },
                yAxis: {
                    axisLabel: {
                        show: true,
                        color: "rgba(86, 72, 72, 1)",
                        fontWeight: "bold",
                        fontSize: 10
                    }
                },
                series: [
            {
                name: for_year,
                color:'#003366',
                type: 'bar',
                data: old_data,
                label:{
                    show: true,
                    color:'#003366',
                    fontWeight:"bolder",
                    position: "top",
                    fontSize: 12
                }
            },{
                name: year,
                color:'#e5323e',
                type: 'bar',
                data: new_data,
                label:{
                    show: true,
                    color:'#e5323e',
                    fontWeight:"bolder",
                    position: "top",
                    fontSize: 12
                }
            }]
            };
            myChart.setOption(option);
        }
    });
    $.ajaxSettings.async = false;
}

//这里返回的是 按月房租（专用于incClaFi（））
var rentmon = function (data) {
    var a = data;
    var x = new Array();
    for (var i = 0; i < a.length / 3; i++) {
        x[i] = a[i].sum_rent;
    }
    return x;
}

//这里返回的是 按月电费（专用于incClaFi（））
var elect = function (data) {
    var a = data;
    var x = new Array();
    for (var i = a.length / 3; i < 2 * a.length / 3; i++) {
        x[i] = a[i].sum_e_c;
    }
    var y = new Array();
    for (var i = 0; i < a.length / 3; i++) {
        y[i] = x[i + a.length / 3];
    }
    return y;
}

//这里返回的是 按月水费（专用于incClaFi（））
var water = function (data) {
    var a = data;
    var x = new Array();
    for (var i = 2 * a.length / 3; i < a.length; i++) {
        x[i] = a[i].sum_w_c;
    }
    var y = new Array();
    for (var i = 0; i < a.length / 3; i++) {
        y[i] = x[i + 2 * a.length / 3];
    }
    return y;
}

//这里是专用于分类的对应月份

var tol_month1 = function(data){
    var a = data;
    var x = new Array();
    for (var i = 0;i<a.length/3;i++){
        x[i] = a[i].month;
    }
    return x;
}
//这里得到的数据是收入分类占比
var incClaFi = function () {
    var tolmonth = Array();
    var region = $('#region option:selected').val();
    var year = $('#yearNum').val();
    var url = "/api/v1/region/incClafi?region=" + region + "&year=" + year;
    console.log(url);

    $.get(url, function (data, status) {
        if (status == 'success') {
            console.log(data)
            var rent = rentmon(data);//这里返回的是按月房租收入
            console.log(rent)
            var elec_c = elect(data);//这里返回的是按月电费收入
            console.log(elec_c)
            var wate_c = water(data);//这里返回的是按月水费收入
            console.log(wate_c)
            tolmonth = tol_month1(data)
            var myChart = echarts.init(document.getElementById('incClafi'));
            var option = {
                backgroundColor: "#F0FFFF",
                title: {
                    text: '月各类型收入',
                    left: "left",
                    textStyle: {
                        fontSize: 20
                    }
                },
                tooltip: {
                    extraCssText: 'width:250px;height:100px;;',
                    trigger: 'axis',
                    axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                        type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                    }
                },
                legend: {
                    show:true,
                    type:"plain",
                    data: ['房租', '电费', '水费'],
                    right: "4%"
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                xAxis: {
                    type: 'category',
                    data: tolmonth,
                    axisLabel: {
                        show: true,
                        color: "rgba(86, 72, 72, 1)",
                        fontWeight: "bold",
                        fontSize: 10
                    }
                },
                yAxis: {
                    type: 'value',
                    axisLabel: {
                        show: true,
                        color: "rgba(86, 72, 72, 1)",
                        fontWeight: "bold",
                        fontSize: 10
                    }
                },
                series: [
                    {
                        name: '房租',
                        type: 'bar',
                        stack: '总量',
                        label: {
                            show: true,
                            position: 'insideRight'
                        },
                        data: rent,
                        itemStyle: {
                            normal: {
                                label: {
                                    show: false,
                                    position: 'inside',//数据在中间显示
                                    formatter: '{c}',
                                    textStyle: {
                                        color: '#333',
                                        fontSize: 30
                                    }
                                }
                            }
                        }

                    },
                    {
                        name: '电费',
                        type: 'bar',
                        stack: '总量',
                        label: {
                            show: true,
                            position: 'insideRight'
                        },
                        data: elec_c,
                        itemStyle: {
                            normal: {
                                label: {
                                    color: '	#FFFF00',
                                    show: false,
                                    position: 'insideRight',//数据在中间显示
                                    formatter: '{c}',
                                    textStyle: {
                                        color: '#333',
                                        fontSize: 30
                                    }
                                }
                            }
                        }
                    },
                    {
                        name: '水费',
                        type: 'bar',
                        stack: '总量',
                        label: {
                            show: true,
                            position: 'bottom'
                        },
                        data: wate_c,
                        itemStyle: {
                            normal: {
                                label: {
                                    show: false,
                                    position: 'insideRight',//数据在中间显示
                                    formatter: '{c}',
                                    textStyle: {
                                        color: '#333',
                                        fontSize: 30
                                    }
                                }
                            }
                        }
                    }

                ]
            };
            myChart.setOption(option);
        }
    });
}

//这里返回的是出租率
var rentAlRate = function () {
    var region = $('#region option:selected').val();
    var month  = $('#texmonth option:selected').val();
    var year = $('#yearNum').val();
    var url = "/api/v1/region/roRentRate?region=" + region + "&year=" + year + "&month=" + month;
    console.log(url);

    $.get(url, function (data, status) {
        if (status == 'success') {
            console.log(data)
            var a = data; //这里返回的是出租率数据
            var totalIncomeHtml = "<h4>" + region + "栋出租率：" + a + "</h4>";
            $("#Rentalrate").html(totalIncomeHtml);
        }
    });
}

//这里返回的是某区域的已租出去的房间数
var roomNumb = function (region) {
    var have_rent;
    var all_room;
    var region = $('#region option:selected').val();
    var month  = $('#texmonth option:selected').val();
    var year = $('#yearNum').val();
    var url1 = "/api/v1/region/roomNumb_ok?region=" + region + "&year=" + year + "&month=" + month;
    console.log(url1);
    var url2 = "/api/v1/region/roomNumb_tol?region=" + region;
    console.log(url2);

    $.get(url1, function (data, status) {
        if (status == 'success') {
            console.log(data)
            have_rent = data;
            console.log(have_rent)
        }
    });
    $.ajaxSettings.async = true;
    $.get(url2, function (data, status) {
        if (status == 'success') {
            console.log(data)
            all_room = data;
            console.log(all_room)
            console.log(have_rent)
            var totalIncomeHtml = "<h4>" + region + "栋房间数：" + have_rent + "/" + all_room + "间</h4>";
            $("#roomNumb").html(totalIncomeHtml);
        }
    });
    $.ajaxSettings.async = false;
}