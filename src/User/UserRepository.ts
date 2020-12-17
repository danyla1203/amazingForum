import {Redis} from "ioredis";
import {Pool} from "pg";
import {UserRepositoryI} from "./UserModel";
import {DatabaseError} from "../lib/Error";
import {UserIncomingData} from "./types";

export class UserRepository implements UserRepositoryI{
    redisConn: Redis;
    pgConn: Pool;

    constructor(redisConn: Redis, pgConn) {
        this.redisConn = redisConn;
        this.pgConn = pgConn;
    }

    private getFieldValuesString(obj: Object) {
        let fields = Object.keys(obj).join(", ");
        let values = "";
        for (let key in obj) {
            if (typeof obj[key] == "string") {
                values += `'${obj[key]}'`;
            } else {
                values += obj[key];
            }
        }
        return [fields, values];
    }

    private getSetPair(obj: Object) {
        let string = "";
        for (let key in obj) {
            if (typeof obj[key] == "string") {
                string += `${key} = '${obj[key]}', `;
            } else {
                string += `${key} = ${obj[key]}, `;
            }
        }
        return string;
    }

    async deleteUserFromBd(user_id: number) {
        let sql = `delete from users where user_id=${user_id}`;
        try {
            this.pgConn.query(sql);
        } catch (e) {
            throw new DatabaseError();
        }
    }
    async destroySession(session_id: string) {
        try {
            this.redisConn.del(session_id);
        } catch (e) {
            throw new DatabaseError();
        }
    }
    async createUser(user: UserIncomingData) {
        let [field, values] = this.getFieldValuesString(user);
        try {
            this.pgConn.query(
                "insert into users($1) VALUES($2)",
                [ field, values ]
            )
        } catch (e) {
            throw new DatabaseError();
        }
    }
    async updateUser(updates) {
        let setString = this.getSetPair(updates);
        try {
            this.pgConn.query(
                "update users set $1",
                [ setString ]
            )
        } catch (e) {
            throw new DatabaseError();
        }
    }
    async updateSessionData(updates: any) {

    }
}