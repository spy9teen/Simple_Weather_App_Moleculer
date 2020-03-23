[![Moleculer](https://badgen.net/badge/Powered%20by/Moleculer/0e83cd)](https://moleculer.services)

# moleculer_Weather
This is a [Moleculer](https://moleculer.services/)-based microservices project. Generated with the [Moleculer CLI](https://moleculer.services/docs/0.14/moleculer-cli.html).

## Usage
- Start the project with `npm run dev` command.
- Start testst with  `npm run test` command.

## Services
- **weather** - http://localhost:3000/api/weather/. Methods: getCurrentWeather, getFiveDaysWeather. Params: city, country.
- **location** - http://localhost:3000/api/location/. Methods: getLocationInfo, getLocationKey. Params: city, country.

## Tests
- tests for actions and settings for location service
- partial test for getCurrentWeather action of weather service

### to be continued...
- will add location search
- will add comparing of current weather and weather on user's date
- will cover all weather w/ tests
