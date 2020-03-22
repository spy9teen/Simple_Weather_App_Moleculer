"use strict";

const { ServiceBroker } = require("moleculer");
const { ValidationError } = require("moleculer").Errors;
const TestService = require("../../../services/location.service");

describe("Test 'location' service:", () => {
	let broker = new ServiceBroker({ logger: false });
	let service = broker.createService(TestService);

	beforeAll(() => broker.start());
    afterAll(() => broker.stop());

    //tests for actions
    /*describe("Testing 'location' service actions:", () => {

        //tests for location.getLocationInfo
        describe("Testing 'location.getLocationInfo' action:", () => {
            it("Testing 'location.getLocationInfo' for: {city: 'Sumy', country: 'UA'}. Expecting location info.", async () => {
                let res = await broker.call('location.getLocationInfo', {city: 'Sumy', country: 'UA'});
                let expecting = {locationKey: '325825',
                                city: 'Sumy',
                                country: 'UA',
                                countryName: 'Ukraine',
                                region: 'EUR',
                                regionName: 'Europe',
                                message: 'succeed',
                                err: false};
                expect(res).toEqual(expecting);
            });
            it("Testing 'location.getLocationInfo' for: empty city and country. Expecting default location info (Kyiv, UA).", async () => {
                let res = await broker.call('location.getLocationInfo', {city: '', country: ''});
                let expecting = {locationKey: '324505',
                                city: 'Kyiv',
                                country: 'UA',
                                countryName: 'Ukraine',
                                region: 'EUR',
                                regionName: 'Europe',
                                message: 'succeed',
                                err: false};
                expect(res).toEqual(expecting);
            });
            it("Testing 'location.getLocationInfo' without params. Expecting default location info (Kyiv, UA).", async () => {
                let res = await broker.call('location.getLocationInfo');
                let expecting = {locationKey: '324505',
                                city: 'Kyiv',
                                country: 'UA',
                                countryName: 'Ukraine',
                                region: 'EUR',
                                regionName: 'Europe',
                                message: 'succeed',
                                err: false};
                expect(res).toEqual(expecting);
            });
            it("Testing 'location.getLocationInfo' for: fake city and country. Expecting '{message: 'not found', err: true}'", async () => {
                let res = await broker.call('location.getLocationInfo', {city: 'Not in Kansas anymore', country: 'OZ'});
                expect(res).toEqual({message: 'not found', err: true});
            });	
        });//tests for location.getLocationInfo
        
        //tests for location.getLocationKey
        describe("Testing 'location.getLocationKey' action:", () => {
            it("Testing 'location.getLocationKey' for: {city: 'Sumy', country: 'UA'}. Expecting correct location key.", async () => {
                let res = await broker.call('location.getLocationKey', {city: 'Sumy', country: 'UA'});
                expect(res).toBe('325825');
            });
            it("Testing 'location.getLocationKey' for: empty city and country. Expecting default location key (Kyiv, UA).", async () => {
                let res = await broker.call('location.getLocationKey', {city: '', country: ''});
                expect(res).toBe('324505');
            });
            it("Testing 'location.getLocationKey' without params. Expecting default location key (Kyiv, UA).", async () => {
                let res = await broker.call('location.getLocationKey');
                expect(res).toBe('324505');
            });
            it("Testing 'location.getLocationInfo' for: fake city and country.  Expecting default location key (Kyiv, UA).", async () => {
                let res = await broker.call('location.getLocationKey', {city: 'Not in Kansas anymore', country: 'OZ'});
                expect(res).toBe('324505');
            });    
        });//tests for location.getLocationKey
    });//tests for actions*/

    //tests for settings
    describe("Testing 'location' service settings:", () => {

        it("Testing locationAPIURL should be 'http://dataservice.accuweather.com/locations/v1/cities/search'", () => {
            expect(service.settings.locationAPIURL).toBe('http://dataservice.accuweather.com/locations/v1/cities/search');    
        });
        it("Testing apikey should be 'NMKYXqrwyHwLcMB4X3mVyQAayHHvttsS'", () => {
            expect(service.settings.apikey).toBe('NMKYXqrwyHwLcMB4X3mVyQAayHHvttsS');    
        });

        describe("Testing defaultParams:", () => {
            it("Testing default city should be 'kyiv'", () => {
                expect(service.settings.defaultParams.city).toBe('kyiv');    
            });
            it("Testing default country should be 'ua'", () => {
                expect(service.settings.defaultParams.country).toBe('ua');    
            });
            it("Testing default locationKey should be '324505'", () => {
                expect(service.settings.defaultParams.locationKey).toBe('324505');    
            });     
        });
    });//tests for settings
});
