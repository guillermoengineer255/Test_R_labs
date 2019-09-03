const {promisify} = require("util")

class RedisRepository{
    constructor(redisClient){
        this.redis = redisClient;
        this.hashGetAsync = this.hashGetAsync.bind(this);
    }

   async hashGetAsync  (hash,key)  { 
        return promisify(this.redis.hget).bind(this.redis)(hash,key);
    }

   async  hashSetAsync  (hash,key,value)  {
        return promisify(this.redis.hset).bind(this.redis)(hash,key,value);
    }
}

module.exports = {RedisRepository:RedisRepository};