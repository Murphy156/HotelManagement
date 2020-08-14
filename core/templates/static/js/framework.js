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

//function getRoomNum1() {
//    var obj=document.getElementById("region");
//    $.get("/api/v1/common/getRoomNum?region=" +region,function(data,status){
//        console.log("数据: " + data + "\n状态: " + status);
//    }
//}

//获取房间号
function getRoomNum() {
    var obj = document.getElementById('region');
    var index = obj.selectedIndex;
    var region = obj.options[index].value;
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
            console.log(roomNumJson)
        }
    }

    xmlhttp.open("GET","/api/v1/common/getRoomNum?region=" +region,true);
    xmlhttp.send();

    for(var i=0; i < roomNumJson.length; i++){
    　　for(var key in roomNumJson[i]){
    　　　　console.log(key+':'+roomNumJson[i][key]);
    　　}
    }
}
