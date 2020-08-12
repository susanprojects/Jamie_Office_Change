<template>
  <v-container>
    <v-row>
      <v-col>
        <v-text-field
            v-model="sourcecity"
            label="Where are you flying from? (Enter airport code)"
            required
          ></v-text-field>
          <p v-if="errors">
            <label>Please correct the following error :</label>
            <label>{{ errors }}</label>
          </p>
        <v-btn type="submit" color="warning" @click="fetchFlightDetails()" dark>Submit</v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="4" v-for="item in cities" v-bind:key="item.city">
        <city-info-card :cityData="item" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import accuweather from "./utils/accuweather";
import checkFlights from "./utils/checkFlights";
import CityInfoCard from './CityInfoCard'

export default {
  name: "WeatherAndFlightInfo",
  components:{ CityInfoCard },

  data: () => ({
    sourcecity: '',
    destinationcity: '',
    textFieldModelValue: '',
    modal: false,
    errors: '',
    cities: [
      {
        city: "Amsterdam",
        countryCode: "NL",
        airportCode: 'AMS',
        country: "Netherlands",
        weather: null,
        flights: []
      },

      {
        city: "Budapest",
        countryCode: "HU",
        airportCode: "BUD",
        country: "Hungary",
        weather: null,
        flights: []
      },
      {
        city: "Madrid",
        countryCode: "ES",
        airportCode: "MAD",
        country: "Spain",
        weather: null,
        flights: []
      }
    ]
  }),
  created: function() {
    this.fetchWeatherDetails();
  },
  methods: {
    async fetchWeatherDetails() {
      this.cities.forEach(async (item, index) => {
        const res = await accuweather.getCityWeatherForcast(
          item.city,
          item.countryCode
        );
        this.cities[index].weather = res;
      });
    },

    async fetchFlightDetails() {
      if(!this.sourcecity) {
        this.errors = 'Source City is required.';
      } else if(this.errors){
        this.errors = '';
      }
      this.cities.forEach(async (item, index) => {
        const flightsRes = await checkFlights.checkFlights(
          item.airportCode,
          this.sourcecity
        );
        this.cities[index].flights = flightsRes.data;
        this.cities[index].flights["currency"] = flightsRes.currency;
        this.sourcecity = '';
      });
    }
  }
};
</script>