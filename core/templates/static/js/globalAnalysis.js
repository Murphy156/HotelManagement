"use strict"

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




var nowYearHistogramColor = '#e5323e';
var lastYearHistogramColor = '#003366';

// 获取总共年份


//这里返回全部物业年的总收入
var tolincome = function(){
    var year = $('#yearNum').val();
    console.log(year);
    var url = "/api/v1/globalanalysis/allIncome?year=" +year;
    console.log(url);
    $.get(url,function(data,status){
        if(status == 'success'){
            console.log(data)
            var totalIncome = data;//这里返回全部物业的总收入
            var totalIncomeHtml = "<i class='fas fa-coins'></i><h4>总收入：<font color='#FF0000'>" + totalIncome['allIncome'] + " 万元</font></h4>";
            totalIncomeHtml += "<h5>预测：" + totalIncome['predictIncome'] + " 元</h5>";
            $("#global_total_income").html(totalIncomeHtml);

        }
        else {
            alert("无数据")
        }
    });
}

// 这里返回纯房租年总收入
var rentinc = function(){
    var year = $('#yearNum').val();
    var url = "/api/v1/globalanalysis/rentIncome?year=" +year;
    console.log(url);

    $.get(url,function(data,status){
        if(status == 'success'){
            console.log(data)
            var toltal = data;//这里返回房租的总收入
            console.log(toltal)
            var toltalHtml = "<i class='fas fa-money-bill-wave'></i><h4>房租：<font color='#FF0000'>" + toltal['rentIncome'] + " 万元</font></h4>";
            toltalHtml += "<h5>预测：" + toltal['predictRent'] + " 元</h5>";
            $("#global_rent_income").html(toltalHtml);
        }
        else {
            alert("无数据")
        }
    });
}

// 这里返回可租房间数
var roomqual = function(){
    var year = $('#yearNum').val();
    var url = "/api/v1/globalanalysis/roomQuantity?year="+year;
    console.log(url);

    $.get(url,function(data,status){
        if(status == 'success'){
            console.log(data)
            var a = data;//直接返回房间数
            var numb = "<i class='fas fa-bed'></i><h4>已租房间：" + a + "/73间</h4>";
            $("#room_Number").html(numb);
        }
        else {
            alert("无数据")
        }
    });
}

// 这里返回可租商铺数
var shopqual = function(){
    var year = $('#yearNum').val();
    var url = "/api/v1/globalanalysis/shopQuantity?year="+year;
    console.log(url);

    $.get(url,function(data,status){
        if(status == 'success'){
            console.log(data)
            var a = data;// 这里直接返回商铺数
            var numb = "<i class='fas fa-store'></i><h4>已租铺位：" + a + "/6间</h4>";
            $("#shop_Number").html(numb);
        }
        else {
            alert("无数据")
        }
    });
}

var current_rate = function(data){
    var a = data;
    var x = (a.rate_c / 78).toFixed(2);
    return x;
}

// 这里返回当前出租率
var onrent = function(){
    var year = $('#yearNum').val();
    var url = "/api/v1/globalanalysis/rentalRate?year="+year;
    console.log(url);

    $.get(url,function(data,status){
        if(status == 'success'){
            console.log(data)
            var a = current_rate(data) * 100
            console.log(a)
            var numb = "<i class='fas fa-chart-line'></i><h4>当前出租率：" + a + "%" + "</h4>";
            $("#rate").html(numb);
        }
        else {
            alert("无数据")
        }
    });
}

