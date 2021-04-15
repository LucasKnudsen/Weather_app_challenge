import React, { Component } from "react"
import axios from "axios"

class App extends Component {
  state = {
    geolocation: {}
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(async position => {
      let openCageKey= process.env.REACT_APP_OPEN_CAGE_KEY
      let openWeatherKey= process.env.REACT_APP_OPEN_WEATHER_KEY
      let {latitude, longitude } = position.coords
      let locationResponse = await axios.get(`https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${openCageKey}`)
      let weatherResponse = await axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&units=metric&exclude=minutely&appid=${openWeatherKey}`)

      let weatherInfo = {
        city: locationResponse.data.results[0].components.postal_city,
        temp: weatherResponse.data.current.temp
      }
      this.setState({ location: weatherInfo })
      debugger
      this.setState({ geolocation: position.coords })
    })
  }

  render() {
    return(
      <div>
        <h1>Sup</h1>
      </div>
    )
  }
}
export default App;