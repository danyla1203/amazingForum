import {Redis} from "ioredis";
import {Pool} from "pg";
import {UserRepositoryI} from "./UserModel";
import {DatabaseError} from "../lib/Error";
import {UserIncomingData} from "./types";
import {Repository} from "../lib/Repository";

export class UserRepository extends Repository implements UserRepositoryI{
    async deleteUserFromBd(user_id: number) {
        let sql = `delete from users where user_id=${user_id}`;
        try {
            this.pg.query(sql);
        } catch (e) {
            throw new DatabaseError(e);
        }
    }
    async destroySession(session_id: string) {
        try {
            this.redisConn.del(session_id);
        } catch (e) {
            throw new DatabaseError(e);
        }
    }
    async createUser(user: UserIncomingData) {
        let [field, values] = this.getFieldValuesString(user);
        try {
            let result = await this.pg.query(
                "insert into users($1) VALUES($2) returning id",
                [ field, values ]
            );
            return Object.assign({}, result.rows, user);
        } catch (e) {
            throw new DatabaseError(e);
        }
    }
    async updateUser(updates: UserIncomingData) {
        let setString = this.getSetPair(updates);
        try {
            this.pg.query(
                "update users set $1",
                [ setString ]
            )
        } catch (e) {
            throw new DatabaseError(e);
        }
    }
    async updateSessionData(updates: any) {

    }
}