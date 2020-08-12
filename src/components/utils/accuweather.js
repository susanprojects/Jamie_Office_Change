// This function gets the location key from the locations API for every city and countryCode

export default {
    async getLocationByCityAndCountry(city, countryCode){
        const res = await axios.get(
          `https://dataservice.accuweather.com/locations/v1/cities/${countryCode}/search`,
          {
            params: {
              q: city,
              apikey: "jUOlMlgvV3hMhPO8ew8adB8dwyR8sT0m"
            }
          } 
        );

        if(res.data.length==0){
            return null;
        }

        if(res.data.length>1){
            res.data.sort((a,b)=>{a.Rank-b.Rank});
        }
        return  res.data[0].Key;
    },

    // This function checks if location key is present and and fetches the weather forecast for every city

    async getCityWeatherForcast(city, countryCode) {
        let locationKeyIsPresent = true;
        if(locationKeyIsPresent){
          const locationKey = await this.getLocationByCityAndCountry(city, countryCode);
          const res = await axios.get(`https://dataservice.accuweather.com/forecasts/v1/daily/1day/${locationKey}`,{
              params:{
                  apikey: "jUOlMlgvV3hMhPO8ew8adB8dwyR8sT0m",
                  metric: true,
                  details: true
              }
          });
          const forecast =  res.data.DailyForecasts[0];
          return forecast;
        }
    }
}
import axios from 'axios';