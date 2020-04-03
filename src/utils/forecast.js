const request = require('request')

const forecast = (latitude, longitude, callback) => {

    const url  = 'https://api.darksky.net/forecast/62a5d0eea47e7a1d7b4c435ef3713e26/'+latitude+','+longitude

    request({
        url,
        json: true
    }, (error, {body}) =>
       {
           if(error){
               callback("Unable to connect to weather service", undefined)

           }
           else if(body.error){
               callback("Some error occured while getting the weather info", undefined)
           }
           else {
               const current = body.currently
               callback(undefined, " it is currently "+ current.temperature+" degrees out there. There is "+current.precipProbability+"% chances of rain")
           }
           
       }
    )
}

module.exports = forecast