import {AuthRepositoryI} from "./AuthenticationModel";
import {UserData} from "./types";
import {Repository} from "../lib/Repository";

export class AuthenticationRepository extends Repository implements AuthRepositoryI{
    async getUserByName(nickname: string) {
        let result = await this.pg.query<UserData>(
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