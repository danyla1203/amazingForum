import {PostRepoI} from "./PostModel";
import {Repository} from "../lib/Repository";
import {DatabaseError} from "../lib/Error";
import {Comment, IncomingComment, IncomingTopic, Topic} from "./types";

export class PostRepository extends Repository implements PostRepoI{
    async getCommentsForTopic(post_id: number): Promise<Comment[]> {
        try {
            let sql =
                `select comments.id, comments.text, users.nickname as author_name, users.avatar_path as user_avatar, comments.date from comments
                 join topics
                 on comments.topic_id = topics.topic_id
                 join users
                 on users.id = comments.author_id
                 where comments.topic_id = ${post_id}`;
            let comments = await this.pg.query(sql);
            return comments.rows;
        } catch (e) {
            throw new DatabaseError(e);
        }
    }

    insertComment(comment: IncomingComment): void {
        try {
            let [field, values] = this.getFieldValuesString(comment);
            let sql = `insert into comments(${field}) values(${values})`;
            this.pg.query(sql);
        } catch (e) {
            throw new DatabaseError(e);
        }
    }
    async createTopic(topic: IncomingTopic): Promise<Topic> {
        try {
            //update topics count in thread
            this.redisConn.hash.incby(`threads:${topic.thread_id}`, "count", 1);

            let [field, values] = this.getFieldValuesString(topic);
            let sql = `insert into topics(${field}) values(${values}) returning *`;
            let result = await this.pg.query<Topic>(sql);
            return result.rows[0];
        } catch (e) {
            throw new DatabaseError(e);
        }
    }

    async getTopicData(post_id: number): Promise<Topic> {
        try {
            let sql =
                `select topic_id, author_id, title, text, date, nickname as author_name, email, avatar_path from topics 
                 join users
                 on users.id = topics.author_id
                 where topic_id = $1`;
            let post = await this.pg.query<Topic>(sql, [post_id]);
            return post.rows[0];
        } catch (e) {
            throw new DatabaseError(e);
        }
    }
    async updateTopic(topic_id: number, newData: IncomingTopic): Promise<void> {
        try {
            let setPairs = this.getSetPair(newData);
            let sql = `update topics set ${setPairs} where topic_id = ${topic_id}`;
            await this.pg.query(sql);
        } catch (e) {
            throw new DatabaseError(e);
        }
    }
}