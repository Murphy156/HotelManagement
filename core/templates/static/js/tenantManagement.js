
//获取用户信息
getUserInfo = function() {
    var region = $('#region option:selected').val();
    var room = $('#roomNum option:selected').val();
    var url = "/api/v1/tenant/getUserInfo?region=" +region + "&roomNum=" + room;
    console.log(url);

    $.get(url,function(data,status){
        if(status == 'success') {
            var button = '<td><input type="button" id = "editUser" name="editUser" value="编辑" onclick="editUser()"><input type="button" id = "deleteUser" name="deleteUser" value="删除" onclick="deleteUser()"></td>'
            var tblInfoCode = dynamic_table(data, button)
            console.log(tblInfoCode)
            $("#userInfoTbl").html(tblInfoCode);
        } else {
            alert("无数据")
        }
    });
}

editUser = function() {
    $('#editUser').click(function(){
        alert("编辑用户(样式和新增用户一样)");
    })



}

addUser = function() {
    $('#addUser').click(function(){
        $('#addUserWindow').removeAttr('hidden');
    })
    //确认
    $('#btn_addUser_ok').click(function(){
        var building = $("#building").val();
        var name = $("#name").val();
        var room = $("#room").val();
        var rent = $("#rent").val();
        var deposit = $("#deposit").val();
        var idcard = $("#idcard").val();
        var check_in = $("#check_in").val();
        var contact = $("#contact").val();
        var living_number = $("#living_number").val();
        var url = "/api/v1/tenant/addUser?building=" +building + "&roomNum=" + room + "&name=" + name  + "&rent=" + rent + "&deposit=" + deposit + "&idcard=" + idcard + "&check_in=" + check_in + "&contact=" + contact + "&living_number=" + living_number;
        console.log(url);
        $.post(url);
        $('#addUserWindow').attr('hidden','hidden');
    })
    //取消
    $('#btn_addUser_cancel').click(function(){
        $('#addUserWindow').attr('hidden','hidden');
    })
}

importUser = function() {
    $('#importUser').click(function(){
        $('#importUserWindow').removeAttr('hidden');
    })
    //导入模板
    $('#bnt_import_user').click(function(){
        alert("弹窗，选择excel导入");
        //todo
    })
    //取消
    $('#btn_import_cancel').click(function(){
        $('#importUserWindow').attr('hidden','hidden');
    })
}

downloadTemplate = function() {
    $('#a_download_template').click(function(){
        alert("弹出下载模板框");
    })
}


deleteUser = function(){
    $('#deleteUser').click(function(){
        $('#deleteUserWindow').removeAttr('hidden');
    })
    //确认
    $('#btn_delUser_ok').click(function(){
        $('#deleteUserWindow').attr('hidden','hidden');
        //一些操作
    })
    //取消
    $('#btn_delUser_cancel').click(function(){
        $('#deleteUserWindow').attr('hidden','hidden');
    })
}