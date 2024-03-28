const keys = require('./keys');

const redis = require('redis');



const redisClient = redis.createClient({
    url:`redis://${keys.redisHost}:${keys.redisPort}`,
    retry_strategy: ()=>1000
})


const sub = redisClient.duplicate();


sub.on('message', (channel, message)=>{
    redisClient.hset('values', message, fib(parseInt(message)))
})


const fib=(index)=>{
    if(index<2) return 1;
    return fib(index-1)+fib(index-2);
}

sub.subscribe('insert');