var totalinc = function(data){
    var a = data;
    var x = new Array();
    for (var i = 0;i<a.length;i++){
        x[i] = a[i].sum_rent;
    }
    return x;
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

// 处理前一年多出来的数据
var deal_over = function(data1,data2){
    var old_data = data1;
    var current_tol_month = data2;
    var x = new Array();
    console.log(old_data)
    for (var i = 0;i<current_tol_month.length;i++){
        x[i] = old_data[i];
    }
    console.log(x)
    return x;
}

// 这里返回业全部物总收入中按月收入分析
var monlinc = function(){
    var tolmonth = new Array();
    var new_data = new Array();
    var old_data = new Array();
    var current_month = new Array();
    var year = $('#yearNum').val();
    var for_year = $('#yearNum').val()-1;
    var url1 = "/api/v1/globalanalysis/allIncomeMon?year=" +year;
    var url2 = "/api/v1/globalanalysis/allIncomeMon?year=" +for_year;
    console.log(url1);
    console.log(url2);


    $.get(url2,function(data,status){
        if(status == 'success'){
            console.log(data)
            old_data = totalinc(data);
            console.log(old_data)
            }
        else {
            alert("NO DATA")
        }
    });

    $.ajaxSettings.async = true;
    $.get(url1,function(data,status){
        if(status == 'success'){
            console.log(data)
            new_data = totalinc(data);
            current_month = tol_month(data);
            old_data = deal_over(old_data,current_month);
            console.log(current_month)
            console.log(old_data)
            console.log(new_data)

            var myChart = echarts.init(document.getElementById('monlInc'));
            var option = {
            backgroundColor: "#F0FFFF",
            title: {
                text: '按月总收入同比（元）',
                left: "center",
                textStyle: {
                    fontSize: 20
                }
            },
            tooltip: {
                extraCssText: 'width:250px;height:100px;;',
                trigger: 'axis',
                axisPointer: {
                   type: "shadow"
                }
            },
            legend: {
                 show:true,
                 type:"plain",
                 right:"4%",
                 orient:"vertical"
            },
            xAxis: {
                type: "category",
                data: current_month,
                axisLabel: {
                    show:true,
                    color:"rgba(86, 72, 72, 1)",
                    fontWeight:"bold",
                    fontSize:10
                }
            },
            yAxis: {
                axisLabel: {
                    show:true,
                    color:"rgba(86, 72, 72, 1)",
                    fontWeight:"bold",
                    fontSize:10
                }
            },
            series: [
            {
                name: for_year,
                color:lastYearHistogramColor,
                type: 'bar',
                data: old_data,
                label:{
                    show: true,
                    color:lastYearHistogramColor,
                    fontWeight:"bolder",
                    position: "top",
                    fontSize: 12
                }
            },{
                name: year,
                color:nowYearHistogramColor,
                type: 'bar',
                data: new_data,
                label:{
                    show: true,
                    color:nowYearHistogramColor,
                    fontWeight:"bolder",
                    position: "top",
                    fontSize: 12
                }
            }]
        };
        myChart.setOption(option);
        }
        else {
            alert("无数据")
        }
    });
    $.ajaxSettings.async = false;
}


// 返回纯房租收入对比
var incom = function(){
    var new_data = new Array();
    var old_data = new Array();
    var current_month = new Array();
    var year = $('#yearNum').val();
    var for_year = $('#yearNum').val()-1;
    var url1 = "/api/v1/globalanalysis/reveCompar?year=" +year;
    var url2 = "/api/v1/globalanalysis/reveCompar?year=" +for_year;
    console.log(url1);
    console.log(url2);


    $.get(url2,function(data,status){
        if(status == 'success'){
            console.log(data)
            old_data = totalinc(data);
            console.log(old_data)
            }
        else {
            alert("NO DATA")            //避免中文输入
        }
    });

    $.ajaxSettings.async = true;
    $.get(url1,function(data,status){   //jquary中的get函数只能在其内部获取
        if(status == 'success'){
            console.log(data)
            new_data = totalinc(data);
            current_month = tol_month(data);
            old_data = deal_over(old_data,current_month);
            console.log(old_data)
            console.log(new_data)


            var myChart = echarts.init(document.getElementById('incom'));
            var option = {
            backgroundColor: "#F0FFFF",
            title: {
                text: '纯房租收入同比（元）',
                left: "center",
                textStyle: {
                    fontSize: 20
                }
            },
            tooltip: {
                extraCssText: 'width:250px;height:100px;;',
                trigger: 'axis',
                axisPointer: {
                   type: "shadow"
                }
            },
            legend: {
                 show:true,
                 type:"plain",
                 right:"4%",
                 orient:"vertical"
            },
            xAxis: {
                type: "category",
                data: current_month,
                axisLabel: {
                    show:true,
                    color:"rgba(86, 72, 72, 1)",
                    fontWeight:"bold",
                    fontSize:10
                }
            },
            yAxis: {
                axisLabel: {
                    show:true,
                    color:"rgba(86, 72, 72, 1)",
                    fontWeight:"bold",
                    fontSize:10
                }
            },
            series: [
            {
                name: for_year,
                color:lastYearHistogramColor,
                type: 'bar',
                data: old_data,
                label:{
                    show: true,
                    color:lastYearHistogramColor,
                    fontWeight:"bolder",
                    position: "top",
                    fontSize: 12
                }
            },{
                name: year,
                color:nowYearHistogramColor,
                type: 'bar',
                data: new_data,
                label:{
                    show: true,
                    color:nowYearHistogramColor,
                    fontWeight:"bolder",
                    position: "top",
                    fontSize: 12
                }
            }]
        };
        myChart.setOption(option);
        }
        else {
            alert("无数据")
        }
    });
    $.ajaxSettings.async = false;
}


// 这里返回各区域收入对比
var regipro = function(){
    var year = $('#yearNum').val();
    var url = "/api/v1/globalanalysis/regionCompar?year=" +year;
    console.log(url);

    $.get(url,function(data,status){
        if(status == 'success'){
            console.log(data)
            var a = totalinc(data);
            console.log(a)
            var myChart = echarts.init(document.getElementById('regipro'));
            var option = {
                backgroundColor: "#F0FFFF",
                title: {
                    text: '各区域收入占比（元）',
                    left: 'center',
                    top: 20,
                    textStyle: {
                        fontSize: 20
                    }
                },
                legend:{
                    show:true,
                    type:"plain",
                    right:"4%",
                    orient:"vertical"
                },
                tooltip: {
                    extraCssText: 'width:250px;height:100px;;',
                    trigger: 'item',
                },
                series: [
                    {
                        name: '占比',
                        type: 'pie',
                        radius: '55%',
                        center: ['40%', '50%'],
                        data: [
                            {value:a[0], name:'A栋'},
                            {value:a[1], name:'B栋'},
                            {value:a[2],name:'C区'},
                            {value:a[3],name:'D栋'},
                            {value:a[4],name:'E区'}
                        ],
                        emphasis: {
                            itemStyle: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: 'rgba(0, 0, 0, 0.5)'
                            }
                        }
                    }
                ]

            };
            myChart.setOption(option);
        }
        else {
            alert("NO DATA")
        }
    });
}

