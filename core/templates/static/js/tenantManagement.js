//获取用户信息
getUserInfo = function() {
    var region = $('#region option:selected').val();
    var room = $('#roomNum option:selected').val();
    var url = "/api/v1/tenant/getUserInfo?region=" +region + "&roomNum=" + room;
    console.log(url);

    $.get(url,function(data,status){
        if(status == 'success') {
            var button = '<td><input type="button" id = "editUser" name="editUser" value="编辑" onclick="editUser(this)"><input type="button" id = "deleteUser" name="deleteUser" value="删除" onclick="deleteUser(this)"></td>'
            var tblInfoCode = dynamic_table(data, button)
            console.log(tblInfoCode)
            $("#userInfoTbl").html(tblInfoCode);
        } else {
            alert("无数据")
        }
    });
}

editUser = function(obj) {
    var selectedTr = obj;
    if (confirm("确定要修改吗?")) {
//        获取当前行
        var row = selectedTr.parentNode.parentNode;
//        获取当前行第一个单元格的value值
        var id = row.cells[0].childNodes[0].nodeValue;


    $('#addUserWindow').removeAttr('hidden');
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
        var postData = {
            "id":id,
            "building":building,
            "room":room,
            "name":name,
            "rent":rent,
            "deposit":deposit,
            "idcard":idcard,
            "check_in":check_in,
            "contact":contact,
            "living_number":living_number

    };
        var url = "/api/v1/tenant/editUser"
        console.log(url);
        //console.log(postData);

        $.ajax({
             //请求类型，这里为POST
             type: 'POST',
             //你要请求的api的URL
             url: url ,
             //数据类型，这里我用的是json
             contentType: "application/json",
             dataType: "json",
             data: JSON.stringify(postData), //data: {key:value},
             //data: JSON.stringify(postData2),
             //添加额外的请求头
             success: function(data){
               //函数参数 "data" 为请求成功服务端返回的数据
               console.log(data)
               return data;
            },
        });

        $('#addUserWindow').attr('hidden','hidden');
    })
}
    //取消
    $('#btn_addUser_cancel').click(function(){
        $('#addUserWindow').attr('hidden','hidden');
    })
}

addUser = function() {
    $('#addUserWindow').removeAttr('hidden');
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
        var postData = {
            "building":building,
            "room":room,
            "name":name,
            "rent":rent,
            "deposit":deposit,
            "idcard":idcard,
            "check_in":check_in,
            "contact":contact,
            "living_number":living_number
        }
        var url = "/api/v1/tenant/addUser"
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

        $('#addUserWindow').attr('hidden','hidden');
    })
    //取消
    $('#btn_addUser_cancel').click(function(){
        $('#addUserWindow').attr('hidden','hidden');
    })
}

importUser = function() {
    $('#importUserWindow').removeAttr('hidden');
    //导入模板
    $('#upload').on('click', function(){
        alert("弹窗，选择excel导入");
        var formData = new FormData();
        var name = $("#addExcel").val();
        formData.append("file",$("addExcel")[0].files[0]);
        formData.append("name",name);
        var url = "/api/v1/tenant/importUser"

         $.ajax({
                    url: url,
                    type: "post",
                    async: false,
                    data: formData,
                    processData: false,
                    contentType: false,
                    beforeSend:function(){
		            console.log("正在进行，请稍候");
		        },
		        success : function(responseStr) {
		            if(responseStr=="01"){
		                alert("导入成功");
		            }else{
		                alert("导入失败");
		            }
		        }

          });

    });
    //取消
    $('#btn_import_cancel').click(function(){
        $('#importUserWindow').attr('hidden','hidden');
    })
}

//downloadTemplate = function() {
//    alert("弹出下载模板框");
//}


deleteUser = function(obj){
    var selectedTr = obj;
    if (confirm("确定要删除吗?")) {
//        获取当前行
        var row = selectedTr.parentNode.parentNode;
//        获取当前行第一个单元格的value值
        var id = row.cells[0].childNodes[0].nodeValue;
        console.log(id);
        var postData = {
            "id" : id
        };
        var url = "/api/v1/tenant/deleteUser"
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
    }
}

function UpladFile(fileObj) {
                // 通过FormData将文件转成二进制数据
                var form = new FormData(); // FormData 对象
                form.append("file", fileObj); // 文件对象
                url = "/api/v1/tenant/importUser";
                $.ajax({
                    url: url,                      //url地址
                    type: 'POST',                 //上传方式
                    data: form,                   // 上传formdata封装的数据
                    dataType: 'JSON',
                    cache: false,                  // 不缓存
                    processData: false,        // jQuery不要去处理发送的数据
                    contentType: false,         // jQuery不要去设置Content-Type请求头
                    success:function (data) {           //成功回调
                        console.log(data);
                    },
                   error:function (data) {           //失败回调
                        console.log(data);
                    }
                });
             }

function upload() {
        $("#file").click();
        $('#file').change(function (e) {
         var fileName = e.target.files[0];//js 获取文件对象
         UpladFile(fileName);

        /*if(fileName !== undefined){
           var file_typename =   fileName.name.substring(fileName.name.lastIndexOf('.'));
           if (file_typename == '.xlsx' || file_typename == '.xls') {
           $("#filename").css("display","block");
           $("#filename").val(fileName.name);

           }else {
            console.log("请选择正确的文件类型！")
            }
         }else{
       console.log("请选择正确的文件！")
        }*/
});
}