const apiKey = "e3a9eee8b393b2db41909c973157062a";

async function getWeather() {
  const city = document.getElementById("city").value.trim();
  const weatherBox = document.getElementById("weather");

  if (!city) {
    alert("Please enter a city name.");
    return;
  }

  try {
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
    );
    const data = await res.json();


    const iconCode = data.weather[0].icon;
    const description = data.weather[0].description;


    if (data.cod !== 200) {
      weatherBox.innerHTML = `<p>❌ City not found. Try again.</p>`;
      return;
    }

    console.log(data);

    const name = data.name;
    const country = data.sys.country;
    const temp = Math.round(data.main.temp);
    const humidity = data.main.humidity;
    const wind = data.wind.speed;
    const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;




    // affichage
    weatherBox.innerHTML = `
      <h2>${name}, ${country} </h2>
      <img src="${iconUrl}" alt="${description}">
      <p>${description}</p>
      <p>Température: ${temp}°C</p>
      <p>Humidité: ${humidity}%</p>
      <p>Vent: ${wind} m/s</p>
    `;
  } catch (error) {
    console.error("Error fetching weather:", error);
    weatherBox.innerHTML = `<p>⚠️ Something went wrong. Please try again later.</p>`;
  }
}