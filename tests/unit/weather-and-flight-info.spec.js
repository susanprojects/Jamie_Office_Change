import Vuetify from 'vuetify';
import Vue from "vue"
import WeatherAndFlightInfo from "@/components/WeatherAndFlightInfo";
import { createLocalVue, shallowMount, mount } from "@vue/test-utils";

const localVue = createLocalVue()

describe("weatherandflightinfo.vue", () => {
    let wrapper;
    let vuetify;
    

    beforeEach(() => {
        vuetify = new Vuetify();
        Vue.use(vuetify);
    })

    it('renders', () => {
        wrapper = shallowMount(WeatherAndFlightInfo, {
            localVue,
            vuetify,
            data() {
                return {
                    sourcecity: ''
                }
              }
        });
        expect(wrapper.exists()).toBe(true);
    });
    it('should throw an error when there is no value in an input field', () => {
        const wrapper = mount(WeatherAndFlightInfo, {
        })
        wrapper.vm.sourcecity = '';
        wrapper.vm.fetchFlightDetails();
        expect(wrapper.vm.errors).toBeTruthy();
    });
    it('should not throw an error when input field contains a value', () => {
        const wrapper = mount(WeatherAndFlightInfo, {
        })
        wrapper.vm.sourcecity = 'Test';
        wrapper.vm.fetchFlightDetails();
        expect(wrapper.vm.errors).toBeFalsy();
    });
})