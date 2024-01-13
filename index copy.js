// Array for Storage
const cityNames = [];

// Displaying Weather Function
function displayWeather() {
    // API Setup
    const APIKey = "3ae9b9a3bec3ebb3884cc2d6643eedaf";
    const cityName = $(this).attr("data-city");
    const queryURL = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&units=metric&appid=${APIKey}`;

    fetch(queryURL)
        .then(response => response.json())
        .then(data => {
            console.log(data);

            $("#currentDay, #fourDay").empty();

            const searchedName = data.city.name;
            $("#currentDay-text").text(`Current day in ${searchedName}:`);

            // Looping API for Data
            for (let i = 8; i < 33; i += 8) {
                const currentTime = data.list[0].dt_txt;
                const time = data.list[i].dt_txt;
                const now = dayjs(currentTime).format("D MMMM YYYY");
                const after = dayjs(time).format("D MMMM YYYY");

                const pOne = $("<p>").text(now);

                // Icon
                const currentIcon = data.list[0].weather[0].icon;
                const icon = data.list[i].weather[0].icon;
                const pTwo = $("<img>").attr("src", `http://openweathermap.org/img/w/${currentIcon}.png`);

                // Temp
                const currentTemp = data.list[0].main.temp;
                const temp = data.list[i].main.temp;
                const pThree = $("<p>").text(`Temperature: ${currentTemp} °C`);

                // Wind
                const currentWind = data.list[0].wind.speed;
                const wind = data.list[i].wind.speed;
                const pFour = $("<p>").text(`Wind Speeds: ${currentWind} KPH`);

                // Humidity
                const currentHum = data.list[0].main.humidity;
                const hum = data.list[i].main.humidity;
                const pFive = $("<p>").text(`Humidity: ${currentHum}%`);

                // The next 4 days
                const fourTime = $("<p>").text(after);
                const fourIcon = $("<img>").attr("src", `http://openweathermap.org/img/w/${icon}.png`);
                const fourTemp = $("<p>").text(`Temperature: ${temp} °C`);
                const fourWind = $("<p>").text(`Wind Speeds: ${wind} KPH`);
                const fourHum = $("<p>").text(`Humidity: ${hum}%`);

                const four = $("#fourDay");
                const fourDiv = $("<div class='col card'>");

                fourDiv.append(fourTime, fourIcon, fourTemp, fourWind, fourHum);
                four.append(fourDiv);
            

            const currentDay = $("#currentDay");
            currentDay.append(pOne, pTwo, pThree, pFour, pFive);
        }});
}

// Search History Buttons
function historyButtons() {
    $("#citySearched").empty();

    for (const cityName of cityNames) {
        const a = $("<button type='button' class='btn btn-secondary w-100 btnSpace' id='cities'>")
            .attr("data-city", cityName)
            .text(cityName);

        $("#citySearched").append(a);
    }
}

// Search Input
$("#searchButton").on("click", function (event) {
    event.preventDefault();

    const city = $("#inputBar").val().trim();

    if (city === "") {
        alert("Please Enter A City Name");
    } else {
        cityNames.push(city);
        historyButtons();
    }
});

// Clear Button
$("#clearButton").on("click", function () {
    $("#citySearched").empty();
    cityNames.length = 0; // Clear the array
    historyButtons();
});

$(document).on("click", "#cities", displayWeather);
historyButtons();
