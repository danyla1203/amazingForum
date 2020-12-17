import {AuthRepositoryI} from "./AuthenticationModel";
import {Redis} from "ioredis";
import {Pool} from "pg";
import {UserData} from "./types";

export class AuthenticationRepository implements AuthRepositoryI{
    redisConn: Redis;
    pgConn: Pool;

    constructor(redisConn: Redis, pgConn) {
        this.redisConn = redisConn;
        this.pgConn = pgConn;
    }

    async getUserByName(nickname: string) {
        let result = await this.pgConn.query<UserData | undefined>(
            "select * from users where nickname=$1",
            [nickname]
        );
        return result.rows[0];
    }

    createSession(session_id: string, data: UserData) {
        return this.redisConn.hmset(`user:${session_id}`, {...data});
    }
    async getUserBySession(session_id: string): Promise<UserData | undefined> {
        return this.redisConn.hgetall<UserData | undefined>(session_id);
    }
    destroySession(session_id: string) {
        this.redisConn.del(session_id);
    }
}