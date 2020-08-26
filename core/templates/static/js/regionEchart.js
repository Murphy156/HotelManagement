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
            var a = data;
            var sum_tol = data[0].sum_rent;
            var x = new Array();
            for (i = 0;i < a.length; i++){
                x[i] = a[i].sum_rent;
            }
            console.log(x)
        }
        //$(#"show").html(y);
        else {
            alert("无数据")
        }
    });
}

//这里得到的数据是 某一区域，某一年：1、月总收入，2、月总电费，3、月总水费
nowIncome = function(){
    var myChart = echarts.init(document.getElementById('nowincome'));
    var region = $('#region option:selected').val();
    var year = $('#texyear').val();
    var url = "/api/v1/region/allMonth?region=" +region+ "&year=" + year;
    console.log(url);

    $.get(url,function(data,status){
        if(status == 'success'){
            console.log(data)
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
            console.log(data)
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
        }
     });
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
        }
     });
}

rentAlRate = function(){
     var myChart = echarts.init(document.getElementById('Rentalrate'));
     var region = $('#region option:selected').val();
     var url = "/api/v1/region/roRentRate?region=" +region;
     console.log(url);

     $.get(url,function(data,status){
        if(status == 'success'){
            console.log(data)
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