"use strict";

const { ServiceBroker } = require("moleculer");
const { ValidationError } = require("moleculer").Errors;
const TestService = require("../../../services/weather.service");
const DependencyService = require("../../../services/location.service");//weather service depends on location service

describe("Test 'weather' service:", () => {
	let broker = new ServiceBroker({ logger: false });
    let service = broker.createService(TestService);
    let additionalService = broker.createService(DependencyService);//weather service depends on location service

	beforeAll(() => broker.start());
    afterAll(() => broker.stop());

    //tests for actions
    describe("Testing 'weather' service actions:", () => {

        //tests for weather.getCurrentWeather
        describe("Testing 'weather.getCurrentWeather' action:", () => {
            it("Testing 'weather.getCurrentWeather' for: {city: 'Sumy', country: 'UA'}. Expecting weather info.", async () => {
                let res = await broker.call('weather.getCurrentWeather', {city: 'Sumy', country: 'UA'});
                res.weather.temperature = typeof(res.weather.temperature);
                res.weather.weatherText = typeof(res.weather.weatherText);
                //res.weather.weatherIcon = typeof(res.weather.weatherIcon);
                res.weather.weatherIcon = (/https:\/\/developer\.accuweather\.com\/sites\/default\/files\/\d+-s\.png/).test(res.weather.weatherIcon);
                res.weather.isDayTime = typeof(res.weather.isDayTime);

                let expecting = {
                    weather: {
                        temperature: 'number',
                        weatherText: 'string',
                        //weatherIcon: 'string',
                        weatherIcon: true,
                        isDayTime: 'boolean'
                    },
                    location: {
                        city: 'Sumy',
                        country: 'UA',
                        locationKey: '325825' 
                    }
                };
                expect(res).toEqual(expecting);
            });            
        });//tests for weather.getCurrentWeather
    });//tests for actions
});
