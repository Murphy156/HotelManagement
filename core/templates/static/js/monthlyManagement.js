"use strict"
//获取用户信息
var getMonthlyInfo = function () {
    var region = $('#region option:selected').val();
    var room = $('#roomNum option:selected').val();
    var year = $('#monthlyIncomeYear option:selected').val();
    var month = $('#monthlyIncomeMonth option:selected').val();
    var url = "/api/v1/monthly/getMonthlyInfo?region=" + region + "&roomNum=" + room + "&year=" + year + "&month=" + month;
    console.log(url);

    $.get(url, function (data, status) {
        if (status == 'success') {
            var button = '<td><input type="button" id = "editMonthly" name="editMonthly" value="编辑" onclick="editMonthly(this)"><input type="button" id = "deleteMonthly" name="deleteMonthly" value="删除" onclick="deleteMonthly(this)"></td>'
            var tblInfoCode = dynamic_table(data, button)
            console.log(tblInfoCode)
            $("#monthlyInfoTbl").html(tblInfoCode);
        } else {
            alert("无数据")
        }
    });
}

var editMonthly = function (obj) {
    var selectedTr = obj;
    if (confirm("确定要修改吗?")) {
//        获取当前行
        var row = selectedTr.parentNode.parentNode;
//        获取当前行第一个单元格的value值
        var id = row.cells[0].childNodes[0].nodeValue;


        $('#addMonthlyWindow').removeAttr('hidden');
        var year = row.cells[1].childNodes[0].nodeValue;
        var month = row.cells[2].childNodes[0].nodeValue;
        var name = row.cells[3].childNodes[0].nodeValue;
        var building = row.cells[4].childNodes[0].nodeValue;
        var room = row.cells[5].childNodes[0].nodeValue;
        var water = row.cells[6].childNodes[0].nodeValue;
        var w_c = row.cells[7].childNodes[0].nodeValue;
        var electricity = row.cells[8].childNodes[0].nodeValue;
        var e_c = row.cells[9].childNodes[0].nodeValue;
        var ref_rent = row.cells[10].childNodes[0].nodeValue;
        var rent = row.cells[11].childNodes[0].nodeValue;
        $("#year").val(year);
        $("#month").val(month);
        $("#name").val(name);
        $("#building").val(building);
        $("#room").val(room);
        $("#water").val(water);
        $("#w_c").val(w_c);
        $("#electricity").val(electricity);
        $("#e_c").val(e_c);
        $("#ref_rent").val(ref_rent);
        $("#rent").val(rent);

        $('#btn_addMonthly_ok').click(function () {
            var year = $("#year").val();
            var month = $("#month").val();
            var name = $("#name").val();
            var building = $("#building").val();
            var room = $("#room").val();
            var water = $("#water").val();
            var w_c = $("#w_c").val();
            var electricity = $("#electricity").val();
            var e_c = $("#e_c").val();
            var ref_rent = $("#ref_rent").val();
            var rent = $("#rent").val();

            var postData = {
                "id": id,
                "year": year,
                "month": month,
                "name": name,
                "building": building,
                "room": room,
                "water": water,
                "w_c": w_c,
                "electricity": electricity,
                "e_c": e_c,
                "ref_rent": ref_rent,
                "rent": rent
            };


            var url = "/api/v1/monthly/editMonthly"
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

            $('#addMonthlyWindow').attr('hidden', 'hidden');
        })
    }
    //取消
    $('#btn_addMonthly_cancel').click(function () {
        $('#addMonthlyWindow').attr('hidden', 'hidden');
    })
}

var addMonthly = function () {
    $('#addMonthly').click(function () {
        $('#addMonthlyWindow').removeAttr('hidden');
    })
    //确认
    $('#btn_addMonthly_ok').click(function () {
        var year = $("#year").val();
        var month = $("#month").val();
        var name = $("#name").val();
        var building = $("#building").val();
        var room = $("#room").val();
        var water = $("#water").val();
        var w_c = $("#w_c").val();
        var electricity = $("#electricity").val();
        var e_c = $("#e_c").val();
        var ref_rent = $("#ref_rent").val();
        var rent = $("#rent").val();
        var postData = {
            "year": year,
            "month": month,
            "name": name,
            "building": rent,
            "room": room,
            "water": water,
            "w_c": w_c,
            "electricity": electricity,
            "e_c": e_c,
            "ref_rent": rent,
            "rent": rent
        }
        var url = "/api/v1/monthly/addMonthly"
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

        $('#addMonthlyindow').attr('hidden', 'hidden');
    })
    //取消
    $('#btn_addMonthly_cancel').click(function () {
        $('#addMonthlyWindow').attr('hidden', 'hidden');
    })
}

var importMonthly = function () {
    $('#importMonthly').click(function () {
        $('#importMonthlyWindow').removeAttr('hidden');
    })
    //导入模板
    $('#bnt_import_monthly').click(function () {
        alert("弹窗，选择excel导入");
        //todo
    })
    //取消
    $('#btn_import_cancel').click(function () {
        $('#importMonthlyWindow').attr('hidden', 'hidden');
    })
}

downloadTemplate = function () {
    $('#a_download_template').click(function () {
        alert("弹出下载模板框");
    })
}


var deleteMonthly = function (obj) {
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
        var url = "/api/v1/monthly/deleteMonthly "
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