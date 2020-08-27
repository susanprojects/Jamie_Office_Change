import Vuetify from 'vuetify';
import Vue from "vue"
import WeatherAndFlightInfo from "@/components/WeatherAndFlightInfo";
import { createLocalVue, shallowMount } from "@vue/test-utils";

const localVue = createLocalVue()

describe("WeatherAndFlightInfo.vue", () => {
    let wrapper;
    let vuetify;

    beforeEach(() => {
        vuetify = new Vuetify();
        Vue.use(vuetify);
        wrapper = shallowMount(WeatherAndFlightInfo, {
            localVue,
            vuetify,
            propsData: {
                sourcecity: '',
                destinationcity: '',
                errors: '',
                chosenCity: '',
                alert: true,
            }
        });
    })

    it('renders', () => {
        wrapper.vm.sourcecity = '';
        expect(wrapper.exists()).toBe(true);
        expect(wrapper.html()).toMatchSnapshot();
    });
    it('should throw an error when there is no value in an input field', () => {
        wrapper.vm.sourcecity = '';
        wrapper.vm.fetchFlightDetails();
        expect(wrapper.vm.errors).toBeTruthy();
    });
    it('should not throw an error when input field contains a value', () => {
        wrapper.vm.sourcecity = 'Test';
        wrapper.vm.fetchFlightDetails();
        expect(wrapper.vm.errors).toBeFalsy();
    });
})