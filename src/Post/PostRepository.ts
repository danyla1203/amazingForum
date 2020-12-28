import {PostRepoI} from "./PostModel";
import {Repository} from "../lib/Repository";
import {DatabaseError} from "../lib/Error";
import {IncomingComment, Post} from "./types";

export class PostRepository extends Repository implements PostRepoI{
    async getCommentsForPost(post_id: number) {
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

    insertComment(comment: IncomingComment) {
        try {
            let fieldAndValues = this.getFieldValuesString(comment);
            let sql = `insert into comments($1) values($2)`;
            this.pg.query(sql, fieldAndValues);
        } catch (e) {
            throw new DatabaseError(e);
        }
    }

    async getPostData(post_id: number) {
        try {
            let post = await this.pg.query<Post>(
                "select * from topics where topic_id = $1",
                [post_id]
            );
            return post.rows[0];
        } catch (e) {
            throw new DatabaseError(e);
        }
    }
}