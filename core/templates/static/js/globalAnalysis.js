//这里返回全部物业年的总收入
tolincome = function(){
    var myChart = echarts.init(document.getElementById('tolInc'));
    var year = $('#yearch').val();
    var url = "/api/v1/globalanalysis/allIncome?year=" +year;
    console.log(url);

    $.get(url,function(data,status){
        if(status == 'success'){
            console.log(data)
        }
        else {
            alert("无数据")
        }
    });
}

// 这里返回全部房租年的总收入
rentinc = function(){
    var myChart = echarts.init(document.getElementById('rentInc'));
    var year = $('#yearch').val();
    var url = "/api/v1/globalanalysis/rentIncome?year=" +year;
    console.log(url);

    $.get(url,function(data,status){
        if(status == 'success'){
            console.log(data)
        }
        else {
            alert("无数据")
        }
    });
}

// 这里返回可租房间数
roomqual = function(){
    var myChart = echarts.init(document.getElementById('roomQual'));
    var url = "/api/v1/globalanalysis/roomQuantity";
    console.log(url);

    $.get(url,function(data,status){
        if(status == 'success'){
            console.log(data)
        }
        else {
            alert("无数据")
        }
    });
}

// 这里返回可租商铺数
shopqual = function(){
    var myChart = echarts.init(document.getElementById('shopQual'));
    var url = "/api/v1/globalanalysis/shopQuantity";
    console.log(url);

    $.get(url,function(data,status){
        if(status == 'success'){
            console.log(data)
        }
        else {
            alert("无数据")
        }
    });
}


// 这里返回当前出租率
onrent = function(){
    var myChart = echarts.init(document.getElementById('onRent'));
    var url = "/api/v1/globalanalysis/rentalRate";
    console.log(url);

    $.get(url,function(data,status){
        if(status == 'success'){
            console.log(data)
        }
        else {
            alert("无数据")
        }
    });
}

// 这里返回全部物业总收入中按月收入分析
monlinc = function(){
    var myChart = echarts.init(document.getElementById('monlInc'));
    var year = $('#yearch').val();
    var url = "/api/v1/globalanalysis/allIncomeMon?year=" +year;
    console.log(url);

    $.get(url,function(data,status){
        if(status == 'success'){
            console.log(data)
        }
        else {
            alert("无数据")
        }
    });
}


// 这里返回收入对比
incom = function(){
    var myChart = echarts.init(document.getElementById('inCom'));
    var year = $('#yearch').val();
    var url = "/api/v1/globalanalysis/reveCompar?year=" +year;
    console.log(url);

    $.get(url,function(data,status){
        if(status == 'success'){
            console.log(data)
        }
        else {
            alert("无数据")
        }
    });
}


// 这里返回收入对比
regipro = function(){
    var myChart = echarts.init(document.getElementById('regiPro'));
    var year = $('#yearch').val();
    var url = "/api/v1/globalanalysis/regionCompar?year=" +year;
    console.log(url);

    $.get(url,function(data,status){
        if(status == 'success'){
            console.log(data)
        }
        else {
            alert("无数据")
        }
    });
}