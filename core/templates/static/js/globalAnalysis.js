show_global_data = function() {
    tolincome();
    rentinc();
    roomqual();
    shopqual();
    onrent();
    monlinc();
    incom();
    regipro();
    rateComp();
}


//这里返回全部物业年的总收入
tolincome = function(){
    var year = $('#global_year_choose option:selected').val();
    var url = "/api/v1/globalanalysis/allIncome?year=" +year;
    console.log(url);

    $.get(url,function(data,status){
        if(status == 'success'){
            console.log(data)
            var totalIncome = data['sum_rent'];//这里返回全部物业的总收入
            var totalIncomeHtml = "<h1>总收入：" + totalIncome + "元</h1>";
            $("#global_total_income").html(totalIncomeHtml);

        }
        else {
            alert("无数据")
        }
    });
}

// 这里返回全部房租年的总收入
rentinc = function(){
    var year = $('#global_year_choose option:selected').val();
    var url = "/api/v1/globalanalysis/rentIncome?year=" +year;
    console.log(url);

    $.get(url,function(data,status){
        if(status == 'success'){
            console.log(data)
            var toltal = data['sum_rent'];//这里返回房租的总收入
            console.log(toltal)
            var toltalHtml = "<h1>房租收入：" + toltal + "元</h1>";
            $("#global_rent_income").html(toltalHtml);
        }
        else {
            alert("无数据")
        }
    });
}

// 这里返回可租房间数
roomqual = function(){
    var url = "/api/v1/globalanalysis/roomQuantity";
    console.log(url);

    $.get(url,function(data,status){
        if(status == 'success'){
            console.log(data)
            var a = data;//直接返回房间数
            var numb = "<h1>可租房间：" + a + "间</h1>";
            $("#room_Number").html(numb);
        }
        else {
            alert("无数据")
        }
    });
}

// 这里返回可租商铺数
shopqual = function(){
    var url = "/api/v1/globalanalysis/shopQuantity";
    console.log(url);

    $.get(url,function(data,status){
        if(status == 'success'){
            console.log(data)
            var a = data;// 这里直接返回商铺数
            var numb = "<h1>可租铺位：" + a + "间</h1>";
            $("#shop_Number").html(numb);
        }
        else {
            alert("无数据")
        }
    });
}


// 这里返回当前出租率
onrent = function(){
    var url = "/api/v1/globalanalysis/rentalRate";
    console.log(url);

    $.get(url,function(data,status){
        if(status == 'success'){
            console.log(data)
            var a = data;//这里直接返回出租率
            var numb = "<h1>当前出租率：" + a + "</h1>";
            $("#rate").html(numb);
        }
        else {
            alert("无数据")
        }
    });
}

totalinc = function(data){
    var a = data;
    var x = new Array();
    for (i = 0;i<a.length;i++){
        x[i] = a[i].sum_rent;
    }
    return x;
}

