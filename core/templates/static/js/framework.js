//页面左侧菜单栏
function initTree() {
    var navWrap=document.getElementById("olTree");
    var nav1s=navWrap.getElementsByTagName("label");
    var nav2s=navWrap.getElementsByTagName("ol");
    var navA=navWrap.getElementsByTagName("a");
    for(var n=0;n<navA.length;n++){
        navA[n].onclick=(function(n){
          return function(){
            for(var m=0;m<navA.length;m++){
              navA[m].style.backgroundColor="#f2f2f2";
              navA[m].style.color="#333333";
            }
            navA[n].style.backgroundColor="#a7a7a7";
            navA[n].style.color="#fff";
          }
        })(n)
    }
    for(var i=0,len=nav1s.length;i<len;i++){
        nav1s[i].onclick=(function(i){
          return function(){
            for(var j=0;j<len;j++){
              nav2s[j].style.display="none";
            }
            nav2s[i].style.display="block";
          }
        })(i)
    }
}

//伸缩功能
function slideBtn() {
    $('.leftBox').toggle();
    var status = $('.leftBox').css("display");
    if (status == 'none') {
        $('.rightBox').css("marginLeft", "0");
        $(this).css("background",
                "red");
    } else {
        $('.rightBox').css("marginLeft", "241px");
        $(this).css("background",
                "green");
    }
}

//获取房间号
function getRoomNum() {
    var obj = document.getElementById('region');
    var index = obj.selectedIndex;
    var region = obj.options[index].value;
    var roomNumSelections = document.getElementById("roomNum");
    roomNumSelections.options.length=0;
    console.log(region)
//    发起向服务端的请求
    xmlhttp=new XMLHttpRequest();

    var roomNumJson = ""
    //给ajax设置事件(这里最多感知4[1-4]个状态)
    xmlhttp.onreadystatechange = function(){
        //5.获取响应
        //responseText        以字符串的形式接收服务器返回的信息
//        console.log(xmlhttp.readyState);
        if(xmlhttp.readyState == 4 && xmlhttp.status == 200){
            //使用JSON.parse方法将json字符串解析称为json对象
            var response = xmlhttp.responseText
            roomNumJson = JSON.parse(response);
            var optionstring = "";
            for (var item in roomNumJson)
            {
                //设置下拉列表中的值的属性
                var option = document.createElement("option");
                option.value = roomNumJson[item];
                option.text= roomNumJson[item];
                //将option增加到下拉列表中。
                roomNumSelections.options.add(option);
                optionstring += "<option value=\""+ roomNumJson[item] +"\" >"+ roomNumJson[item] +"</option>";
            }
            console.log(optionstring)
        }
    }
    xmlhttp.open("GET","/api/v1/common/getRoomNum?region=" +region,true);
    xmlhttp.send();
}


function dynamic_table(rawData) {
//    set header
    headers = rawData.header;
    tbl_header = "<tr>";
    for (var key in headers) {
        tbl_header += "<th>" + headers[key] + "</th>";
    }
    tbl_header += "<th>操作</th></tr>";
    console.log(tbl_header);

//    set body
    body = rawData.body;
    tbl_body = "";
    var button = '<td><input type="button" name="edit" value="编辑" onclick="editUser()"><input type="button" name="delete" value="删除" onclick="deleteUser()"></td>'
    for (index in body) {
        var rowID = '<tr id="{id}">'
        rowID = rowID.format({id:body[index]['id']})
//        tbl_body += "<tr>";
        for (var key in headers) {
            tbl_body += "<td>" + body[index][key] + "</td>";
        }
        tbl_body += button + "</tr>";
    }
    console.log(tbl_body);

    table_output = tbl_header + tbl_body;
    return table_output;
}


String.prototype.format = function(args) {
    var result = this;
    if (arguments.length > 0) {
        if (arguments.length == 1 && typeof (args) == "object") {
            for (var key in args) {
                if(args[key]!=undefined){
                    var reg = new RegExp("({" + key + "})", "g");
                    result = result.replace(reg, args[key]);
                }
            }
        }
        else {
            for (var i = 0; i < arguments.length; i++) {
                if (arguments[i] != undefined) {
                    //var reg = new RegExp("({[" + i + "]})", "g");//这个在索引大于9时会有问题
                    var reg = new RegExp("({)" + i + "(})", "g");
                    result = result.replace(reg, arguments[i]);
             }
          }
       }
   }
   return result;
}