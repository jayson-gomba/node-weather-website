const request = require('request')

const forecast = (latitude, longitude, callback)=>{
    const url = 'http://api.weatherstack.com/current?access_key=af0d9328255db1e700dfa6d852027684&query='+latitude+','+longitude
    request({url, json: true}, (error, {body})=>{
        if(error){
           callback('Unable to connect to weather service!', undefined)
        } else if(body.error){
            callback('Unable to find location', undefined)
        } else {
            callback(
                undefined, 
                body.current.weather_descriptions[0] + 
                '. It is currently ' + body.current.temperature + 
                ' degrees. It feels like ' + body.current.feelslike + 
                ' degrees. The humidity is ' + body.current.humidity + '%.')
        }
    })
}

module.exports = forecast