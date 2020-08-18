function getUserInfoRaw(){
    var obj = document.getElementById('region');
    var index = obj.selectedIndex;
    var region = obj.options[index].value;

    var obj = document.getElementById("roomNum");
    var index =  obj.selectedIndex;
    var roomNum = obj.options[index].value;
    var tableInfo = document.getElementById('userInfoTbl');


    //    发起向服务端的请求
    xmlhttp=new XMLHttpRequest();
    var url = "/api/v1/tenant/getUserInfo?region=" +region + "&roomNum=" + roomNum;
    console.log(url)
    xmlhttp.open("GET", url, true);

    xmlhttp.send();

    var roomNumJson = ""
    //给ajax设置事件(这里最多感知4[1-4]个状态)
    xmlhttp.onreadystatechange = function(){
        //5.获取响应
        if(xmlhttp.readyState == 4 && xmlhttp.status == 200){
            //使用JSON.parse方法将json字符串解析称为json对象
            var response = xmlhttp.responseText
            userInfo = JSON.parse(response);

            new_element=document.createElement("script");
            new_element.setAttribute("type","text/javascript");
            new_element.setAttribute("src","framework.js");

            var tblInfoCode = '<table border="1">'
            tblInfoCode += dynamic_table(userInfo)
            tblInfoCode += '</TABLE>'
            tableInfo.innerHTML = tblInfoCode;
        }
    }
}

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
        $('#addUserWindow').attr('hidden','hidden');
        //一些操作
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