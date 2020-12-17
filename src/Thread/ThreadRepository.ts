import {ThreadRepositoryI} from "./ThreadModel";
import {DatabaseError} from "../lib/Error";
import {Repository} from "../lib/Repository";

export class ThreadRepository extends Repository implements ThreadRepositoryI {
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