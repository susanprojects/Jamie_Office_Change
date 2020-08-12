<template>
  <v-card class="mx-auto">
    <v-img class="white--text align-end" height="200px" :src="`${cityData.city}.jpg`">
      <v-card-title>{{cityData.city}}</v-card-title>
    </v-img>
    <v-card-subtitle class="pb-0">{{cityData.country}}</v-card-subtitle>

    <v-card-text class="text--primary">
      <v-row v-if="cityData.weather" align="center">
        <v-col id="minimumTemperature">
          <i class="fas fa-thermometer-empty tempFont"></i>
          Min: {{cityData.weather.Temperature.Minimum.Value}}&deg;{{cityData.weather.Temperature.Minimum.Unit}}
        </v-col>
        <v-col id="maximumTemperature">
          <i class="fas fa-thermometer-full tempFont"></i>
          Max: {{cityData.weather.Temperature.Maximum.Value}}&deg;{{cityData.weather.Temperature.Minimum.Unit}}
        </v-col>
      </v-row>
      <v-row align="center">
        <v-col>
          <v-tabs v-model="cityData.selectedTab" icons-and-text>
            <v-tab>
              Day
              <v-icon>wb_sunny</v-icon>
            </v-tab>
            <v-tab>
              Night
              <v-icon>nights_stay</v-icon>
            </v-tab>
            <v-tab>
              Flight
              <v-icon>airplanemode_active</v-icon>
            </v-tab>
            <v-tabs-items v-model="cityData.selectedTab">
              <v-tab-item>
                <div v-if="cityData.weather">
                <v-row>
                  <v-col cols="6">
                    <v-img id="weatherDayIcon" :src="`/accuweathericons/${cityData.weather.Day.Icon}-s.png`"></v-img>
                  </v-col>
                  <v-col cols="6">
                    <v-icon>toys</v-icon>
                    <label id="weatherDayWindSpeed">Wind : {{cityData.weather.Day.Wind.Speed.Value}} {{cityData.weather.Day.Wind.Speed.Unit}}</label>
                    <hr />
                    <v-icon>invert_colors</v-icon>
                    <label id="weatherDayRainSpeed">Rain : {{cityData.weather.Day.Rain.Value}}/ {{cityData.weather.Day.Rain.Unit}}</label>
                    <hr />
                    <v-icon>ac_unit</v-icon>
                    <label id="weatherDaySnow">Snow : {{cityData.weather.Day.Snow.Value}}/ {{cityData.weather.Day.Snow.Unit}}</label>
                    <hr />
                  </v-col>
                </v-row>
                </div>
                <div v-else>
                  <v-row class="noData">
                    <label>{{noDataAvailable}}</label>
                  </v-row>
                </div>
                <v-row v-if="cityData.weather">
                  <v-col>
                    <h2>{{cityData.weather.Day.ShortPhrase}}</h2>
                    <span>{{cityData.weather.Day.LongPhrase}}</span>
                  </v-col>
                </v-row>
              </v-tab-item>
              <v-tab-item>
                <div v-if="cityData.weather">
                <v-row>
                  <v-col cols="6">
                    <v-img :src="`/accuweathericons/${cityData.weather.Night.Icon}-s.png`"></v-img>
                  </v-col>
                  <v-col cols="6">
                    <v-icon>toys</v-icon>
                    <label id="weatherNightWindSpeed">Wind : {{cityData.weather.Night.Wind.Speed.Value}} {{cityData.weather.Night.Wind.Speed.Unit}}</label>
                    <hr />
                    <v-icon>invert_colors</v-icon>
                    <label id="weatherNightRainSpeed">Rain : {{cityData.weather.Night.Rain.Value}}/ {{cityData.weather.Night.Rain.Unit}}</label>
                    <hr />
                    <v-icon>ac_unit</v-icon>
                    <label id="weatherNightSnow">Snow : {{cityData.weather.Night.Snow.Value}}/ {{cityData.weather.Night.Snow.Unit}}</label>
                    <hr />
                  </v-col>
                </v-row>
                <v-row v-if="cityData.weather">
                  <v-col>
                    <h2>{{cityData.weather.Night.ShortPhrase}}</h2>
                    <span>{{cityData.weather.Night.LongPhrase}}</span>
                  </v-col>
                </v-row>
                </div>
                <div v-else>
                  <v-row class="noData">
                    <label>{{noDataAvailable}}</label>
                  </v-row>
                </div>
              </v-tab-item>
              <v-tab-item>
                <div v-if="cityData.flights && cityData.flights.length">
                <v-row v-for="flight in cityData.flights" :key="flight.id">
                  <v-col cols="4">
                    <v-icon>airplanemode_active</v-icon>
                  </v-col>
                  <v-col cols="8">
                    <label id="flightSourceDestination">{{flight.cityFrom}} - {{flight.cityTo}}</label>
                    <hr />
                    <label id="flightPrice">Price : {{cityData.flights.currency}} {{flight.price}}</label>
                    <hr />
                    <label id="flightDistance">Distance : {{flight.distance}}</label>
                    <hr />
                    <label id="flightDuration">Duration : {{flight.fly_duration}}</label>
                    <hr />
                    <label id="flightStops">Stops : {{flight.technical_stops}}</label>
                    <hr />
                    <label id="flightSeats">Seats available: {{flight.availability.seats}}</label>
                    <hr />
                  </v-col>
                </v-row>
                </div>
                <div v-else>
                  <v-row class="noData">
                    <label>{{noDataAvailable}}</label>
                  </v-row>
                </div>
              </v-tab-item>
            </v-tabs-items>
          </v-tabs>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
  export default {
    name: 'CityInfoCard',
    props:{
      cityData: Object
    },

    data(){
      return {
        noDataAvailable: 'No data available',
        selectedTab: null,
      }
    },
  }
</script>

<style scoped>
  .tempFont {
    font-size: 2rem;
  }
  .noData {
    font-size: 20px;
    padding: 15px;
    justify-content: center;
  }
</style>