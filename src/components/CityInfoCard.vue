<template>
  <v-card class="mx-auto">
    <v-img class="white--text align-end" 
      height="200px" 
      :src="`${cityData.city}.jpg`"
    >
      <v-card-title>{{cityData.city}}</v-card-title>
    </v-img>
    <v-card-subtitle class="pb-0">{{cityData.country}}</v-card-subtitle>
    <v-card-text class="text--primary">
      <v-row
        v-if="cityData.weather" 
        align="center">
        <v-col id="minimum-temperature">
          <i class="fas fa-thermometer-empty temp-font"></i>
          Min: {{cityData.weather.Temperature.Minimum.Value}}&deg;{{cityData.weather.Temperature.Minimum.Unit}}
        </v-col>
        <v-col id="maximum-temperature">
          <i class="fas fa-thermometer-full temp-font"></i>
          Max: {{cityData.weather.Temperature.Maximum.Value}}&deg;{{cityData.weather.Temperature.Minimum.Unit}}
        </v-col>
      </v-row>
      <v-row align="center">
        <v-col>
          <v-tabs 
            v-model="cityData.selectedTab" 
            icons-and-text>
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
                 <div v-if="!cityData.weather">
                  <v-skeleton-loader
                    ref="skeleton"
                    :loading="loading"
                    :type="type"
                    class="mx-auto"
                  >
                  </v-skeleton-loader>
                </div>
                <div v-if="cityData.weather">
                  <v-row>
                    <v-col cols="6">
                      <v-img 
                        id="weather-day-con" 
                        :src="`/accuweathericons/${cityData.weather.Day.Icon}-s.png`"
                        >
                      </v-img>
                    </v-col>
                    <v-col cols="6">
                      <v-icon>toys</v-icon>
                      <label id="weather-day-wind-speed">Wind : {{cityData.weather.Day.Wind.Speed.Value}} {{cityData.weather.Day.Wind.Speed.Unit}}</label>
                      <hr />
                      <v-icon>invert_colors</v-icon>
                      <label id="weather-day-rain-speed">Rain : {{cityData.weather.Day.Rain.Value}}/ {{cityData.weather.Day.Rain.Unit}}</label>
                      <hr />
                      <v-icon>ac_unit</v-icon>
                      <label id="weather-day-snow">Snow : {{cityData.weather.Day.Snow.Value}}/ {{cityData.weather.Day.Snow.Unit}}</label>
                      <hr />
                    </v-col>
                  </v-row>
                </div>
                <div v-else>
                  <v-row class="no-data">
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
                <div v-if="!cityData.weather">
                  <v-skeleton-loader
                    ref="skeleton"
                    :loading="loading"
                    :type="type"
                    class="mx-auto"
                  >
                  </v-skeleton-loader>
                </div>
                <div v-if="cityData.weather">
                <v-row>
                  <v-col cols="6">
                    <v-img 
                      :src="`/accuweathericons/${cityData.weather.Night.Icon}-s.png`"
                    >
                    </v-img>
                  </v-col>
                  <v-col cols="6">
                    <v-icon>toys</v-icon>
                    <label id="weather-night-wind-speed">Wind : {{cityData.weather.Night.Wind.Speed.Value}} {{cityData.weather.Night.Wind.Speed.Unit}}</label>
                    <hr />
                    <v-icon>invert_colors</v-icon>
                    <label id="weather-night-rain-speed">Rain : {{cityData.weather.Night.Rain.Value}}/ {{cityData.weather.Night.Rain.Unit}}</label>
                    <hr />
                    <v-icon>ac_unit</v-icon>
                    <label id="weather-night-snow">Snow : {{cityData.weather.Night.Snow.Value}}/ {{cityData.weather.Night.Snow.Unit}}</label>
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
                  <v-row class="no-data">
                    <label>{{noDataAvailable}}</label>
                  </v-row>
                </div>
              </v-tab-item>
              <v-tab-item>
                <div v-if="!cityData.flights">
                  <v-skeleton-loader
                    ref="skeleton"
                    :loading="loading"
                    :type="type"
                    class="mx-auto"
                  >
                  </v-skeleton-loader>
                </div>
                <div v-if="cityData.flights && (!cityData.error) && cityData.flights.length">
                  <v-row v-for="flight in cityData.flights" :key="flight.id">
                    <v-col cols="4">
                      <v-icon>airplanemode_active</v-icon>
                    </v-col>
                    <v-col cols="8">
                      <label id="flight-source-destination">{{flight.cityFrom}} - {{flight.cityTo}}</label>
                      <hr />
                      <label id="flight-price">Price : {{flight.currency}} {{flight.price}}</label>
                      <hr />
                      <label id="flight-distance">Distance : {{flight.distance}}</label>
                      <hr />
                      <label id="flight-duration">Duration : {{flight.fly_duration}}</label>
                      <hr />
                      <label id="flight-stops">Stops : {{flight.technical_stops}}</label>
                      <hr />
                      <label id="flight-seats">Seats available : {{flight.availability.seats}}</label>
                      <hr />
                    </v-col>
                  </v-row>
                </div>
                <div v-else-if="cityData.error">
                  <v-row class="no-data">
                    <label>{{ noFlightDetails }}</label>
                  </v-row>
                </div>
                <div v-else>
                  <v-row class="no-data">
                    <label>{{ noDataAvailable }}</label>
                  </v-row>
                </div>
              </v-tab-item>
              <v-row>
                <v-btn 
                  type="submit" 
                  color="warning" 
                  @click="$emit('choose-city', cityData.city)"
                  >
                  {{cityToSelectButtonText}}
                </v-btn>
              </v-row>
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
    props: {
      cityData: Object
    },
    data(){
      return {
        loading: true,
        type: 'list-item-avatar-three-line',
        noDataAvailable: 'No data available',
        noFlightDetails: 'You cannot enter the same city that you are in.',
        cityToSelectButtonText: 'Select',
        selectedTab: null,
      }
    }
  }
</script>

<style scoped>
  .temp-font {
    font-size: 2rem;
  }
  .no-data {
    font-size: 20px;
    padding: 15px;
    justify-content: center;
  }
</style>