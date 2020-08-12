// This function takes the airport code and source city as parameters to fetch the details of the flights to every city

export default {
    async checkFlights(airportCode, sourcecity) {
        sourcecity = sourcecity ? sourcecity : '';
        let destinationcity = airportCode ? airportCode : '';
        let one_for_city = 1;
        let partner = 'picky';
        let date_from = new Date();

        // The current date is formatted in the format required to be passed as parameter for the service call
        let formattedDateFrom = ('0' + date_from.getDate()).slice(-2) + '%2F'
             + ('0' + (date_from.getMonth()+1)).slice(-2) + '%2F'
             + date_from.getFullYear();
        
        let date_to = new Date();
        // gets the tomorrow date
        let date_tomorrow = new Date(date_to)
        date_tomorrow = date_tomorrow.setDate(date_tomorrow.getDate() + 2);
        let final_date_tomorrow = new Date(date_tomorrow);

        // The tomorrow's date is formatted in the format required to be passed as parameter for the service call
        let formattedDateTo = ('0' + final_date_tomorrow.getDate()).slice(-2) + '%2F'
                + ('0' + (final_date_tomorrow.getMonth()+1)).slice(-2) + '%2F'
                + final_date_tomorrow.getFullYear();

        // fetches the flight details for every city
        const flightDetails = await axios.get('https://api.skypicker.com/flights?fly_from='+ sourcecity +'&fly_to='+ destinationcity+'&date_from='+
        formattedDateFrom+'&date_to='+ formattedDateTo +'&one_for_city='+ one_for_city +'&partner='+ partner);
        let allFlightDetails = flightDetails.data;
        return allFlightDetails;
    }
}
import axios from 'axios';