var ratedeal = function(data){
    var a = data;
    var x = new Array();
    for(var i=0;i<a.length;i++){
        x[i] = (a[i].rate_c / 78).toFixed(2);
    }
    return x;
}

var old_ratedeal = function(data){
    var a = data;
    var x = new Array();
    for(var i=0;i<a.length;i++){
        x[i] = (a[i].rate_c / 78).toFixed(2);
    }
    return x;
}

//出租率同比
var rateComp = function(){
    var current_month = new Array();
    var new_data = new Array();
    var old_data = new Array();
    var for_year = $('#yearNum').val()-1;
    var year = $('#yearNum').val();
    var url1 = "/api/v1/globalanalysis/renRateCompar?year=" +year;
    var url2 = "/api/v1/globalanalysis/renRateCompar?year=" +for_year;
    console.log(url1);
    console.log(url2);

    $.get(url1,function(data,status){
        if(status == 'success'){
            console.log(data)
            new_data = ratedeal(data);
            console.log(new_data)
            for (var i = 0;i<new_data.length;i++){
                current_month[i] = i+1;
            }
            console.log(current_month)
            }
        else {
            alert("NO DATA")            //避免中文输入
        }
    });
    $.ajaxSettings.async = true;
    $.get(url2,function(data,status){   //jquary中的get函数只能在其内部获取
        if(status == 'success'){
            console.log(data)
            old_data = old_ratedeal(data);
            console.log(old_data)
            console.log(new_data)

            var myChart = echarts.init(document.getElementById('rateCompara'));
            var option = {
            backgroundColor: "#F0FFFF",
            title: {
                text: '出租率同比',
                left: "center",
                textStyle: {
                    fontSize: 20
                }
            },
            tooltip: {
                extraCssText: 'width:250px;height:100px;;',
                trigger: 'axis',
                axisPointer: {
                   type: "shadow"
                }
            },
            xAxis: {
                type: "category",
                data: current_month,
                axisLabel: {
                    show:true,
                    color:"rgba(86, 72, 72, 1)",
                    fontWeight:"bold",
                    fontSize:10
                }
            },
            yAxis: {
                axisLabel: {
                    show:true,
                    color:"rgba(86, 72, 72, 1)",
                    fontWeight:"bold",
                    fontSize:10
                }
            },
            legend: {
                 data:current_month,
                 show:true,
                 type:"plain",
                 right:"4%",
                 orient:"vertical"
            },
            series: [
            {
                name: year,
                color:nowYearHistogramColor,
                type: 'line',
                data: new_data,
                label:{
                    show: true,
                    position: "top",
                    color:nowYearHistogramColor,
                    fontWeight:"bolder"
                }
            },
            {
                name: for_year,
                color:lastYearHistogramColor,
                type: 'line',
                data: old_data,
                label:{
                    show: true,
                    position: "bottom",
                    color:lastYearHistogramColor,
                    fontWeight:"bolder"
                }
            }]
        };
        myChart.setOption(option);
        }
        else {
            alert("无数据")
        }
    });
    $.ajaxSettings.async = false;
}

