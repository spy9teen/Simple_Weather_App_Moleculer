const fetch = require('node-fetch');

module.exports = {
    name: 'weather',
    settings: {
        //weatherAPIURL: 'http://api.openweathermap.org/data/2.5/weather',
        //appid: '61e2fdc45f07aa14b24c6b0eea706ab6',
        weatherAPIURL: 'http://dataservice.accuweather.com/',
        apikey: 'NMKYXqrwyHwLcMB4X3mVyQAayHHvttsS',
        iconProps: {
            prefix: 'https://developer.accuweather.com/sites/default/files/',
            postfix: '-s.png'
        },
        defaultParams: {
            units: 'Metric',
            city: 'kyiv',
            country: 'ua',
            locationKey: '324505'
        }    
    },
    actions: {
        getCurrentWeather: {
            rest: {
                method: 'GET',
                path: 'getCurrentWeather'
            },
            async handler(ctx) {
                let locationInfo = await ctx.call('location.getLocationInfo', ctx.params);
                let strQueryURL = this.getFullQueryUrl(locationInfo.locationKey, true);
                let response =  await fetch(strQueryURL);
                let fetchResult = await response.json();
                let result = this.getFormatedWeatherObject(fetchResult);
                result.location = {
                    city: locationInfo.city,
                    country: locationInfo.country,
                    locationKey: locationInfo.locationKey
                };
                
                return result;
            }
        },
        getFiveDaysWeather: {
            rest: {
                method: 'GET',
                path: 'getFiveDaysWeather'
            },
            async handler(ctx){
                let locationInfo = await ctx.call('location.getLocationInfo', ctx.params);
                let strQueryURL = this.getFullQueryUrl(locationInfo.locationKey, false);
                let response =  await fetch(strQueryURL);
                let fetchResult = await response.json();
                let result = this.getFormatedFiveDaysWeatherObject(fetchResult);
                result.location = {
                    city: locationInfo.city,
                    country: locationInfo.country,
                    locationKey: locationInfo.locationKey
                };
                return result;
            }
        }
    },
    methods: {
        getFullQueryUrl(locationKey = '', isCurrentWeather = true) {
            return this.settings.weatherAPIURL
                    + (isCurrentWeather ? 'currentconditions/v1/' : 'forecasts/v1/daily/5day/')
                    + locationKey + '?apikey='
                    + this.settings.apikey
                    + (isCurrentWeather ? '' : '&metric=true'); 
        },
        getFormatedWeatherObject(res = {}) {
            let weather = {
                temperature: res[0].Temperature[this.settings.defaultParams.units].Value,
                weatherText: res[0].WeatherText,
                weatherIcon: this.getIconURL(res[0].WeatherIcon),
                isDayTime: res[0].IsDayTime
            };

            return {
                weather: weather
            };
        },
        getFormatedFiveDaysWeatherObject(res = {}) {
            let weather = res.DailyForecasts.map((item) => {
                return {
                    date: item.Date,
                    minTemperature: item.Temperature.Minimum.Value,
                    mmaxemperature: item.Temperature.Maximum.Value
                };
            });

            return {
                weather: weather
            };
        },
        getIconURL(iconNumber = '00') {
            return this.settings.iconProps.prefix
                    + ('0' + iconNumber).slice(-2) 
                    + this.settings.iconProps.postfix;
        }
    },
    async created() {
    },
    async started() {
    }
}
