import {PostRepoI} from "./PostModel";
import {Repository} from "../lib/Repository";
import {DatabaseError} from "../lib/Error";
import {Comment, IncomingComment, IncomingTopic, Topic} from "./types";

export class PostRepository extends Repository implements PostRepoI{
    async getCommentsForTopic(post_id: number): Promise<Comment[]> {
        try {
            let sql = "select * from comments" +
                " join topics" +
                " on topics.topic_id = comments.topic_id" +
                " where comments.topic_id = $1";
            let comments = await this.pg.query(sql, [post_id]);
            return comments.rows;
        } catch (e) {
            throw new DatabaseError(e);
        }
    }

    insertComment(comment: IncomingComment): void {
        try {
            let fieldAndValues = this.getFieldValuesString(comment);
            let sql = `insert into comments($1) values($2)`;
            this.pg.query(sql, fieldAndValues);
        } catch (e) {
            throw new DatabaseError(e);
        }
    }
    async createTopic(topic: IncomingTopic): Promise<Topic> {
        try {
            let fieldAndValues = this.getFieldValuesString(topic);
            let sql = "insert into topics($1) values($2) returning *";
            let result = await this.pg.query<Topic>(sql, fieldAndValues);
            return result.rows[0];
        } catch (e) {
            throw new DatabaseError(e);
        }
    }

    async getTopicData(post_id: number): Promise<Topic> {
        try {
            let sql = "select * from topics where topic_id = $1";
            let post = await this.pg.query<Topic>(sql, [post_id]);
            return post.rows[0];
        } catch (e) {
            throw new DatabaseError(e);
        }
    }
    async updateTopic(topic_id: number, newData: IncomingTopic): Promise<void> {
        try {
            let setPairs = this.getSetPair(newData);
            let sql = "update topics set $1 where topic_id = $2";
            await this.pg.query(sql, [setPairs, topic_id]);
        } catch (e) {
            throw new DatabaseError(e);
        }
    }
}