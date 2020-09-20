"use strict"
//获取房间信息
var getRoomInfo = function () {
    var region = $('#region option:selected').val();
    var room = $('#roomNum option:selected').val();
    var url = "/api/v1/room_information/getRoomInfo?region=" + region + "&roomNum=" + room;
    console.log(url);

    $.get(url, function (data, status) {
        if (status == 'success') {
            var button = '<td><input type="button" id = "editRoom" name="editRoom" value="编辑" onclick="editRoom(this)"><input type="button" id = "deleteRoom" name="deleteRoom" value="删除" onclick="deleteRoom(this)"></td>'
            var tblInfoCode = dynamic_table(data, button)
            console.log(tblInfoCode)
            $("#roomInfoTbl").html(tblInfoCode);
        } else {
            alert("无数据")
        }
    });
}

var editRoom = function (obj) {
    var selectedTr = obj;
    if (confirm("确定要修改吗?")) {
//        获取当前行
        var row = selectedTr.parentNode.parentNode;
//        获取当前行第一个单元格的value值
        var id = row.cells[0].childNodes[0].nodeValue;

        $('#addRoomWindow').removeAttr('hidden');

        var building = row.cells[1].childNodes[0].nodeValue;
        var room = row.cells[2].childNodes[0].nodeValue;
        var rent = row.cells[3].childNodes[0].nodeValue;
//        var area = row.cells[4].childNodes[0].nodeValue;
        var air_condition = row.cells[5].childNodes[0].nodeValue;
        var heater = row.cells[6].childNodes[0].nodeValue;
//        var other = row.cells[7].childNodes[0].nodeValue;
//        var reamrk = row.cells[8].childNodes[0].nodeValue;
        var state = row.cells[9].childNodes[0].nodeValue;
        $("#building").val(building);
        $("#room").val(room);
        $("#rent").val(rent);
//        $("#area").val(area);
        $("#air_condition").val(air_condition);
        $("#heater").val(heater);
//        $("#other").val(other);
//        $("#remark").val(reamrk);
        $("#state").val(state);

        $('#btn_addRoom_ok').click(function () {
            var building = $("#building").val();
            var room = $("#room").val();
            var rent = $("#rent").val();
            var area = $("#area").val();
            var air_condition = $("#air_condition").val();
            var heater = $("#heater").val();
            var other = $("#other").val();
            var remark = $("#remark").val();
            var state = $("#state").val();
            var postData = {
                "id": id,
                "building": building,
                "room": room,
                "rent": rent,
                "area": area,
                "air_condition": air_condition,
                "heater": heater,
                "other": other,
                "remark": remark,
                "state": state
            };
            var url = "/api/v1/room_information/editRoom"
            console.log(url);
            //console.log(postData);

            $.ajax({
                //请求类型，这里为POST
                type: 'POST',
                //你要请求的api的URL
                url: url,
                //数据类型，这里我用的是json
                contentType: "application/json",
                dataType: "json",
                data: JSON.stringify(postData), //data: {key:value},
                //data: JSON.stringify(postData2),
                //添加额外的请求头
                success: function (data) {
                    //函数参数 "data" 为请求成功服务端返回的数据
                    console.log(data)
                    return data;
                },
            });

            $('#addRoomWindow').attr('hidden', 'hidden');
        })
    }
    //取消
    $('#btn_addRoom_cancel').click(function () {
        $('#addRoomWindow').attr('hidden', 'hidden');
    })
}


var addRoom = function () {
    $('#addRoomWindow').removeAttr('hidden');

    //确认
    $('#btn_addRoom_ok').click(function () {
        var building = $("#building").val();
        var room = $("#room").val();
        var area = $("#area").val();
        var air_condition = $("#air_condition").val();
        var heater = $("#heater").val();
        var other = $("#other").val();
        var rent = $("#rent").val();
        var remark = $("#remark").val();
        var state = $("#state").val();
        var postData = {
            "building": building,
            "room": room,
            "area": area,
            "air_condition": air_condition,
            "heater": heater,
            "other": other,
            "rent": rent,
            "remark": remark,
            "state": state
        }
        var url = "/api/v1/room_information/addRoom"
        console.log(url);
        console.log(postData);

        $.ajax({
            //请求类型，这里为POST
            type: 'POST',
            //你要请求的api的URL
            url: url,
            //数据类型，这里我用的是json
            contentType: "application/json",
            dataType: "json",
            data: JSON.stringify(postData), //data: {key:value},
            //添加额外的请求头
            success: function (data) {
                //函数参数 "data" 为请求成功服务端返回的数据
                console.log(data)
                return data;
            },
        });

        $('#addRoomWindow').attr('hidden', 'hidden');
    })
    //取消
    $('#btn_addRoom_cancel').click(function () {
        $('#addRoomWindow').attr('hidden', 'hidden');
    })
}
//注意这个函数名跟后端不同
var importRoom = function () {
    $('#importRoom').click(function () {
        $('#importRoomWindow').removeAttr('hidden');
    })
    //导入模板
    $('#bnt_import_room').click(function () {
        alert("弹窗，选择excel导入");
        //todo
    })
    //取消
    $('#btn_import_cancel').click(function () {
        $('#importRoomWindow').attr('hidden', 'hidden');
    })
}

var downloadTemplate = function () {
    $('#a_download_template').click(function () {
        alert("弹出下载模板框");
    })
}


var deleteRoom = function (obj) {
    var selectedTr = obj;
    if (confirm("确定要删除吗?")) {
//        获取当前行
        var row = selectedTr.parentNode.parentNode;
//        获取当前行第一个单元格的value值
        var id = row.cells[0].childNodes[0].nodeValue;
        console.log(id);
        var postData = {
            "id": id
        };
        var url = "/api/v1/room_information/deleteRoom"
        console.log(url);
        console.log(postData);
        $.ajax({
            //请求类型，这里为POST
            type: 'POST',
            //你要请求的api的URL
            url: url,
            //数据类型，这里我用的是json
            contentType: "application/json",
            dataType: "json",
            data: JSON.stringify(postData), //data: {key:value},
            //添加额外的请求头
            success: function (data) {
                //函数参数 "data" 为请求成功服务端返回的数据
                console.log(data)
                return data;
            },
        });
    }
}

