//获取房间信息
getRoomInfo = function() {
    var region = $('#region option:selected').val();
    var room = $('#roomNum option:selected').val();
    var url = "/api/v1/room_information/getRoomInfo?region=" +region + "&roomNum=" + room;
    console.log(url);

    $.get(url,function(data,status){
        if(status == 'success') {
            var button = '<td><input type="button" id = "editRoom" name="editRoom" value="编辑" onclick="editRoom()"><input type="button" id = "deleteRoom" name="deleteRoom" value="删除" onclick="deleteRoom()"></td>'
            var tblInfoCode = dynamic_table(data, button)
            console.log(tblInfoCode)
            $("#roomInfoTbl").html(tblInfoCode);
        } else {
            alert("无数据")
        }
    });
}

editRoom = function() {
    $('#editRoom').click(function(){
        $('#addRoomWindow').removeAttr('hidden');
    })
    //确认
    $('#btn_addRoom_ok').click(function(){
        $('#addRoomWindow').attr('hidden','hidden');
    })
    //取消
    $('#btn_addRoom_cancel').click(function(){
        $('#addRoomWindow').attr('hidden','hidden');
    })
}

addRoom = function() {
    $('#addRoom').click(function(){
        $('#addRoomWindow').removeAttr('hidden');
    })
    //确认
    $('#btn_addRoom_ok').click(function(){
        var building = $("#building").val();
        var room = $("#room").val();
        var area = $("#area").val();
        var air_condition = $("#air_condition").val();
        var heater = $("#heater").val();
        var other = $("#other").val();
        var rent = $("#rent").val();
        var remark = $("#remark").val();
        var postData = {
            "building":building,
            "room":room,
            "area":area,
            "air_condition":air_condition,
            "heater":heater,
            "other":other,
            "rent":rent,
            "remark":remark
        }
        var url = "/api/v1/room_information/addRoom"
        console.log(url);
        console.log(postData);

        $.ajax({
             //请求类型，这里为POST
             type: 'POST',
             //你要请求的api的URL
             url: url ,
             //数据类型，这里我用的是json
             contentType: "application/json",
             dataType: "json",
             data: JSON.stringify(postData), //data: {key:value},
             //添加额外的请求头
             success: function(data){
               //函数参数 "data" 为请求成功服务端返回的数据
               console.log(data)
               return data;
            },
        });

        $('#addRoomWindow').attr('hidden','hidden');
    })
    //取消
    $('#btn_addRoom_cancel').click(function(){
        $('#addRoomWindow').attr('hidden','hidden');
    })
}

importRoom = function() {
    $('#importRoom').click(function(){
        $('#importRoomWindow').removeAttr('hidden');
    })
    //导入模板
    $('#bnt_import_room').click(function(){
        alert("弹窗，选择excel导入");
        //todo
    })
    //取消
    $('#btn_import_cancel').click(function(){
        $('#importRoomWindow').attr('hidden','hidden');
    })
}

downloadTemplate = function() {
    $('#a_download_template').click(function(){
        alert("弹出下载模板框");
    })
}


deleteRoom = function(){
    $('#deleteRoom').click(function(){
        $('#deleteRoomWindow').removeAttr('hidden');
    })
    //确认
    $('#btn_delRoom_ok').click(function(){
        var id = $("#id").val();
        var postData = {
<<<<<<< HEAD
            "id" = id
        }
        var url = "/api/v1/room_information/deleteRoom"
=======
            "id" : id
        };
        var url = "/api/v1/tenant/deleteRoom"
>>>>>>> 5c16344daf8e860517f3bfddd0f736c014548777
        console.log(url);
        console.log(postData);
        $.ajax({
             //请求类型，这里为POST
             type: 'POST',
             //你要请求的api的URL
             url: url ,
             //数据类型，这里我用的是json
             contentType: "application/json",
             dataType: "json",
             data: JSON.stringify(postData), //data: {key:value},
             //添加额外的请求头
             success: function(data){
               //函数参数 "data" 为请求成功服务端返回的数据
               console.log(data)
               return data;
            },
        });
        $('#deleteRoomWindow').attr('hidden','hidden');

    })
    //取消
    $('#btn_delRoom_cancel').click(function(){
        $('#deleteRoomWindow').attr('hidden','hidden');
    })
}