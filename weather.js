var apiKey="d73520d80a488bd40dc0c091724b64fa"
var localData = localStorage.getItem("weather")
if (!localData) {
    localData = []
} else {
    localData = JSON.parse(localData)
}

function get5Day(city){
        $.get("https://api.openweathermap.org/data/2.5/forecast?q="+city+"&units=imperial&appid="+apiKey, function(weather){
            $("#Andys-forecast").empty()
            for (let i = 0; i < weather.list.length; i++) {
                var currHour = weather.list[i]
                if(currHour.dt_txt.includes("12:00:00")){
                    console.log(currHour)
                    var dayCard = $("<div class='card bg-primary mx-1 text-white'>").text(moment.unix(currHour.dt).format("l"))
                    var temp5 = $("<div>").text("Temp: " + currHour.main.temp + "°F")
                    var icon5 = "https://api.openweathermap.org/img/w/" + currHour.weather[0].icon + ".png";
                    var img5 =$("<img>").attr("src", icon5);
                    img5.attr("width", "50px")
                    var humid5 = $("<div>").text("Humidity: "  + currHour.main.humidity + "%")
                    
                    var wind5 =  $("<div>").text("Wind: "  + currHour.wind.speed + "mph")
                      
                    dayCard.append(img5,temp5, humid5, wind5)
                    
                    $("#Andys-forecast").append(dayCard)
                }
                
            }
        })
    // some api call

    

}
function getWeather(city) {
    $.get("https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&APPID="+apiKey, function (data) {
        $.get("https://api.openweathermap.org/data/2.5/uvi?appid="+apiKey+"&lat="+data.coord.lat+"&lon="+data.coord.lon, function (uv) {

            console.log(data)
            var curr = $("#currentWeather")
            curr.empty()
            var newH2 = $("<h2>").text(data.name)
            var date = moment.unix(data.dt).format("l");
            newH2.append(" (" + date + ")")
            
            var icon = "https://api.openweathermap.org/img/w/" + data.weather[0].icon + ".png";
            newH2.append($("<img>").attr("src", icon));
            var temp = $("<div>").text("Temperature: " + data.main.temp + "°F")
            var humidity = $("<div>").text("Humidity: " + data.main.humidity + "%")
            var wind = $("<div>").text("Wind Speed: " + data.wind.speed + "mph")
            var uv = $("<div>").text("UV: "+ uv.value)


            curr.append(newH2,temp, humidity, wind, uv)

        }
        );  
    })
    get5Day(city)
}

    
   
function newCityClick(clickCity) {
    getWeather(clickCity)
}

function generateList() {

    if (localData.length !== 0) {
        var Ul = $('<ul class="list-group">')
        for (let i = 0; i < localData.length; i++) {
            var newLi = $('<li class="list-group-item citySelect">').text(localData[i])
            newLi.click(function () { newCityClick(localData[i]) })
            Ul.prepend(newLi)
        }
        $("#previousSearch").empty()
        $("#previousSearch").append(Ul)
        getWeather(localData[localData.length - 1])
    }
}

$("#citySearch").submit(function (event) {
    event.preventDefault()
    var cityName = $("#cityName").val()
    if (cityName === "") return
    console.log(cityName)

    localData.push(cityName)
    localStorage.setItem("weather", JSON.stringify(localData))
    generateList()
})
generateList()



