const container = document.querySelector(".container");
const searchBox = document.querySelector(".search-box");
const weatherBox = document.querySelector(".weather-box");
const weatherDetails = document.querySelector(".weather-details");
const error = document.querySelector(".not-found");

searchBox.querySelector("button").addEventListener("click", () => {
    const APIKey = "cb28e8613de40a4afb79ac106bc5321e";
    const city = document.querySelector(".search-box input").value;
    if (city === "") return;

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`)
        .then(response => response.json())
        .then(json => {

            if(json.cod == 404){
                container.style.height = "400px";
                weatherBox.classList.remove("active");
                weatherDetails.classList.remove("active");
                error.classList.add("active");
                Demo.classList.remove("active");
                return;
            }
            else{
                container.style.height = "600px";
                weatherBox.classList.add("active");
                weatherDetails.classList.add("active");
                error.classList.remove("active");
            }



            const image = document.querySelector('.weather-box img');
            const temperature = document.querySelector('.weather-box .temperature');
            const description = document.querySelector('.weather-box .description');
            const humidity = document.querySelector('.weather-details .info-humidity span');
            const wind = document.querySelector('.weather-details .info-wind span');

            switch (json.weather[0].main) {
                case "Clear":
                    image.src = "assets/clear.png";
                    break;
                case "Rain":
                    image.src = "assets/rain.png";
                    break;
                case "Snow":
                    image.src = "assets/snow.png";
                    break;
                case "Clouds":
                    image.src = "assets/cloud.png";
                    break;
                case "Mist":
                    image.src = "assets/mist.png";
                    break;
                case "Haze":
                    image.src = "assets/mist.png";
                    break;
                default:
                    image.src = "assets/cloud.png";
            }

            temperature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
            description.innerHTML = `${json.weather[0].description}`;
            humidity.innerHTML = `${json.main.humidity}%`;
            wind.innerHTML = `${parseInt(json.wind.speed)}Km/hr`;
        });
});
