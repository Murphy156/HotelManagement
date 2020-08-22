get Region_annual_income() = function(){
    var year = $('#texDate').val();
    var region = $('#region option:selected').val();
    var url  = "/api/v1/common/getRoomNum?region=" +region+ "&year" + year;

}