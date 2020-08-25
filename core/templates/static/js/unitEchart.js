//这里得到的数据是某一区域，某一年，某一房间号：年总收入
roYeIn = function(){
    var myChart = echarts.init(document.getElementById('roYearInc'));
    var region = $('#region option:selected').val();
    var year = $('#yearDate').val();
    var room = $('#roomNum').val();
    var url = "/api/v1/unit/roomAllInc?region=" + region + "&year=" + year +  "&room=" + room;
    console.log(url);

    $.get(url,function(data,status){
        if(status == 'success'){
            console.log(data)
        }
    });
}

// 这里得到的数据是某一区域，某一房间的参考租金
monRen = function(){
    var myChart = echarts.init(document.getElementById('monRent'));
    var region = $('#region option:selected').val();
    var room = $('#roomNum').val();
    var url = "/api/v1/unit/roomRent?region=" + region +  "&room=" + room;
    console.log(url);

    $.get(url,function(data,status){
        if(status == 'success'){
            console.log(data)
        }
    });
}

// 这里得到的数据是某一区域，某一房间，某一时间的用电量
monelectricity = function(){
    var myChart = echarts.init(document.getElementById('monEclet'));
    var region = $('#region option:selected').val();
    var year = $('#yearDate').val();
    var room = $('#roomNum').val();
    var month = $('#monthData').val();
    var url = "/api/v1/unit/elecConsum?region=" + region + "&year=" + year + "&room=" + room + "&month=" + month;
    console.log(url);

    $.get(url,function(data,status){
        if(status == 'success'){
            console.log(data)
        }
    });
}

// 这里得到的数据是某一区域，某一房间，某一时间的用水量
monWater = function(){
    var myChart = echarts.init(document.getElementById('monWat'));
    var region = $('#region option:selected').val();
    var year = $('#yearDate').val();
    var room = $('#roomNum').val();
    var month = $('#monthData').val();
    var url = "/api/v1/unit/waterConsum?region=" + region + "&year=" + year + "&room=" + room + "&month=" + month;
    console.log(url);

    $.get(url,function(data,status){
        if(status == 'success'){
            console.log(data)
        }
    });
}

// 这里得到的数据是某一区域，某一房间，某一时间的用水量
roIncClafi = function(){
    var myChart = echarts.init(document.getElementById('roomIncClafi'));
    var region = $('#region option:selected').val();
    var year = $('#yearDate').val();
    var room = $('#roomNum').val();
    var url = "/api/v1/unit/roomincClafi?region=" + region + "&year=" + year + "&room=" + room;
    console.log(url);

    $.get(url,function(data,status){
        if(status == 'success'){
            console.log(data)
        }
    });
}
