// Array to store previously searched cities
const storedCities = [];

// Function to display weather information
function showWeather() {
    // OpenWeatherMap API key
    const weatherAPIKey = "f661e9add094e930db343ca74955e61a";

    // Get the selected city from the button's data attribute
    const selectedCity = $(this).attr("data-city");

    // Build the API URL for weather data
    const weatherQueryURL = `https://api.openweathermap.org/data/2.5/forecast?q=${selectedCity}&units=metric&appid=${weatherAPIKey}`;

    // Fetch weather data from the API
    fetch(weatherQueryURL)
        .then(response => response.json())
        .then(weatherData => {
            console.log(weatherData);

            // Clear existing weather information
            $("#currentDay, #fourDay").empty();

            // Extract the name of the searched city
            const cityName = weatherData.city.name;

            // Display the city name in the heading
            $("#currentDay-text").text(`Current day in ${cityName}:`);
             
            // Create paragraphs for each piece of information (date, icon, temperature, wind speed, humidity)
             const currentTime = weatherData.list[0].dt_txt;
             const currentDayFormatted = dayjs(currentTime).format("D MMMM YYYY");
             const pDay = $("<p>").text(currentDayFormatted);
             const currentWeatherIcon = weatherData.list[0].weather[0].icon;
             const pIcon = $("<img>").attr("src", `http://openweathermap.org/img/w/${currentWeatherIcon}.png`);
             const currentTemperature = weatherData.list[0].main.temp;
             const pTemperature = $("<p>").text(`Temperature: ${currentTemperature} °C`);
             const currentWindSpeed = weatherData.list[0].wind.speed;
             const pWindSpeed = $("<p>").text(`Wind Speeds: ${currentWindSpeed} KPH`);
             const currentHumidity = weatherData.list[0].main.humidity;
             const pHumidity = $("<p>").text(`Humidity: ${currentHumidity}%`);
 
 

            // Loop through the API response to display weather information for next 4 days
            for (let i = 8; i < 33; i += 8) {
                
                const forecastTime = weatherData.list[i].dt_txt;

                // Format current and forecasted dates
                const forecastDayFormatted = dayjs(forecastTime).format("D MMMM YYYY");

                // Icon
                const forecastWeatherIcon = weatherData.list[i].weather[0].icon;

                // Temperature
                const forecastTemperature = weatherData.list[i].main.temp;

                // Wind Speed
                const forecastWindSpeed = weatherData.list[i].wind.speed;

                // Humidity
                const forecastHumidity = weatherData.list[i].main.humidity;

                // The next 4 days
                const forecastDay = $("<p>").text(forecastDayFormatted);
                const forecastIcon = $("<img>").attr("src", `http://openweathermap.org/img/w/${forecastWeatherIcon}.png`);
                const forecastTemp = $("<p>").text(`Temperature: ${forecastTemperature} °C`);
                const forecastWind = $("<p>").text(`Wind Speeds: ${forecastWindSpeed} KPH`);
                const forecastHum = $("<p>").text(`Humidity: ${forecastHumidity}%`);

                // Append forecast information to the DOM
                const forecastContainer = $("#fourDay");
                const forecastDiv = $("<div class='col card'>");

                forecastDiv.append(forecastDay, forecastIcon, forecastTemp, forecastWind, forecastHum);
                forecastContainer.append(forecastDiv);
            }


            // Display current day information in the DOM
            const currentDayContainer = $("#currentDay");
            currentDayContainer.append(pDay, pIcon, pTemperature, pWindSpeed, pHumidity);
        });
}

// Function to render search history buttons
function renderHistoryButtons() {
    // Clear existing search history buttons
    $("#citySearched").empty();

    // Loop through stored cities and create buttons
    for (const storedCity of storedCities) {
        const cityButton = $("<button type='button' class='btn btn-secondary w-100 btnSpace' id='cities'>")
            .attr("data-city", storedCity)
            .text(storedCity);

        // Append the button to the search history container
        $("#citySearched").append(cityButton);
    }
}

// Event listener for the search button
$("#searchButton").on("click", function (event) {
    event.preventDefault();

    // Get the entered city from the input field
    const enteredCity = $("#inputBar").val().trim();

    // Check if the input is not empty
    if (enteredCity === "") {
        alert("Please Enter A City Name");
    } else {
        // Add the entered city to the storedCities array and render the updated search history buttons
        storedCities.push(enteredCity);
        renderHistoryButtons();
    }
});

// Event listener for the clear button
$("#clearButton").on("click", function () {
    // Clear the search history and the storedCities array
    $("#citySearched").empty();
    storedCities.length = 0;
    renderHistoryButtons();
});

// Event listener for the click on a search history button
$(document).on("click", "#cities", showWeather);

// Initial rendering of search history buttons
renderHistoryButtons();
