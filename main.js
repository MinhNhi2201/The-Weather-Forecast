const bg = document.querySelector(".weather-app");

const form = document.getElementById("cityInput")
const search = document.getElementById("search");
const btn = document.querySelector("#submit")
const img_icon = document.querySelector("#icon")
const condition = document.querySelector("#condition")
const city = document.querySelector("#city")
const temp = document.querySelector("#temp");
const date = document.querySelector("#date")
const cloud = document.querySelector("#cloud")
const humidity = document.querySelector("#humidity")
const wind = document.querySelector("#wind")




let cityInput = "Vietnam";
window.onload = function () {
    showData(cityInput);
}

// Click button
form.addEventListener("submit", e => {
    e.preventDefault();

    if (search.value.length == 0) {
        alert("Please type in a city name !");
    }
    else {
        cityInput = search.value;
        showData();
        search.value = "";
    }

});

// 
function showData() {
    fetch(`https://api.weatherapi.com/v1/forecast.json?key=a564495e295147d9ba131029230802&q=${cityInput}&days=10&aqi=yes&alerts=no`)
        .then(res => res.json())
        .then(datas => {

            // Show current weather
            img_icon.src = `${datas.current.condition.icon}`;
            condition.innerHTML = `${datas.current.condition.text}`;
            temp.innerHTML = `${datas.current.temp_c}&deg`
            city.innerHTML = `${datas.location.name}`;
            date.innerHTML = `${datas.location.localtime}`;
            cloud.innerHTML = `${datas.current.cloud}% |`;
            humidity.innerHTML = `${datas.current.humidity}% |`;
            wind.innerHTML = `${(datas.current.wind_mph * 1.6).toFixed(2)} km/h `;
            sunrise.innerHTML = `${datas.forecast.forecastday[0].astro.sunrise}`;
            sunset.innerHTML = `${datas.forecast.forecastday[0].astro.sunset}`;

            // Show daily weather
            const daily1 = document.querySelector("#daily1");
            const daily2 = document.querySelector("#daily2")
            const daily3 = document.querySelector("#daily3")
            const daily4 = document.querySelector("#daily4")

            const icon2_1 = document.querySelector("#icon2_1");
            const icon2_2 = document.querySelector("#icon2_2");
            const icon2_3 = document.querySelector("#icon2_3");
            const icon2_4 = document.querySelector("#icon2_4")

            const temp2_1 = document.querySelector("#temp2_1");
            const temp2_2 = document.querySelector("#temp2_2");
            const temp2_3 = document.querySelector("#temp2_3");
            const temp2_4 = document.querySelector("#temp2_4");

            daily1.innerHTML = "0" + `${datas.forecast.forecastday[1].date}`.substr(6);
            daily2.innerHTML = "0" + `${datas.forecast.forecastday[2].date}`.substr(6);
            daily3.innerHTML = "0" + `${datas.forecast.forecastday[3].date}`.substr(6);
            daily4.innerHTML = "0" + `${datas.forecast.forecastday[4].date}`.substr(6);

            icon2_1.src = `${datas.forecast.forecastday[1].day.condition.icon}`;
            icon2_2.src = `${datas.forecast.forecastday[2].day.condition.icon}`;
            icon2_3.src = `${datas.forecast.forecastday[3].day.condition.icon}`;
            icon2_4.src = `${datas.forecast.forecastday[4].day.condition.icon}`;

            temp2_1.innerHTML = `${datas.forecast.forecastday[1].day.maxtemp_c}` + "&deg C";
            temp2_2.innerHTML = `${datas.forecast.forecastday[2].day.maxtemp_c}` + "&deg C";
            temp2_3.innerHTML = `${datas.forecast.forecastday[3].day.maxtemp_c}` + "&deg C";
            temp2_4.innerHTML = `${datas.forecast.forecastday[4].day.maxtemp_c}` + "&deg C";

            // Set background
            let dayortime = "day"
            const code = `${datas.current.condition.code}`;
            if (datas.current.is_day == false) {
                dayortime = "night";
            }
            if (code == 1000) {
                bg.style.backgroundImage = `url(./images/${dayortime}/clear.jpg)`
            }

            else if (
                code == 1003 ||
                code == 1006 ||
                code == 1009 ||
                code == 1030 ||
                code == 1069 ||
                code == 1087 ||
                code == 1135 ||
                code == 1273 ||
                code == 1276 ||
                code == 1279 ||
                code == 1282
            ) {
                bg.style.backgroundImage = `url(./images/${dayortime}/cloud.jpg)`

            }
            else if (code == 1063 ||
                code == 1069 ||
                code == 1072 ||
                code == 1150 ||
                code == 1153 ||
                code == 1180 ||
                code == 1183 ||
                code == 1186 ||
                code == 1189 ||
                code == 1192 ||
                code == 1195 ||
                code == 1204 ||
                code == 1207 ||
                code == 1240 ||
                code == 1243 ||
                code == 1246 ||
                code == 1249 ||
                code == 1252) {
                bg.style.backgroundImage = `url(./images/${dayortime}/rainy.jpg)`
            } else {
                bg.style.backgroundImage = `url(./images/${dayortime}/snowy.jpg)`

            }
        });
}