// 返回电费收入对比
var electCompar = function(){
    var new_data = new Array();
    var old_data = new Array();
    var current_month = new Array();
    var year = $('#yearNum').val();
    var for_year = $('#yearNum').val()-1;
    var url1 = "/api/v1/globalanalysis/electCompar?year=" +year;
    var url2 = "/api/v1/globalanalysis/electCompar?year=" +for_year;
    console.log(url1);
    console.log(url2);


    $.get(url2,function(data,status){
        if(status == 'success'){
            console.log(data)
            old_data = totalinc(data);
            console.log(old_data)
            }
        else {
            alert("NO DATA")            //避免中文输入
        }
    });

    $.ajaxSettings.async = true;
    $.get(url1,function(data,status){   //jquary中的get函数只能在其内部获取
        if(status == 'success'){
            console.log(data)
            new_data = totalinc(data);
            current_month = tol_month(data);
            old_data = deal_over(old_data,current_month);
            console.log(old_data)
            console.log(new_data)


            var myChart = echarts.init(document.getElementById('electCompar'));
            var option = {
            backgroundColor: "#F0FFFF",
            title: {
                text: '电费收入同比（元）',
                left: "center",
                textStyle: {
                    fontSize: 20
                }
            },
            tooltip: {
                extraCssText: 'width:250px;height:100px;;',
                trigger: 'axis',
                axisPointer: {
                   type: "shadow"
                }
            },
            legend: {
                 show:true,
                 type:"plain",
                 right:"4%",
                 orient:"vertical"
            },
            xAxis: {
                type: "category",
                data: current_month,
                axisLabel: {
                    show:true,
                    color:"rgba(86, 72, 72, 1)",
                    fontWeight:"bold",
                    fontSize:10
                }
            },
            yAxis: {
                axisLabel: {
                    show:true,
                    color:"rgba(86, 72, 72, 1)",
                    fontWeight:"bold",
                    fontSize:10
                }
            },
            series: [
            {
                name: for_year,
                color: lastYearHistogramColor,
                type: 'bar',
                data: old_data,
                label:{
                    show: true,
                    color: lastYearHistogramColor,
                    fontWeight:"bolder",
                    position: "top",
                    fontSize: 12
                }
            },{
                name: year,
                color: nowYearHistogramColor,
                type: 'bar',
                data: new_data,
                label:{
                    show: true,
                    color: nowYearHistogramColor,
                    fontWeight:"bolder",
                    position: "top",
                    fontSize: 12
                }
            }]
        };
        myChart.setOption(option);
        }
        else {
            alert("无数据")
        }
    });
    $.ajaxSettings.async = false;
}

