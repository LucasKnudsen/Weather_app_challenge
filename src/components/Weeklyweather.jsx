import React from "react";
import { Grid,Header} from "semantic-ui-react";

// weekend challenge
const Weeklyweather = ({ dailyWeather }) => {
  const forecastList = [];
  for (let i = 1; i < dailyWeather.length; i++) {
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    let weather = dailyWeather[i].weather[0].main;
    forecastList.push(
      <Grid.Column key={i} textAlign="center">
        <Header.Content className="days">
          {days[new Date(dailyWeather[i].dt * 1000).getDay()]}
        </Header.Content>
        <Header.Content>{dailyWeather[i].weather[0].main}</Header.Content>
        <Header.Content>{dailyWeather[i].temp.day}℃</Header.Content>
      </Grid.Column>
    );
  }

  return (
    <Grid columns={7} divided className="forecast">
      <Grid.Row>{forecastList}</Grid.Row>
    </Grid>
  );
};

export default Weeklyweather;
