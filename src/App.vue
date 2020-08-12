<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
      <div id="app" class="d-flex align-center">
        <v-img
          alt="Office Change"
          class="shrink mr-2"
          contain
          src="./assets/logo2.png"
          transition="scale-transition"
          width="40"
        />
        Office Change App
      </div>
      <v-spacer></v-spacer>
    </v-app-bar>
    <v-main>
      <WeatherAndFlightInfo/>
    </v-main>
  </v-app>
</template>

<script>
import WeatherAndFlightInfo from './components/WeatherAndFlightInfo';

export default {
  name: 'App',

  components: {
    WeatherAndFlightInfo,
  },
};
</script>
