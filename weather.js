var  localData = localStorage.getItem("weather")
if (!localData) {
    localData =[]
}else{
    localData = JSON.parse(localData)
}
function getWeather(city) {
    $.get("https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&APPID=d73520d80a488bd40dc0c091724b64fa", function (data) {
        console.log(data)


        var icon =
            "https://api.openweathermap.org/img/w/" + data.weather[0].icon + ".png";
        $(".icon").attr("src", "icon");


        var temp = data.main.temp;
        var weather = data.weather[0].main;
        var rain = data.h1;

        $(".icon").attr("src", icon);
        $(".weather").append(weather);
        $(".temp").append(temp);

    }
    );
}
function newCityClick(clickCity){
    getWeather(clickCity)
}

function generateList (){
    console.log(localData)
    if(localData.length !== 0){
        var Ul = $('<ul class="list-group">')
        for (let i = 0; i < localData.length; i++) {
           var newLi = $('<li class="list-group-item">').text(localData[i])
            newLi.click(function(){newCityClick(localData[i])})
            Ul.prepend(newLi)
        }
        $("#previousSearch").empty()
        $("#previousSearch").append(Ul)
        getWeather(localData[localData.length-1])
    }
}

$("#citySearch").submit(function(event){
    event.preventDefault()
    var cityName = $("#cityName").val()
    if(cityName==="") return
    console.log(cityName)
   
    localData.push(cityName)
    localStorage.setItem("weather", JSON.stringify(localData))
    generateList()
})
generateList()