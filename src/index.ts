import * as redis from "promise-redis";
import * as dotenv from "dotenv";
import {Pool} from "pg";

import {Bootstrap} from "./bootstrap";
import * as http from "http";
import {AuthenticationController} from "./controllers/AuthenticationController";
import {AuthenticationModel} from "./models/AuthenticationModel";
import {AuthenticationRepository} from "./repositories/AuthenticationRepository";

const app = http.createServer();
dotenv.config();

//create connection to data storage
export const redisClient = redis().createClient();
redisClient.on("error", (error: any) => {
    console.error(error);
});
export const dbConnection = new Pool({
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
const authRepo = new AuthenticationRepository(redisClient, dbConnection);

//creating models
const authModel = new AuthenticationModel(authRepo);

//put new controllers here
const controllers = [
    new AuthenticationController(authModel)
];
const bootstrap = new Bootstrap(controllers);

bootstrap.start(app);

app.listen(process.env.PORT || 3000, () => {
    console.log(`listen on ${process.env.PORT || 3000}`)
});