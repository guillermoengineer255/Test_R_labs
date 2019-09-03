const express = require("express");
const redis = require("redis");
const http =  require("http");
var CitiesHelper = require('./Utils/CitiesHelper');
var RedisRepository = require('./Repositories/RedisRepository');
var ForecastApi =require('./Utils/ForecastApi');

const app = express();

let client = redis.createClient();
function redisRepository()  { 
    new RedisRepository(client)
};
function forecastApi()  { 
    new ForecastApi(redisRepository)
};
function citiesHelper() {
    new CitiesHelper(redisRepository, forecastApi)
};
citiesHelper().saveCities();

app.citiesHelper = citiesHelper;

const port = 3000;
let server = http.createServer(app).listen(port, () =>
[console.log("Running port 3000")]);





module.exports ={app:app};