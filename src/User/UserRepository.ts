import {UserRepositoryI} from "./UserModel";
import {DatabaseError} from "../lib/Error";
import {UserData, UserIncomingData} from "./types";
import {Repository} from "../lib/Repository";
import {Comment} from "../Post/types";

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
    async createUser(user: UserData) {
        let [field, values] = this.getFieldValuesString(user);
        try {
            let result = await this.pg.query<{id: number}>(
                `insert into users(${field}) VALUES(${values}) returning id`,
            );
            return Object.assign(user, result.rows[0]);

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

    async getCommentsForUser(user_id: number) {
        try {
            let sql = "select * from comments where user_id = $1";
            let result = await this.pg.query<Comment>(sql, [user_id]);
            return result.rows;
        } catch (e) {
            throw new DatabaseError(e);
        }
    }
    async getTopicsForUser(user_id: number) {
        try {
            let sql =
                `select from topics
                where user_id = $1`
            let result = await this.pg.query(sql, [user_id])
            return result.rows
        }
    }
}