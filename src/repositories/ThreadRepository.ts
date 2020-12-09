import {ThreadRepositoryI} from "../models/ThreadModel";
import {Pool} from "pg";
import {Redis} from "ioredis";
import {DatabaseError} from "../lib/Error";

export class ThreadRepository implements ThreadRepositoryI {
    pg: Pool;
    redisConn: Redis;

    constructor(redisConn: Redis, pgConn) {
        this.redisConn = redisConn;
        this.pg = pgConn;
    }

    async getThreads() {
        try {
            let result = await this.pg.query("select * from threads");
            return result.rows[0];
        } catch (e) {
            throw new DatabaseError();
        }
    }
    async getPosts(thread_id: number) {
        try {
            let result = await this.pg.query(
                "select * from post where post.thread_id = $1",
                [thread_id]
            );
            return result.rows[0];
        } catch (e) {
            throw new DatabaseError();
        }
    }
}