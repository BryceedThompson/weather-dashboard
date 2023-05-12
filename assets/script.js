// build a weather dashboard that will run in the browser and feature dynamically updated HTML and CSS.

// Use the 5 Day Weather Forecast to retrieve weather data for cities. The base URL should look like the following:{27a78ec5884e4d224e3f074788088534}

// use localStorage to store any persistent data. For more information

// WHEN I search for a city THEN I am presented with current and future conditions for that city and that city is added to the search history

// WHEN I view current weather conditions for that city THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, and the wind speed

// WHEN I view future weather conditions for that city THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, the wind speed, and the humidity

// WHEN I click on a city in the search history THEN I am again presented with current and future conditions for that city

var searchBtn = document.querySelector("#searchBtn");
var weatherDisplay=document.querySelector(".weatherDisplay");
var searchForm=document.querySelector('.searchForm');
var historyList=document.querySelector('.search_history');
var today=dayjs();
var historyStore=JSON.parse(localStorage.getItem('history'));


// function that will take input of city and get the lat and lon cords for other function
function cityWeather(city) {
    var weatherAPI = 'http://api.openweathermap.org/geo/1.0/direct?q=' + city + '&lang=en&limit=6&appid=27a78ec5884e4d224e3f074788088534';
  
    fetch(weatherAPI).then(function (response) {

        if (response.ok) {
            response.json().then(function (data) {

                for (let i = 0; i < data.length; i++) {

                    if (data[i].name.toUpperCase()===city.toUpperCase()) {
                        let lat=data[i].lat;
                        let lon=data[i].lon;
                        displayWeather( lat,lon);
                        return;
                    }
                } 
            });
        }
    });
}

// function that uses lat and lon cords to get data that we want from openweather such as temp, wind, humitity, for the next 5 days
function displayWeather( lat,lon){
    var weatherAPI='https://api.openweathermap.org/data/2.5/forecast?lat='+lat+'&lon='+lon+'&units=imperial&lang=en&appid=27a78ec5884e4d224e3f074788088534';
    fetch(weatherAPI).then(function (response) {
        if (response.ok) {
            response.json().then(function (data) {
                console.log(data);
      
                var dateToday = Number(today.format('DD')); //get today's date
                var day2samp = 0, temprature2 = 0, wind2 = 0, humidity2 = 0 ,iconLink2 = [];
                var day3samp = 0, temprature3 = 0, wind3= 0 , humidity3 = 0,iconLink3 = [];
                var day4samp = 0,temprature4 = 0, wind4 = 0, humidity4 = 0,iconLink4 = [];
                var day5samp = 0,temprature5 = 0, wind5 = 0, humidity5 = 0,iconLink5 = [];
                var day6samp = 0,temprature6 = 0, wind6 = 0, humidity6 = 0,iconLink6 = [];
        
                for (let i = 0; i < data.list.length; i++) {
                    var dateGMTstring = dayjs(data.list[i].dt_txt).format('dddd, D MMM YYYY, HH:ss:ss[ GMT]');
                    var sampTime = new Date(dateGMTstring);
                    var sampTimeLocal = sampTime.toLocaleString();
                    var date = Number(dayjs(sampTimeLocal).format('DD'));

                    if (dateToday === date){
                        var date1 = dayjs(sampTimeLocal).format('MM/DD/YYYY');
                        var iconLink1 ='http://openweathermap.org/img/wn/'+ data.list[0].weather[0].icon + '@2x.png'
                        var temprature1 = data.list[0].main.temp;
                        var wind1 = data.list[0].wind.speed;
                        var humidity1 = data.list[0].main.humidity;
              
                    }else if(dateToday === (date-1)){
                        var date2 = dayjs(sampTimeLocal).format('MM/DD/YYYY');
                        iconLink2.push('http://openweathermap.org/img/wn/' + data.list[i].weather[0].icon +'@2x.png');
                        temprature2=(temprature2 + data.list[i].main.temp);
                        wind2 = (wind2 + data.list[i].wind.speed);
                        humidity2 = (humidity2 + data.list[i].main.humidity);
                        day2samp ++;
              
                    }else if(dateToday === (date-2)){
                        var date3 = dayjs(sampTimeLocal).format('MM/DD/YYYY');
                        iconLink3.push('http://openweathermap.org/img/wn/' + data.list[i].weather[0].icon+'@2x.png');
                        temprature3 = (temprature3 + data.list[i].main.temp);
                        wind3 = (wind3 + data.list[i].wind.speed);
                        humidity3 = (humidity3 + data.list[i].main.humidity);
                        day3samp ++;

                    }else if(dateToday === (date-3)){
                        var date4 = dayjs(sampTimeLocal).format('MM/DD/YYYY');
                        iconLink4.push('http://openweathermap.org/img/wn/' + data.list[i].weather[0].icon+'@2x.png');
                        temprature4 = (temprature4 + data.list[i].main.temp);
                        wind4 = (wind4 + data.list[i].wind.speed);
                        humidity4 = (humidity4 + data.list[i].main.humidity);
                        day4samp ++;

                    }else if(dateToday === (date-4)){
                        var date5 = dayjs(sampTimeLocal).format('MM/DD/YYYY');
                        iconLink5.push('http://openweathermap.org/img/wn/' + data.list[i].weather[0].icon+'@2x.png');
                        temprature5 = (temprature5 + data.list[i].main.temp);
                        wind5 = (wind5 + data.list[i].wind.speed);
                        humidity5 = (humidity5 + data.list[i].main.humidity);
                        day5samp ++;

                    }else if(dateToday === (date-5)){
                        var date6 = dayjs(sampTimeLocal).format('MM/DD/YYYY');
                        iconLink6.push('http://openweathermap.org/img/wn/' + data.list[i].weather[0].icon+'@2x.png');
                        temprature6 = (temprature6 + data.list[i].main.temp);
                        wind6 = (wind6 + data.list[i].wind.speed);
                        humidity6=(humidity6 + data.list[i].main.humidity);
                        day6samp ++;
                     }
            
                }

                var result = {
                    cityName:data.city.name,
                    dates: [date1,date2,date3,date4,date5,date6],
                    iconlink: [iconLink1,iconLink2,iconLink3,iconLink4,iconLink5,iconLink6],
                    temprature: [temprature1,temprature2/day2samp,temprature3/day3samp,temprature4/day4samp,temprature5/day5samp,temprature6/day6samp],
                    wind: [wind1,wind2/day2samp,wind3/day3samp,wind4/day4samp,wind5/day5samp,wind6/day6samp],
                    humidity: [humidity1,humidity2/day2samp,humidity3/day3samp,humidity4/day4samp,humidity5/day5samp,humidity6/day6samp]
                }
                console.log(result);
                showWeather(result);
                return;
            });
        }
    });
}

