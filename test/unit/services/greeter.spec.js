"use strict";

const { ServiceBroker } = require("moleculer");
const { ValidationError } = require("moleculer").Errors;
const TestService = require("../../../services/greeter.service");

describe("Test 'greeter' service", () => {
	let broker = new ServiceBroker({ logger: false });
	broker.createService(TestService);

	beforeAll(() => broker.start());
	afterAll(() => broker.stop());

	describe("Testing 'greeter.ahoy' action", () => {
		it("TESTING AHOY METHOD", async () => {
			let res = await broker.call("greeter.ahoy", {name: 'someName', age: '0'});
			res['ageType'] = typeof(res.age);
			delete res.age;
			expect(res).toEqual({ageType: 'number', name: 'someName'});
		});	
	});

	/*describe("Test 'greeter.hello' action", () => {

		it("should return with 'Hello Moleculer'", async () => {
			const res = await broker.call("greeter.hello");
			expect(res).toBe("Hello Moleculer");
		});

	});

	describe("Test 'greeter.welcome' action", () => {

		it("should return with 'Welcome'", async () => {
			const res = await broker.call("greeter.welcome", { name: "Adam" });
			expect(res).toBe("Welcome, Adam");
		});

		it("should reject an ValidationError", async () => {
			expect.assertions(1);
			try {
				await broker.call("greeter.welcome");
			} catch(err) {
				expect(err).toBeInstanceOf(ValidationError);
			}
		});

	});*/

});

