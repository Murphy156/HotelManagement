show_unit_data = function(){
    roYeIn();
    monRen();
    monelectricity();
    monWater();
    idleDay();
    cursta();
    roIncClafi();
    tenantInfo();
}

//这里得到的数据是某一区域，某一年，某一房间号：年总收入
roYeIn = function(){
    var region = $('#region option:selected').val();
    var year = $('#yearDate option:selected').val();
    var room = $('#roomNum').val();
    var url = "/api/v1/unit/roomAllInc?region=" + region + "&year=" + year +  "&room=" + room;
    console.log(url);

    $.get(url,function(data,status){
        if(status == 'success'){
            console.log(data)
            var a = data['sum_rent'];
            console.log(a)
            var totalIncomeHtml = "<h1>年总收入：" + a + "元</h1>";
            $("#roYearInc").html(totalIncomeHtml);
        }
    });
}

// 这里得到的数据是某一区域，某一房间的参考租金
monRen = function(){
    var region = $('#region option:selected').val();
    var room = $('#roomNum').val();
    var url = "/api/v1/unit/roomRent?region=" + region +  "&room=" + room;
    console.log(url);

    $.get(url,function(data,status){
        if(status == 'success'){
            console.log(data)
            var a = data['rent'];
            console.log(a)
            var totalIncomeHtml = "<h1>参考租金：" + a + "元</h1>";
            $("#monRent").html(totalIncomeHtml);
        }
    });
}

// 这里得到的数据是某一区域，某一房间，某一时间的用电量
monelectricity = function(){
    var region = $('#region option:selected').val();
    var year = $('#yearDate option:selected').val();
    var room = $('#roomNum').val();
    var month = $('#monthData option:selected').val();
    var url = "/api/v1/unit/elecConsum?region=" + region + "&year=" + year + "&room=" + room + "&month=" + month;
    console.log(url);

    $.get(url,function(data,status){
        if(status == 'success'){
            console.log(data)
            var a = data['electricity'];
            console.log(a)
            var totalIncomeHtml = "<h1>当月用电量：" + a + "度</h1>";
            $("#monEclet").html(totalIncomeHtml);
        }
    });
}

// 这里得到的数据是某一区域，某一房间，某一时间的用水量
monWater = function(){
    var region = $('#region option:selected').val();
    var year = $('#yearDate option:selected').val();
    var room = $('#roomNum').val();
    var month = $('#monthData option:selected').val();
    var url = "/api/v1/unit/waterConsum?region=" + region + "&year=" + year + "&room=" + room + "&month=" + month;
    console.log(url);

    $.get(url,function(data,status){
        if(status == 'success'){
            console.log(data)
            var a = data['water'];
            console.log(a)
            var totalIncomeHtml = "<h1>当月用水量：" + a + "吨</h1>";
            $("#monWat").html(totalIncomeHtml);
        }
    });
}


//返回某一区域，某一房间，某一时间的房屋闲置天数
idleDay = function(){
    var region = $('#region option:selected').val();
    var year = $('#yearDate option:selected').val();
    var room = $('#roomNum').val();
    var month = $('#monthData option:selected').val();
    var url = "/api/v1/unit/waterConsum?region=" + region + "&year=" + year + "&room=" + room + "&month=" + month;
    console.log("[API]get room idle day : " + url);

    $.get(url,function(data,status){
        if(status == 'success'){
            console.log(data)
            var a = data['water'];
            console.log(a)
            var totalIncomeHtml = "<h1>年闲置天数：" + "X" + "天</h1>";
            $("#idle").html(totalIncomeHtml);
        }
    });
}

//这里返回的是 按月房租（专用于incClaFi（））
rentMon = function(data){
    var a = data;
    var x = new Array();
    for (i = 0;i<a.length/3;i++){
        x[i] = a[i].sum_rent;
    }
    return x;
}

//这里返回的是 按月电费（专用于incClaFi（））
elect = function(data){
     var a = data;
     var x = new Array();
     for (i = a.length/3;i<2*a.length/3;i++){
         x[i] = a[i].sum_e_c;
     }
     var y = new Array();
     for (i=0;i<a.length/3;i++){
        y[i]=x[i+a.length/3];
     }
     return y;
}

//这里返回的是 按月水费（专用于incClaFi（））
water = function(data){
    var a = data;
     var x = new Array();
     for (i = 2*a.length/3;i<a.length;i++){
         x[i] = a[i].sum_w_c;
     }
     var y = new Array();
     for (i=0;i<a.length/3;i++){
        y[i]=x[i+2*a.length/3];
     }
     return y;
}

// 这里得到的数据是某一区域，某一房间，某一年，全年各月的：1用水，2、用电，3、房租收入
roIncClafi = function(){
     var region = $('#region option:selected').val();
     var year = $('#yearDate option:selected').val();
     var room = $('#roomNum').val();
     var url = "/api/v1/unit/roomincClafi?region=" + region + "&year=" + year + "&room=" + room;
     console.log(url);

     $.get(url,function(data,status){
        if(status == 'success'){
            console.log(data)
            var rent = rentMon(data);//这里返回的是按月房租收入
            console.log(rent)
            var elec_c = elect(data);//这里返回的是按月电费收入
            console.log(elec_c)
            var wate_c = water(data);//这里返回的是按月水费收入
            console.log(wate_c)
            var x = new Array();
            for (i = 0;i<rent.length;i++){
                x[i] = i+1;
            }
            console.log(x)
            var myChart = echarts.init(document.getElementById('roomIncClafi'));
            var option = {
            backgroundColor: "#F0FFFF",
            title: {
                text: '房间按月总收入各类型占比分析',
                left: "center",
                textStyle: {
                    fontSize: 30
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
                left: 'center',
                bottom: 'bottom',
                data: ['房租', '电费', '水费']
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis: {
                type: 'category',
                data: x,
                axisLabel: {
                    textStyle:{
                        fontSize:25 
                    }
                }
            },
            yAxis: {
                type: 'value',
                axisLabel: {
                    textStyle:{
                        fontSize:25 
                    }
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
                            formatter:'{c}',
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
                            color:'	#FFFF00',
                            show: false,
                            position: 'insideRight',//数据在中间显示
                            formatter:'{c}',
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
                            formatter:'{c}',
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


// 这里返回的值是某一区域，某一房间的房屋状态
cursta = function(region,room){
    var region = $('#region option:selected').val();
    var room = $('#roomNum').val();
    var url = "/api/v1/unit/curaStat?region=" + region + "&room=" + room;
    console.log(url);

    $.get(url,function(data,status){
        if(status == 'success'){
            console.log(data)
            var totalIncomeHtml = "<h1>房屋当前状态：" + data['state'] + "</h1>";
            $("#curSta").html(totalIncomeHtml);
        }else {
            alert("无数据")
        }
    });
}


//获取用户信息
tenantInfo = function() {
    var region = $('#region option:selected').val();
    var room = $('#roomNum option:selected').val();
    var url = "/api/v1/unit/getUserInfo?region=" +region + "&roomNum=" + room;
    console.log(url);

    $.get(url,function(data,status){
        if(status == 'success') {
            var tblInfoCode = dynamic_table(data)
            console.log(tblInfoCode)
            $("#userInfoTbl").html(tblInfoCode);
        } else {
            alert("无数据")
        }
    });
}