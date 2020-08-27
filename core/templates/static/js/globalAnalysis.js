//这里是查询启动函数
showEcharts = function(){
    var year = $('#yearch').val();
    tolincome(year);
    rentinc(year);
    roomqual();
    shopqual();
    onrent();
    monlinc(year);
    incom(year);
    regipro(year);
}


//这里返回全部物业年的总收入
tolincome = function(year){
    var myChart = echarts.init(document.getElementById('tolInc'));
    /*var year = $('#yearch').val();*/
    var url = "/api/v1/globalanalysis/allIncome?year=" +year;
    console.log(url);

    $.get(url,function(data,status){
        if(status == 'success'){
            console.log(data)
            var toltal = data['sum_rent'];//这里返回全部物业的总收入
            console.log(toltal)

        }
        else {
            alert("无数据")
        }
    });
}

// 这里返回全部房租年的总收入
rentinc = function(year){
    var myChart = echarts.init(document.getElementById('rentInc'));
    /*var year = $('#yearch').val();*/
    var url = "/api/v1/globalanalysis/rentIncome?year=" +year;
    console.log(url);

    $.get(url,function(data,status){
        if(status == 'success'){
            console.log(data)
            var toltal = data['sum_rent'];//这里返回房租的总收入
            console.log(toltal)
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
            var a = data;//直接返回房间数
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
            var a = data;// 这里直接返回商铺数
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
            var a = data;//这里直接返回出租率
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
monlinc = function(year){
    var myChart = echarts.init(document.getElementById('monlInc'));
    /*var year = $('#yearch').val();*/
    var url = "/api/v1/globalanalysis/allIncomeMon?year=" +year;
    console.log(url);

    $.get(url,function(data,status){
        if(status == 'success'){
            console.log(data)
            var a = totalinc(data);
            console.log(a)
        }
        else {
            alert("无数据")
        }
    });
}


// 这里返回收入对比
incom = function(year){
    var myChart = echarts.init(document.getElementById('inCom'));
    /*var year = $('#yearch').val();*/
    var url = "/api/v1/globalanalysis/reveCompar?year=" +year;
    console.log(url);

    $.get(url,function(data,status){
        if(status == 'success'){
            console.log(data)
            var a = totalinc(data);
            console.log(a)
        }
        else {
            alert("无数据")
        }
    });
}


// 这里返回各区域收入对比
regipro = function(year){
    var myChart = echarts.init(document.getElementById('regiPro'));
    /*var year = $('#yearch').val();*/
    var url = "/api/v1/globalanalysis/regionCompar?year=" +year;
    console.log(url);

    $.get(url,function(data,status){
        if(status == 'success'){
            console.log(data)
            var a = totalinc(data);
            console.log(a)
        }
        else {
            alert("无数据")
        }
    });
}