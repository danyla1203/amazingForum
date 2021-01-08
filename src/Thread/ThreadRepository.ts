import {ThreadRepositoryI} from "./ThreadModel";
import {DatabaseError} from "../lib/Error";
import {Repository} from "../lib/Repository";
import {ShortTopic, Thread} from "./types";

export class ThreadRepository extends Repository implements ThreadRepositoryI {

    private setThreadsToCache(threads: Thread[]) {
        threads.map((thread: any) => {
            this.redisConn.hmset(`threads:${thread.thread_id}`, thread);
        });
    }

    private async getThreadFromCache(): Promise<Thread[]> {
        let threadsKeys = await this.redisConn.keys("threads:*");
        let threads = [];
        for (let i = 0; i < threadsKeys.length; i++) {
            let thread = await this.redisConn.hgetall(threadsKeys[i]);
            threads.push(thread);
        }
        return threads;
    }

    public async getThreads(): Promise<Thread[]> {
        try {
            let threadsFromCache = await this.getThreadFromCache();
            if (threadsFromCache.length > 0) {
                return threadsFromCache;
            }

            let countTopicsInThread =
                "select count(*), thread_id from topics\n" +
                "group by topics.thread_id";
            let threadsWithCount =
                `Select threads.thread_id, name, count from threads
                 join (${countTopicsInThread}) as t1 
                 ON threads.thread_id = t1.thread_id`;
            let result = await this.pg.query<Thread>(threadsWithCount);

            this.setThreadsToCache(result.rows);
            return result.rows;
        } catch (e) {
            throw new DatabaseError(e.message);
        }
    }
    public async getShortPosts(thread_id: number): Promise<ShortTopic[]> {
        try {
            let sql =
                `select topic_id, avatar_path as author_url, nickname as author_name, title, date from topics
                 join users
                 on users.id = topics.author_id
                 where thread_id = $1`;
            let result = await this.pg.query(sql, [thread_id]);
            return result.rows;
        } catch (e) {
            throw new DatabaseError(e.message);
        }
    }
}