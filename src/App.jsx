import React, { Component } from "react";
import axios from "axios";
import { Container, Radio } from "semantic-ui-react";
import Weeklyweather from "./components/Weeklyweather.jsx";

// weekend challenge
class App extends Component {
  state = {
    geolocation: {},
    location: {},
    dailyWeather: {},
    hourlyWeather: {},
    open: false
  };

  getGeolocation = new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });

  async componentDidMount() {
    let geoloc = await this.getGeolocation;
    let openCageKey = process.env.REACT_APP_OPEN_CAGE_KEY;
    let openWeatherKey = process.env.REACT_APP_OPEN_WEATHER_KEY;
    let { latitude, longitude } = geoloc.coords;
    let locationResponse = await axios.get(
      `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${openCageKey}`
    );
    let weatherResponse = await axios.get(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&units=metric&exclude=minutely&appid=${openWeatherKey}`
    );
    // debugger;
    let weatherInfo = {
      city: locationResponse.data.results[0].components.postal_city
        ? locationResponse.data.results[0].components.postal_city
        : locationResponse.data.results[0].components.city,
      temp: weatherResponse.data.current.temp,
      weather: weatherResponse.data.current.weather[0].main,
      timezone:
        locationResponse.data.results[0].annotations.timezone.short_name,
    };
    this.setState({ 
    location: weatherInfo,
    dailyWeather: weatherResponse.data.daily,
    hourlyWeather: weatherResponse.data.hourly,
    geolocation: geoloc.coords });
  }

  render() {
    const { dailyWeather } = this.state;
    return (
      <>
        <Container data-cy="weather-display" fluid>
          {/* <Image class="background" src="https://images.unsplash.com/photo-1508020963102-c6c723be5764?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=3450&q=80" fluid alt="clouds"/> */}
          <h1 data-cy="location">{this.state.location.city}</h1>
          <h2 data-cy="temp">{this.state.location.temp}°C</h2>
          <h2 data-cy="weather-type">{this.state.location.weather}</h2>
          <h2 data-cy="timezone">{this.state.location.timezone}</h2>
          <Container>
              <Weeklyweather dailyWeather={dailyWeather} />
          </Container>
        </Container>
      </>
    );
  }
}
export default App;
