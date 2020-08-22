//获取用户信息
getMonthlyInfo = function() {
    var region = $('#region option:selected').val();
    var room = $('#roomNum option:selected').val();
    var url = "/api/v1/monthly/getMonthlyInfo?region=" +region + "&roomNum=" + room;
    console.log(url);

    $.get(url,function(data,status){
        if(status == 'success') {
            var button = '<td><input type="button" id = "editMonthly" name="editMonthly" value="编辑" onclick="editMonthly()"><input type="button" id = "deleteMonthly" name="deleteMonthly" value="删除" onclick="deleteMonthly()"></td>'
            var tblInfoCode = dynamic_table(data, button)
            console.log(tblInfoCode)
            $("#monthlyInfoTbl").html(tblInfoCode);
        } else {
            alert("无数据")
        }
    });
}

editMonthly = function() {
    $('#editMonthly').click(function(){
        $('#addMonthlyWindow').removeAttr('hidden');
    })
    //确认
    $('#btn_addMonthly_ok').click(function(){
      $('#addMonthlyWindow').attr('hidden','hidden');
    })
    //取消
    $('#btn_addMonthly_cancel').click(function(){
        $('#addMonthlyWindow').attr('hidden','hidden');
    })
}

addMonthly = function() {
    $('#addMonthly').click(function(){
        $('#addMonthlyWindow').removeAttr('hidden');
    })
    //确认
    $('#btn_addMonthly_ok').click(function(){
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
            "year":year,
            "month":month,
            "name":name,
            "building":rent,
            "room":room,
            "water":water,
            "w_c":w_c,
            "electricity":electricity,
            "e_c":e_c,
            "ref_rent":rent,
            "rent":rent
        }
        var url = "/api/v1/monthly/addMonthly"
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

        $('#addMonthlyindow').attr('hidden','hidden');
    })
    //取消
    $('#btn_addMonthly_cancel').click(function(){
        $('#addMonthlyWindow').attr('hidden','hidden');
    })
}

importMonthly = function() {
    $('#importMonthly').click(function(){
        $('#importMonthlyWindow').removeAttr('hidden');
    })
    //导入模板
    $('#bnt_import_monthly').click(function(){
        alert("弹窗，选择excel导入");
        //todo
    })
    //取消
    $('#btn_import_cancel').click(function(){
        $('#importMonthlyWindow').attr('hidden','hidden');
    })
}

downloadTemplate = function() {
    $('#a_download_template').click(function(){
        alert("弹出下载模板框");
    })
}


deleteMonthly = function(){
    $('#deleteMonthly').click(function(){
        $('#deleteMonthlyWindow').removeAttr('hidden');
    })
    //确认
    $('#btn_delMonthly_ok').click(function(){
        var id = $("#id").val();
        var postData = {
            "id" = id
        }
        var url = "/api/v1/monthly/deleteMonthly"
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
        $('#deleteMonthlyWindow').attr('hidden','hidden');

    })
    //取消
    $('#btn_delMonthly_cancel').click(function(){
        $('#deleteMonthlyWindow').attr('hidden','hidden');
    })
}