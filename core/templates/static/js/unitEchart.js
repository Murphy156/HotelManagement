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

// 这里得到的数据是某一区域，某一房间，某一年，全年各月的：1用水，2、用电，3、房租收入
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

// 这里返回的值是某一区域，某一房间的房屋状态
cursta = function(){
    var myChart = echarts.init(document.getElementById('curSta'));
    var region = $('#region option:selected').val();
    var room = $('#roomNum').val();
    var url = "/api/v1/unit/curaStat?region=" + region + "&room=" + room;
    console.log(url);

    $.get(url,function(data,status){
        if(status == 'success'){
            console.log(data)
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