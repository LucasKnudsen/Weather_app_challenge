import React, { Component } from "react"

class App extends Component {
  state = {
    geolocation: {}
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(position => {
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