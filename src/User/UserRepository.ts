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
            let sql = `update users set ${setString} where id = ${user_id}`;
            this.pg.query(sql);
        } catch (e) {
            throw new DatabaseError(e);
        }
    }
    async updateSessionData(session_id: string, updates: any): Promise<UserData> {
        this.redisConn.hash.mset(`user:${session_id}`, updates);
        let updatedUserData = this.redisConn.hash.getall(`user:${session_id}`);
        return updatedUserData
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