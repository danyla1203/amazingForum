import {UserRepositoryI} from "./UserModel";
import {DatabaseError} from "../lib/Error";
import {UserData, UserIncomingData} from "./types";
import {Repository} from "../lib/Repository";
import {Comment} from "../Post/types";
import {ShortTopic} from "../Thread/types";

export class UserRepository extends Repository implements UserRepositoryI{
    async deleteUserFromBd(user_id: number): Promise<void> {
        let sql = `delete from users where id=${user_id}`;
        try {
            this.pg.query(sql);
        } catch (e) {
            throw new DatabaseError(e);
        }
    }
    async destroySession(session_id: string): Promise<void> {
        try {
            this.redisConn.del(session_id);
        } catch (e) {
            throw new DatabaseError(e);
        }
    }
    async createUser(user: UserData): Promise<UserData> {
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
    async updateUser(updates: UserIncomingData, user_id: number): Promise<void> {
        let setString = this.getSetPair(updates);
        try {
            this.pg.query(
                "update users set $1 where id = $2",
                [ setString, user_id ]
            )
        } catch (e) {
            throw new DatabaseError(e);
        }
    }
    async updateSessionData(updates: any) {

    }

    async getCommentsForUser(user_id: number): Promise<Comment[]> {
        try {
            let sql = `select * from comments where author_id = ${user_id}`;
            let result = await this.pg.query<Comment>(sql);
            return result.rows;
        } catch (e) {
            throw new DatabaseError(e);
        }
    }
    async getTopicsForUser(user_id: number): Promise<ShortTopic[]> {
        console.log(user_id);
        try {
            let sql =
                `select from topics
                where author_id = ${user_id}`;
            let result = await this.pg.query(sql);
            return result.rows
        } catch (e) {
            throw new DatabaseError(e);
        }
    }
}