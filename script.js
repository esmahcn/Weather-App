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

    if (data.cod !== 200) {
      weatherBox.innerHTML = `<p>❌ City not found. Try again.</p>`;
      return;
    }

    console.log(data)
    const name = data.name;
    const country = data.sys.country;
    const temp = data.main.temp;
    const humidity = data.main.humidity;
    const icon = data.weather[0].main;
    const wind = data.wind.speed;

    let emoji = "☁️";
    if (icon === "Clear") emoji = "☀️";
    else if (icon === "Rain") emoji = "🌧";
    else if (icon === "Thunderstorm") emoji = "⛈";
    else if (icon === "Snow") emoji = "❄️";
    else if (icon === "Drizzle") emoji = "🌦";
    else if (icon === "Clouds") emoji = "☁️";

    // affichage
    weatherBox.innerHTML = `
    <h2>${name} ${emoji}</h2>
     <p>country: ${country}</p>
    <p>Température: ${temp}°C</p>
    <p>Humidité: ${humidity}%</p>
    <p>Vent: ${wind} m/s</p>
  `;

  }

  catch (error) {
    console.error("Error fetching weather:", error);
    weatherBox.innerHTML = `<p>⚠️ Something went wrong. Please try again later.</p>`;
  }
}