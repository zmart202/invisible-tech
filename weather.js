const axios = require('axios');

const locationArray = [
    {
        locationName: 'us',
        postalCode: '01760'
    },
    {
        locationName: 'us',
        postalCode: '84111'
    }
]

const getWeather = async() => {
    try {
        for (let loc in locationArray) {
            const location = locationArray[loc]

            // Pulling from OpenWeatherMap API to get the weather and coordinates of location
            const weather = 
                await axios.get(`https://api.openweathermap.org/data/2.5/weather?zip=${location.postalCode},${location.locationName}&APPID=ed8d80476c16466b123b5d24ad720a6a`)
            
            // Pulling from DarkSky using coordinates to get exact time based on timezone
            const coords = 
                await axios.get(`https://api.darksky.net/forecast/842ac45abba7d10d96a6983d990e63d4/${weather.data.coord.lat},${weather.data.coord.lon}`)
            
            const options = {
                timeZone: `${coords.data.timezone}`,
                year: 'numeric', month: 'numeric', day: 'numeric',
                hour: 'numeric', minute: 'numeric', second: 'numeric',
            }

            // Converting the current time based on the timezone using the options above
            const formatter = new Intl.DateTimeFormat([], options)
            const formattedTime = formatter.format(new Date())

            console.log('Weather: ', weather.data.main,'\n', 'Current Time: ', formattedTime)
        }
    } catch(e) {
        console.error(e)
    }
}

getWeather()