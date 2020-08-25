yearIncome = function(){
    var myChart = echarts.init(document.getElementById('yearincome'));
    var region = $('#region option:selected').val();
    var year = $('#texyear').val();
    var url1 = "/api/v1/region/yearIncome?region=" +region+ "&year=" + year;
    var url2 = "/api/v1/region/yearIncome_bar?region=" +region+ "&year=" + year;
    console.log(url1);
    console.log(url2);

    $.get(url1,function(data,status){
        if(status == 'success'){
            console.log(data)
            var y = data
            alert("数据："+ y);
        }

        //$(#"show").html(y);
        else {
            alert("无数据")
        }

    });

}