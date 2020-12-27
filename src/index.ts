import * as redis from "promise-redis";
import * as dotenv from "dotenv";
import {Pool} from "pg";

import {Bootstrap} from "./bootstrap";
import {AuthenticationController} from "./Authentication/AuthenticationController";
import {AuthenticationModel} from "./Authentication/AuthenticationModel";
import {AuthenticationRepository} from "./Authentication/AuthenticationRepository";
import {UserController} from "./User/UserController";
import {UserRepository} from "./User/UserRepository";
import {UserModel} from "./User/UserModel";
import {ThreadRepository} from "./Thread/ThreadRepository";
import {ThreadModel} from "./Thread/ThreadModel";
import {ThreadController} from "./Thread/ThreadController";
import {PostRepository} from "./Post/PostRepository";
import {PostModel} from "./Post/PostModel";
import {PostController} from "./Post/PostController";

dotenv.config();

//create connection to data storage
const redisClient = redis().createClient();
redisClient.on("error", (error: any) => {
    console.error(error);
});
const dbConnection = new Pool({
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
const userRepo  = new UserRepository(redisClient, dbConnection);
const threadRepo  = new ThreadRepository(redisClient, dbConnection);
const postRepo = new PostRepository(redisClient, dbConnection);

//creating models
const authModel = new AuthenticationModel(authRepo);
const userModel = new UserModel(userRepo);
const threadModel = new ThreadModel(threadRepo);
const postModel = new PostModel(postRepo);

//put new controllers here
const controllers = [
    new AuthenticationController(authModel),
    new UserController(authModel, userModel),
    new ThreadController(threadModel),
    new PostController(postModel)
];
const bootstrap = new Bootstrap(controllers);

bootstrap.start(parseInt(process.env.PORT) || 3000);