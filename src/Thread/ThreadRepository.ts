import {ThreadRepositoryI} from "./ThreadModel";
import {DatabaseError} from "../lib/Error";
import {Repository} from "../lib/Repository";

export class ThreadRepository extends Repository implements ThreadRepositoryI {
    async getThreads() {
        try {
            let countTopicsInThread =
                "select count(*), thread_id from topics\n" +
                "group by topics.thread_id";
            let threadsWithCount =
                `Select threads.thread_id, name, count from threads
                 join (${countTopicsInThread}) as t1 
                 ON threads.thread_id = t1.thread_id`;

            let result = await this.pg.query(threadsWithCount);
            return result.rows || [];
        } catch (e) {
            throw new DatabaseError(e.message);
        }
    }
    async getPosts(thread_id: number) {
        try {
            let result = await this.pg.query(
                "select * from topics where topics.thread_id = $1",
                [thread_id]
            );
            return result.rows || [];
        } catch (e) {
            throw new DatabaseError(e.message);
        }
    }
}