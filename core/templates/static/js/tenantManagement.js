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
            var tblInfoCode = dynamic_table(data)
            console.log(tblInfoCode)
            $("#userInfoTbl").html(tblInfoCode);
        } else {
            alert("无数据")
        }
    });
}

editUser = function() {
    var x = $(this).parent().parent().find("td");
    var y = x.eq(0).text()
    var data = $(this)
    var id = $(this).attr("id")
    console.log(id)
}