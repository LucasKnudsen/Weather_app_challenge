import React from "react";
import { Grid, Header } from "semantic-ui-react"

const Hourlyweather = (hourlyWeather) => {
  const hourForecast = [];
  for (let i = 0; i < hourlyWeather.lenght - 24 ; i++ ) {
    hourForecast.push(
      <Grid.Column key={i} textAlign="center" data-cy="twenty-four-list">
        <Header.Content data-cy="hour" >

        </Header.Content>
      </Grid.Column>
    )
  }
};

export default Hourlyweather