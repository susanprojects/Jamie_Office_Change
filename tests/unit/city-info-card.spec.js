import Vuetify from 'vuetify';
import Vue from "vue"
import CityInfoCard from "@/components/CityInfoCard";
import { createLocalVue, mount } from "@vue/test-utils";

const localVue = createLocalVue()

describe("CityInfoCard.vue", () => {
    let wrapper;
    let vuetify;

    beforeEach(() => {
        vuetify = new Vuetify();
        Vue.use(vuetify);
        wrapper = mount(CityInfoCard, {
            localVue,
            vuetify,
            propsData: {
                cityData: {
                    city: "Amsterdam",
                    countryCode: "NL",
                    airportCode: 'AMS',
                    country: "Netherlands",
                    weather: {
                        Temperature: {
                            Minimum: {
                                Value: 21.1
                            },
                            Maximum: {
                                Value: 32.2
                            }
                        },
                        Day: {
                            Icon: 6,
                            Wind: {
                                Speed: {
                                    Value: 18.8
                                }
                            },
                            Rain: {
                                Value: 23.1
                            },
                            Snow: {
                                Value: 10.1
                            }
                        },
                        Night: {
                            Icon: 6,
                            Wind: {
                                Speed: {
                                    Value: 15.0
                                }
                            },
                            Rain: {
                                Value: 56.0
                            },
                            Snow: {
                                Value: 10.2
                            }
                        }
                    },
                    flights: [{
                        cityFrom: "India",
                        cityTo: "Amsterdam",
                        price: 490,
                        distance: 6584.75,
                        fly_duration:"43h 20m",
                        technical_stops: 0,
                        availability:
                            {
                                seats: 7
                            }
                    }],
                    currency: 'EUR',
                  }
              }
        });
    })

    it('renders cityinfo card', async () => {
        await Vue.nextTick();
        expect(wrapper.exists()).toBe(true);
    });
    it('should display temperature details', async () => {
        await Vue.nextTick();
        expect(wrapper.find('#minimum-temperature').text()).toBe("Min: 21.1°");
        expect(wrapper.find('#maximum-temperature').text()).toBe("Max: 32.2°");
    });
    it('should display day weather details', async () => {
        await Vue.nextTick();
        expect(wrapper.find('#weather-day-wind-speed').text()).toBe("Wind : 18.8");
        expect(wrapper.find('#weather-day-rain-speed').text()).toBe("Rain : 23.1/");
        expect(wrapper.find('#weather-day-snow').text()).toBe("Snow : 10.1/");
    });
    it('should display night weather details', async () => {
        await Vue.nextTick();
        expect(wrapper.find('#weather-night-wind-speed').text()).toBe("Wind : 15");
        expect(wrapper.find('#weather-night-rain-speed').text()).toBe("Rain : 56/");
        expect(wrapper.find('#weather-night-snow').text()).toBe("Snow : 10.2/");
    });
    it('should display flight details', async () => {
        await Vue.nextTick();
        expect(wrapper.find('#flight-source-destination').text()).toBe("India - Amsterdam");
        expect(wrapper.find('#flight-price').text()).toBe("Price : EUR 490");
        expect(wrapper.find('#flight-distance').text()).toBe("Distance : 6584.75");
        expect(wrapper.find('#flight-duration').text()).toBe("Duration : 43h 20m");
        expect(wrapper.find('#flight-stops').text()).toBe("Stops : 0");
        expect(wrapper.find('#flight-seats').text()).toBe("Seats available : 7");
    });
})