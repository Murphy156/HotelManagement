rateComp = function(){
    var current_month = new Array();
    var new_data = new Array();
    var old_data = new Array();
    var for_year = $('#global_year_choose option:selected').val()-1;
    var year = $('#global_year_choose option:selected').val();
    var url1 = "/api/v1/globalanalysis/renRateCompar?year=" +year;
    var url2 = "/api/v1/globalanalysis/renRateCompar?year=" +for_year;
    console.log(url1);
    console.log(url2);

    $.get(url1,function(data,status){
        if(status == 'success'){
            console.log(data)
            var new_data = ratedeal(data);
            console.log(new_data)
            for (i = 0; i<new_data.length; i++){
                current_month[i] = i+1;
            }
            console.log(current_month)
            }
        else {
            alert("NO DATA")
        }
    });


     $.get(url2,function(data,status){   //jquary中的get函数只能在其内部获取
        if(status == 'success'){
            console.log(data)
            old_data = ratedeal(data);
//            for (i = 0; i<old_data.length; i++){
//                current_month[i] = i+1;
//            }
//            console.log(current_month)
            console.log(new_data)
            console.log(old_data)

            var myChart = echarts.init(document.getElementById('rateCompara'));
            var option = {
            backgroundColor: "#F0FFFF",
            title: {
                text: '出租率同比',
                left: "center",
                textStyle: {
                    fontSize: 20
                }
            },
            tooltip: {
                extraCssText: 'width:250px;height:100px;;',
                trigger: 'axis',
                axisPointer: {
                   type: "shadow"
                }
            },
            legend: {
                data:current_month
            },
            xAxis: {
                type: "category",
                data: current_month,
                axisLabel: {
                    show:true,
                    color:"rgba(86, 72, 72, 1)",
                    fontWeight:"bold",
                    fontSize:10
                }
            },
            yAxis: {
                axisLabel: {
                    show:true,
                    color:"rgba(86, 72, 72, 1)",
                    fontWeight:"bold",
                    fontSize:10
                }
            },
            series: [
            {
                name: year,
                color:'#003366',
                type: 'line',
                data: new_data,
                label:{
                    show: true,
                    color:"rgba(86, 72, 72, 1)",
                    fontWeight:"bolder"
                }
            },
            {
                name: for_year,
                color:'#e5323e',
                type: 'line',
                data: old_data,
                label:{
                    show: true,
                    color:"rgba(86, 72, 72, 1)",
                    fontWeight:"bolder"
                }
            }]
        };
        myChart.setOption(option);
        }
        else {
            alert("无数据")
        }
    });
}




/            console.log(new_data)
//
//            for (i = 0; i<old_data.length; i++){
//                current_month[i] = i+1;
//            }
//            console.log(current_month)
