const express = require('express');
const cors = require('cors');
const {Pool} = require('pg')
const redis = require('redis')

const keys = require('./keys');



const app = express()


app.use(express.json())
app.use(cors())


const  pgClient = new Pool({
    user: keys.pgUser,
    password: keys.pgPassword,
    database: keys.pgDatabase,
    host: keys.pgHost,
    port: keys.pgPort
})

pgClient.on('connect', client=>{
    client.query('CREATE TABLE IF NOT EXISTS values (number INT)')
    .catch(()=>console.log('Something went wrong'))
})


const redisClient = redis.createClient({
    url:`redis://${keys.redisHost}:${keys.redisPort}`,
    retry_strategy: ()=>1000
})

const sub = redisClient.duplicate();


app.get('/values/all', async(req,res)=>{
    const values = await pgClient.query('SELECT * FROM values')
    return res.status(200).json(values.rows);
})


app.get('/values/current', async(req,res)=>{
    redisClient.hgetall('values',(err, values)=>{
        return res.status(200).send(values);
    })
})


app.post('/values', async(req,res)=>{
    const index = req.body.index;
    if(parseInt(index)>40) {
        return res.status(422).send('Index too high')
    }

    await pgClient.query('INSERT INTO values(number) VALUES($1)', [index]);
    await redisClient.hset('values', index, 'nothing set yet');
    await sub.publish('insert', index);

    return res.status(201).json({working: true})
})


app.listen(9095, ()=>{
    console.log('Server running on port 9095')
})