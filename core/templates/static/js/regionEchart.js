// 这里返回一个收入总数
sum = function(data){
    var a = data;
    var sum_tol = data[0].sum_rent;
    var x = new Array();
    for (i = 0;i < a.length; i++){
        x[i] = a[i].sum_rent;
    }
    sum = x[0];
    return sum;
}

//这里实现的是每月收入（专用：yearIncome（））
regiMon1 = function(data){
    var a = data;
    var x = new Array();
    for (i = 0;i < a.length; i++){
        x[i] = a[i].sum_rent;
    }
    var y = new Array();
    for (i = 0;i<x.length-1;i++){
        y[i] = x[i+1];
    }
    return y;
}

//按月收入（专用：）
regiMon2 = function(data){
    var a = data;
    var x = new Array();
    for (i = 0;i < a.length; i++){
        x[i] = a[i].sum_rent;
    }
    var y = new Array();
    for (i = 0;i<x.length;i++){
        y[i] = x[i];
    }
    return y;
}

// 得到的数据是 某年某区域 1、年总收入，2、每月收入
yearIncome = function(){
    var myChart = echarts.init(document.getElementById('yearincome'));
    var region = $('#region option:selected').val();
    var year = $('#texyear').val();
    var url1 = "/api/v1/region/yearIncome?region=" +region+ "&year=" + year;
    console.log(url1);

    $.get(url1,function(data,status){
        if(status == 'success'){
            console.log(data)
            sum1 = sum(data); //sum1是年总收入
            console.log(sum1)
            mon = regiMon1(data); //mon是每月收入
            console.log(mon)
        }
        $("#test1").html(sum1);

    });
}

//这里得到的数据是 某一区域，某一年：1、当月总收入，2、当月总电费，3、当月总水费
nowIncome = function(){
    var myChart = echarts.init(document.getElementById('nowincome'));
    var region = $('#region option:selected').val();
    var year = $('#texyear').val();
    var url = "/api/v1/region/allMonth?region=" +region+ "&year=" + year;
    console.log(url);

    $.get(url,function(data,status){
        if(status == 'success'){
            console.log(data)  // 数据：[{'month': '7', 'mon_rent': 12142.0}, {'month': '7', 'sum_w_c': 45.0}, {'month': '7', 'sum_e_c': 2107.0}]
            var mo_rent = data[0].mon_rent;
            console.log(mo_rent)
            var w_c = data[1].sum_w_c;
            console.log(w_c)
            var e_c = data[2].sum_e_c;
            console.log(e_c)
        }
        //$(#"show").html(y);
        else {
            alert("无数据")
        }
    });
}
//这里得到的数据是 某一区域，某一年，某一月：1、某月客房均价
aveRoomPri = function(){
    var myChart = echarts.init(document.getElementById('averRoomPri'));
    var region = $('#region option:selected').val();
    var year = $('#texyear').val();
    var month = $('#texmonth').val();
    var url = "/api/v1/region/aveHousePri?region=" +region+ "&year=" + year + "&month=" + month;
    console.log(url);

    $.get(url,function(data,status){
        if(status == 'success'){
            console.log(data)  //数据形式：{'avg(rent)': 433.64285714285717}
            average = data; //data是直接返回来的值
        }
    });
}

//这里得到的数据是按月收入，某区域，某年：1、每个月的收入统计
monthCome = function(){
     var myChart = echarts.init(document.getElementById('monthcome'));
     var region = $('#region option:selected').val();
     var year = $('#texyear').val();
     var url = "/api/v1/region/regMonInc?region=" +region+ "&year=" + year;
     console.log(url);

     $.get(url,function(data,status){
        if(status == 'success'){
            console.log(data)
            mon = regiMon2(data); //mon是每月收入
            console.log(mon)
        }
     });
}

//这里返回的是 按月房租（专用于incClaFi（））
rentmon = function(data){
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
//这里得到的数据是收入分类占比
incClaFi = function(){
     var myChart = echarts.init(document.getElementById('incClafi'));
     var region = $('#region option:selected').val();
     var year = $('#texyear').val();
     var url = "/api/v1/region/incClafi?region=" +region+ "&year=" + year;
     console.log(url);

     $.get(url,function(data,status){
        if(status == 'success'){
            console.log(data)
            var rent = rentmon(data);//这里返回的是按月房租收入
            console.log(rent)
            var elec_c = elect(data);//这里返回的是按月电费收入
            console.log(elec_c)
            var wate_c = water(data);//这里返回的是按月水费收入
            console.log(wate_c)
        }
     });
}

//这里返回的是出租率
rentAlRate = function(){
     var myChart = echarts.init(document.getElementById('Rentalrate'));
     var region = $('#region option:selected').val();
     var url = "/api/v1/region/roRentRate?region=" +region;
     console.log(url);

     $.get(url,function(data,status){
        if(status == 'success'){
            console.log(data)
            var a = data; //这里返回的是出租率数据
        }
     });
}

roomNumb = function(){
     var myChart = echarts.init(document.getElementById('roomnumb'));
     var region = $('#region option:selected').val();
     var url = "/api/v1/region/roomNumb?region=" +region;
     console.log(url);

     $.get(url,function(data,status){
        if(status == 'success'){
            console.log(data)
        }
     });
}