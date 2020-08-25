yearIncome = function(){
    var myChart = echarts.init(document.getElementById('yearincome'));
    var region = $('#region option:selected').val();
    var year = $('#texyear').val();
    var url1 = "/api/v1/region/yearIncome?region=" +region+ "&year=" + year;
//    var url2 = "/api/v1/region/yearIncome_bar?region=" +region+ "&year=" + year;
    console.log(url1);
//    console.log(url2);

    $.get(url1,function(data,status){
        if(status == 'success'){
            console.log(data)
            var a = data;
            var sum_tol = data[0].sum_rent;
            var x = new Array();
            for (i = 1;i < a.length; i++){
                x[i] = a[i].sum_rent;
            }
            console.log(x)


        }
        //$(#"show").html(y);
        else {
            alert("无数据")
        }
    });


}