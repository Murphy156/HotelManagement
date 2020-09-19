show_unit_data = function(){
    roYeIn();
    monRen();
    monelectricity();
    monWater();
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
            var totalIncomeHtml = "<h4>年总收入：" + a + "元</h4>";
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
            var totalIncomeHtml = "<h4>参考租金：" + a + "元</h4>";
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
            var totalIncomeHtml = "<h4>" + month + "月用电量：" + a + "度</h4>";
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
            var totalIncomeHtml = "<h4>" + month + "月用水量：" + a + "吨</h4>";
            $("#monWat").html(totalIncomeHtml);
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
                text: '按月收入',
                left: "center",
                textStyle: {
                    fontSize: 20
                }
            },
            tooltip: {
                extraCssText: 'width:250px;height:150px',
                trigger: 'axis',
                axisPointer: {
                   type: "shadow"
                }
            },
            legend: {
                show: true,
                type:"plain",
                data: ['房租', '电费', '水费'],
                right: "4%"
            },
            xAxis: {
                type: "category",
                data: x,
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
            series: [{
                name: '房租',
                type: 'bar',
                data: rent,
                color: '#4169E1',

            },
            {
                name: '电费',
                type: 'bar',
                data: elec_c,
                color:'	#FFA500'
            },
            {
                name: '水费',
                type: 'bar',
                data: wate_c,
                color:'#228B22'
            }]
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
            var a = data['state'];
            console.log(a)
            var totalIncomeHtml = "<h4>房屋状态：" + a + "</h4>";
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