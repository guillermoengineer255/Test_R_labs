const request =require("request")    
const moment =require ("moment");

const checkIfRequestFailed = () => {
    if(Math.random() < 0.1){
        throw new Error('El request de la API falló')
    }
}

class ForecastApi{
    constructor(redisRepository){
        this.redisRepository = redisRepository;
        this.apiUrl = 'https://api.darksky.net/forecast/c9a57893a276cc7e4462afcd20956222/';;
        this._doGetRequest = this._doGetRequest.bind(this);
    }

    _doGetRequest  (queryString)  {
        return new Promise((resolve,reject) => {
           const apiUrlWithParams = this.apiUrl + `${queryString}`;
           request(apiUrlWithParams, (err, res, body) => {
               if(err){
                   return reject(err);
               }
               resolve(body);
           });
       })
   }

 async   _getForecast (geospace)  {
        try{
            let body = await this._doGetRequest(geospace);
            let jsonResponse = JSON.parse(body);
            return {
                temperature: jsonResponse.currently.temperature,
                time: jsonResponse.currently.time,
                timezone: jsonResponse.timezone,
            };
        }catch(error){
            console.log(error.message);
        }
   }
    
   async getCityForecast   (geospace)  {
        let succeeded = false;
        while (true){
            try{
                checkIfRequestFailed();
                return this._getForecast(geospace); 
            }
            catch(error){
                console.log(error.message);
                let res = await this.redisRepository.hashSetAsync('api.errors', moment().unix(), error.message);
            }
        }
    }
}

module.exports = {ForecastApi:ForecastApi};