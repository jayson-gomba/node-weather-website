const request = require('request')

const geocode = (address, callback) => {
    const url = 'http://api.positionstack.com/v1/forward?access_key=2d1130af679114ea699261cceb20e630&%20query='+encodeURIComponent(address)+'&limit=1'

    request({url, json:true}, (error, {body})=>{
        if(error){
            callback('Unable to connect geocode service!', undefined)
        } else if(body.error || body.data.length === 0){
            callback('Unable to find location with current input!', undefined)
        } else {
            callback(undefined, {
                latitude: body.data[0].latitude,
                longitude: body.data[0].longitude,
                location: body.data[0].label
            })
        }
    })
}

module.exports = geocode