import {AuthRepositoryI} from "./AuthenticationModel";
import {UserData} from "./types";
import {Repository} from "../lib/Repository";
import {DatabaseError} from "../lib/Error";

export class AuthenticationRepository extends Repository implements AuthRepositoryI{
    async getUserByName(nickname: string) {
        try {
            let sql = "select * from users where nickname=$1";
            let result = await this.pg.query<UserData>(sql, [nickname]);
            return result.rows[0];
        } catch (e) {
            throw new DatabaseError(e);
        }
    }

    createSession(session_id: string, data: UserData) {
        try {
            return this.redisConn.hmset(`user:${session_id}`, {...data});
        } catch (e) {
            throw new DatabaseError(e);
        }
    }
    async getUserBySession(session_id: string): Promise<UserData> {
        try {
            return this.redisConn.hgetall<UserData>(session_id);
        } catch (e) {
            throw new DatabaseError(e);
        }
    }
    async destroySession(session_id: string): Promise<void> {
        try {
            await this.redisConn.del(session_id);
        } catch (e) {
            throw new DatabaseError(e);
        }
    }
}