// 这里返回全部物业总收入中按月收入分析
monlinc = function(){
    var year = $('#global_year_choose option:selected').val();
    var url = "/api/v1/globalanalysis/allIncomeMon?year=" +year;
    console.log(url);

    $.get(url,function(data,status){
        if(status == 'success'){
            console.log(data)
            var a = totalinc(data);
            console.log(a)
            var x = new Array();
            for (i = 0;i<a.length;i++){
                x[i] = i+1;
            }
            console.log(x)
            var myChart = echarts.init(document.getElementById('monlInc'));
            var option = {
            backgroundColor: "#F0FFFF",
            title: {
                text: '按月收入分析',
                left: "center",
                textStyle: {
                    fontSize: 30
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
                data:x
            },
            xAxis: {
                type: "category",
                data: x,
                axisLabel: {
                    textStyle:{
                        fontSize:25 
                    }
                }
            },
            yAxis: {
                axisLabel: {
                    textStyle:{
                        fontSize:25 
                    }
                }
            },
            series: [{
                name: '每月收入',
                type: 'bar',
                data: a
            },
            {
                name: '每月收入',
                type: 'line',
                data: a,
                itemStyle : { normal: {label : {show: true,textStyle: {
                color: '#333',
                fontSize: 30
            }}}}
            }]
        };
        myChart.setOption(option);
        }
        else {
            alert("无数据")
        }
    });
}


// 这里返回收入对比
incom = function(){
    var year = $('#global_year_choose option:selected').val();
    var url = "/api/v1/globalanalysis/reveCompar?year=" +year;
    console.log(url);

    $.get(url,function(data,status){
        if(status == 'success'){
            console.log(data)
            var a = totalinc(data);
            console.log(a)
            var x = new Array();
            for (i = 0;i<a.length;i++){
                x[i] = i+1;
            }
            console.log(x)
            var myChart = echarts.init(document.getElementById('incom'));
            var option = {
            backgroundColor: "#F0FFFF",
            title: {
                text: '收入同比',
                left: "center",
                textStyle: {
                    fontSize: 30
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
                data:x
            },
            xAxis: {
                type: "category",
                data: x,
                axisLabel: {
                    textStyle:{
                        fontSize:25 
                    }
                }
            },
            yAxis: {
                axisLabel: {
                    textStyle:{
                        fontSize:25 
                    }
                }
            },
            series: [{
                name: '每月收入',
                type: 'bar',
                data: a,
                color: '#000080',

            },
            {
                name: '每月收入',
                type: 'bar',
                data: 0,
                color:'#333'
            },
            {
                name: '每月收入',
                type: 'line',
                data: a,
                itemStyle : { normal: {label : {show: true,textStyle: {
                color: '#333',
                fontSize: 30
            }}}}
            }]
        };
        myChart.setOption(option);
        }
        else {
            alert("无数据")
        }
    });
}


// 这里返回各区域收入对比
regipro = function(){
    var year = $('#global_year_choose option:selected').val();
    var url = "/api/v1/globalanalysis/regionCompar?year=" +year;
    console.log(url);

    $.get(url,function(data,status){
        if(status == 'success'){
            console.log(data)
            var a = totalinc(data);
            console.log(a)
            var myChart = echarts.init(document.getElementById('regipro'));
            var option = {
                backgroundColor: "#2c343c",
                title: {
                    text: '各区域收入占比（万元）',
                    left: 'center',
                    top: 20,
                    textStyle: {
                        color: '#ccc',
                        fontSize: 30
                    }
                },

                tooltip: {
                    extraCssText: 'width:250px;height:100px;;',
                    trigger: 'item',
                    formatter: '{a} <br/>{b} : {c} ({d}%)'
                },

                visualMap: {
                    show: false,
                    min: 80,
                    max: 600,
                    inRange: {
                        colorLightness: [0, 1]
                    }
                },

                 series: [
                    {

                        type: 'pie',
                        radius: '55%',
                        center: ['50%', '50%'],
                        data: [
                            {value: a[0], name: 'A栋'},
                            {value: a[1], name: 'B栋'},
                            {value: a[2], name: 'C栋'},
                            {value: a[3], name: 'D栋'}

                        ].sort(function (a, b) { return a.value - b.value; }),
                        roseType: 'radius',
                        label: {
                            color: '#FF4500',
                            textStyle: {
                                color: '#ccc',
                                fontSize: 30
                            }
                        },
                        labelLine: {
                            lineStyle: {
                                color: '#FF4500'
                            },
                            smooth: 0.2,
                            length: 10,
                            length2: 20
                        },
                        itemStyle: {
                            color: '#FF4500',
                            shadowBlur: 200,
                            shadowColor: '#FF4500'
                        },
                        animationType: 'scale',
                        animationEasing: 'elasticOut',
                        animationDelay: function (idx) {
                            return Math.random() * 200;
                        }

                    }
                ]

            };
            myChart.setOption(option);
        }
        else {
            alert("无数据")
        }
    });
}

ratedeal = function(data){
    var a = data;
    var x = new Array();
    for(i=0;i<a.length;i++){
        x[i] = a[i].rate_c/43;
    }


    return x;
}

rateComp = function(){
    var year = $('#global_year_choose option:selected').val();
    var url = "/api/v1/globalanalysis/renRateCompar?year=" +year;
    console.log(url);

    $.get(url,function(data,status){
        if(status == 'success'){
            console.log(data)
            var a = ratedeal(data);
            console.log(a)
            var x = new Array();
            for (i = 0;i<a.length;i++){
                x[i] = i+1;
            }
            console.log(x)
            var myChart = echarts.init(document.getElementById('rateCompara'));
            var option = {
            backgroundColor: "#F0FFFF",
            title: {
                text: '出租率同比',
                left: "center",
                textStyle: {
                    fontSize: 30
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
                data:x
            },
            xAxis: {
                type: "category",
                data: x,
                axisLabel: {
                    textStyle:{
                        fontSize:25 
                    }
                }
            },
            yAxis: {
                axisLabel: {
                    textStyle:{
                        fontSize:25 
                    }
                }
            },
            series: [
            {
                name: '出租率',
                type: 'line',
                data: a,
                itemStyle : { normal: {label : {show: false,textStyle: {
                color: '#333',
                fontSize: 30
            }}}}
            }]
        };
        myChart.setOption(option);
        }
    });
}