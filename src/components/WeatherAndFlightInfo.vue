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
          <label>{{errorLabel}}</label>
          <label>{{ errors }}</label>
        </p>
        <v-btn 
          type="submit" 
          color="warning" 
          @click="fetchFlightDetails()" 
          dark
          >
          {{submitButtonText}}
          </v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-col 
        cols="4" 
        v-for="item in cities" 
        v-bind:key="item.city"
        >
        <city-info-card 
          :cityData="item" 
          v-on:choose-city="chooseTheCity"/>
      </v-col>
    </v-row>
    <div>
      <v-alert 
        type="success"
        v-model="alert"
        class="selected-city"
        v-if="citySelectionDivShown"
        close-text="Close Alert"
        dismissible
        >
        {{citySelectionText}}<strong>{{chosenCity}}</strong>
      </v-alert>
    </div>
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
    errors: '',
    errorLabel: 'Please correct the following error :',
    citySelectionDivShown: false,
    citySelectionText: 'You have selected to travel to : ',
    chosenCity: '',
    alert: true,
    submitButtonText: 'Check for an available flight ',
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
    fetchWeatherDetails() {
      this.cities.forEach(async (item, index) => {
        const res = await accuweather.getCityWeatherForcast(
          item.city,
          item.countryCode,
        );
        this.cities[index].weather = res;
      });
    },

    fetchFlightDetails() {
      if(!this.sourcecity) {
        this.errors = 'Source City is required.';
      } else if(this.errors){
        this.errors = '';
      }
      this.cities.forEach(async (item, index) => {
        if(item.airportCode !== this.sourcecity) {
            const flightsRes = await checkFlights.checkFlights(
            item.airportCode,
            this.sourcecity
          );
          this.cities[index].flights = flightsRes.data;
          this.cities[index].flights[0].currency = flightsRes.currency;
          this.cities[index]["error"] = false;
          this.sourcecity = '';
        } else {
          this.cities[index]["error"] = true;
        }
      });
    },
    chooseTheCity(chosenCity) {
      if(chosenCity) {
        this.chosenCity = chosenCity;
        this.citySelectionDivShown = true;
      }
    }
  }
};
</script>
<style>

.selected-city {
  justify-content: center;
  font-size: 25px;
}
</style>