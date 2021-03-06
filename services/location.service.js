const fetch = require('node-fetch');

module.exports = {
    name: 'location',
    settings: {
        locationAPIURL: 'http://dataservice.accuweather.com/locations/v1/cities/search',
        apikey: 'NMKYXqrwyHwLcMB4X3mVyQAayHHvttsS',
        defaultParams: {
            city: 'kyiv',
            country: 'ua',
            locationKey: '324505'
        }    
    },
    actions: {
        getLocationInfo: {
            rest: {
                method: 'GET',
                path: 'getLocationInfo'
            },
            async handler(ctx) {
                let city = this.settings.defaultParams.city;
                let country = this.settings.defaultParams.country;
                if(ctx.params.city && ctx.params.country) {
                    city = ctx.params.city;
                    country = ctx.params.country;
                }
                let strQueryURL = this.getFullQueryUrl({city: city, country: country});
                let response =  await fetch(strQueryURL);
                let fetchResult = await response.json();
                this.logger.info('LOGGER location.getLocationInfo (raw)', fetchResult);
                let result = this.getFormatedLocationObject(fetchResult);
                
                return result;
            }
        },
        getLocationKey: {
            rest: {
                method: 'GET',
                path: 'getLocationKey'
            },
            async handler(ctx){
                let result =  await ctx.call('location.getLocationInfo', ctx.params);
                this.logger.info('LOGGER location.getLocationKey result (raw)', result, result.err ? this.settings.defaultParams.locationKey : result.locationKey);
                return result.err ? this.settings.defaultParams.locationKey : result.locationKey;
            }
        }
    },
    methods: {
        getFullQueryUrl(params = {}) {
            return this.settings.locationAPIURL + '?apikey='
                    + this.settings.apikey + '&q='
                    + params.city + ',' + params.country; 
        },
        getFormatedLocationObject(res = []) {
            let location = {err: true, message: 'not found'};
            if(res.length != 0) {
                location = {
                    locationKey: res[0].Key,
                    city: res[0].EnglishName,
                    country: res[0].Country.ID,
                    countryName: res[0].Country.EnglishName,
                    region: res[0].Region.ID,
                    regionName: res[0].Region.EnglishName,
                    message: 'succeed',
                    err: false
                };
            };
            return location;
        }
    },
    async created() {},
    async started() {}
}