// 返回水费收入对比
var waterCompar = function(){
    var new_data = new Array();
    var old_data = new Array();
    var current_month = new Array();
    var year = $('#yearNum').val();
    var for_year = $('#yearNum').val()-1;
    var url1 = "/api/v1/globalanalysis/waterCompar?year=" +year;
    var url2 = "/api/v1/globalanalysis/waterCompar?year=" +for_year;
    console.log(url1);
    console.log(url2);


    $.get(url2,function(data,status){
        if(status == 'success'){
            console.log(data)
            old_data = totalinc(data);
            console.log(old_data)
            }
        else {
            alert("NO DATA")            //避免中文输入
        }
    });

    $.ajaxSettings.async = true;
    $.get(url1,function(data,status){   //jquary中的get函数只能在其内部获取
        if(status == 'success'){
            console.log(data)
            new_data = totalinc(data);
            current_month = tol_month(data);
            old_data = deal_over(old_data,current_month);
            console.log(old_data)
            console.log(new_data)


            var myChart = echarts.init(document.getElementById('waterCompar'));
            var option = {
            backgroundColor: "#F0FFFF",
            title: {
                text: '水费收入同比（元）',
                left: "center",
                textStyle: {
                    fontSize: 20
                }
            },
            tooltip: {
                extraCssText: 'width:250px;height:100px;;',
                trigger: 'axis',
                axisPointer: {
                   type: "shadow"
                }
            },
            legend: {
                 show:true,
                 type:"plain",
                 right:"4%",
                 orient:"vertical"
            },
            xAxis: {
                type: "category",
                data: current_month,
                axisLabel: {
                    show:true,
                    color:"rgba(86, 72, 72, 1)",
                    fontWeight:"bold",
                    fontSize:10
                }
            },
            yAxis: {
                axisLabel: {
                    show:true,
                    color:"rgba(86, 72, 72, 1)",
                    fontWeight:"bold",
                    fontSize:10
                }
            },
            series: [
            {
                name: for_year,
                color: lastYearHistogramColor,
                type: 'bar',
                data: old_data,
                label:{
                    show: true,
                    color: lastYearHistogramColor,
                    fontWeight:"bolder",
                    position: "top",
                    fontSize: 12
                }
            },{
                name: year,
                color: nowYearHistogramColor,
                type: 'bar',
                data: new_data,
                label:{
                    show: true,
                    color: nowYearHistogramColor,
                    fontWeight:"bolder",
                    position: "top",
                    fontSize: 12
                }
            }]
        };
        myChart.setOption(option);
        }
        else {
            alert("无数据")
        }
    });
    $.ajaxSettings.async = false;
}

var show_global_data = function() {
    var d = new Date();
	var current_year = d.getFullYear();
	var option_1;
    console.log(current_year);
    option_1 = "<option value=\"" + current_year + "\" >" + current_year + "</option>";
    $('#yearNum').html(option_1);
    console.log($('#yearNum').html())
    getyearNum();
    setTimeout(show_global_data_2,50);
}

var show_global_data_2 = function() {
    rentinc();
    roomqual();
    shopqual();
    onrent();
    monlinc();
    incom();
    regipro();
    rateComp();
    electCompar();
    waterCompar();
    tolincome();
}

