function server() {
    console.log("clicked");
    var cityName=$("#cityArea").val();
    $.ajax(
        {
            type:'GET',
            url:"http://api.openweathermap.org/data/2.5/weather?q="+cityName+"&appid=27d43832d2a4adcb97fcbfa23db130aa",
            success:(res)=>{
                console.log(res);
                 $("table").removeClass("tableHide");
                $("#currentPressure").html(res.main.pressure);
                $("#currentTemperature").html(res.main.temp);
                $("#currentHumidity").html(res.main.humidity);
            },
            error:function(){
                console.log("errror");  
            }

        }                                                                                                                                                                                                             
    )
}
function fetchGraph(){
    var cityName=$("#cityArea").val();
    $.ajax({
        type:'GET',
        url:'http://api.openweathermap.org/data/2.5/forecast?q='+cityName+'&appid=27d43832d2a4adcb97fcbfa23db130aa',
        success:(data)=>{
            var response=data;
            console.log(data);
            listOfDates = data.list.map((ele) => moment(ele.dt * 1000).format('dddd, h:mm a'));
            console.log(listOfDates);
            listOfTemp = data.list.map(ele => Math.round(ele.main.temp - 270));
            console.log(listOfTemp);
            plotChart(listOfTemp, listOfDates);
        },
        error:(err)=>{
            console.log("erroormessaghe");
        }
    });
}
const plotChart = (tempArr, datesArr) => {
    $('#grapharea').show();
    var cityName=$("#cityArea").val(); 
    Highcharts.chart('grapharea', {
        chart: {
            type: 'spline'
        },
        title: {
            text: 'Monthly Average Temperature'
        },
        xAxis: {
            categories: datesArr
        },
        yAxis: {
            title: {
                text: 'Temperature'
            },
            labels: {
                formatter: function () { return this.value + '°'; }
            }
        },
        tooltip: {
            crosshairs: true,
            shared: true
        },
        plotOptions: {
            spline: {
                marker: {
                    radius: 4,
                    lineColor: '#666666',
                    lineWidth: 1
                }
            }
        },
        series: [{
            name: cityName,
            marker: {
                symbol: 'square'
            },
            data: tempArr

        }]
    });
}

