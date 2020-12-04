import * as redis from "promise-redis";
import * as dotenv from "dotenv";
import {Client} from "pg";

import {Bootstrap} from "./bootstrap";
import * as http from "http";
import {PostBody} from "./lib/PostBody";

const app = http.createServer();
dotenv.config();

//create connection to data storage
export const redisClient = redis().createClient();
redisClient.on("error", (error: RedisError) => {
    console.error(error);
});
export const dbConnection = new Client({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_BASE,
    password: process.env.DB_PASS
});
dbConnection.connect((err) => {
    if (err) {
        console.error('connection error', err.stack)
    } else {
        console.log('connected')
    }
});
//creating repositories

//creating models


//put new controllers here
const controllers = [];
const bootstrap = new Bootstrap(controllers);

bootstrap.start(app);

app.listen(process.env.PORT || 3000, () => {
    console.log(`listen on ${process.env.PORT || 3000}`)
});