// function that will recive weatherdata from other function and render it on the page and make html elements for them
function showWeather (resultObj) {
    weatherDisplay.innerHTML="";
  
    var firstDay = document.createElement('div');
    firstDay.classList.add('row','me-0');
  
    var firstDayBody = document.createElement('div');
    firstDayBody.classList.add('col-12', 'col-sm-12', 'firstDay');
    
    var title=document.createElement('h3');
    title.innerHTML=resultObj.dates[0] + '('+ resultObj.cityName +')'+"<img src="+ resultObj.iconlink[0]+ '>'

    if (!historyStore.includes(resultObj.cityName)) {
       historyStore.push(resultObj.cityName);
       localStorage.setItem('history', JSON.stringify(historyStore));
       showSearchHistory(historyStore);
    }

    var temp1=document.createElement('div');
    temp1.textContent='Temp: '+resultObj.temprature[0]+' F';
  
    var Wind1=document.createElement('div');
    Wind1.textContent='Wind: '+ resultObj.wind[0]+ ' MPH';
  
    var humidity1=document.createElement('div');
    humidity1.textContent='Humidity: '+ resultObj.humidity[0]+ ' %';
  
    var forcastTitle=document.createElement('h2');
    forcastTitle.classList.add('row');
    forcastTitle.textContent='5 day forcast:';

    var forcastContainer=document.createElement('div');
    forcastContainer.classList.add('row', 'grid', 'gap-1','me-0');

    weatherDisplay.append(firstDay,forcastTitle,forcastContainer);
    firstDay.append(firstDayBody);
    firstDayBody.append(title, temp1, Wind1, humidity1);
   
    for (let i = 1; i < 6; i++) {
      var weather=document.createElement('div');
      weather.classList.add('col-12', 'col-sm-2', 'weather_card');
  
      
      var weatherTitle=document.createElement('h6');
      weatherTitle.textContent=resultObj.dates[i];
      
      var weatherIcon=document.createElement('img');
      if (resultObj.iconlink[i].length>1) {
        var index=Math.trunc((resultObj.iconlink[i].length)/2);
        weatherIcon.setAttribute('src',resultObj.iconlink[i][index] )
      } else {
        weatherIcon.setAttribute('src',resultObj.iconlink[i][0]);
      }
      
      var weatherTemp=document.createElement('div');
      weatherTemp.textContent=resultObj.temprature[i].toFixed(2) + ' F';
  
      var weatherWind=document.createElement('div');
      weatherWind.textContent=resultObj.wind[i].toFixed(2) + ' MPH';
  
      var weatherHumidity=document.createElement('div');
      weatherHumidity.textContent=resultObj.humidity[i].toFixed(2) + ' %';
      
      forcastContainer.append(weather);
      weather.append(weatherTitle,weatherIcon,weatherTemp,weatherWind,weatherHumidity);
    }
  
}    

// function that will render seach history and create button to look up past seaches 
function showSearchHistory(historyArray){
    if (historyStore === null){
        historyStore = [];

    }else{
        historyList.innerHTML = "";

        for (let i = 0; i < historyStore.length; i++) {
            var pastBtn = document.createElement("button");
            pastBtn.classList.add('btn', 'btn-secondary','historyBtns')
            pastBtn.setAttribute('type', 'button')
            pastBtn.textContent = historyArray[i];
            historyList.append(pastBtn);
        }
    }
}

// button for search
searchBtn.addEventListener("click",(event)=>{
    event.preventDefault();
    var city = document.querySelector("#cityInput").value.trim();

    if (!city){
        console.error("Please enter a city.");
        return;
    }
    cityWeather(city);
})

// function will retrive search history from local storage and render it on the page
historyList.addEventListener('click',(event)=>{
    var element=event.target;
    var cityHistory=element.textContent;
    console.log(cityHistory);
    cityWeather(cityHistory);
})

showSearchHistory(historyStore);