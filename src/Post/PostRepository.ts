import {PostRepoI} from "./PostModel";
import {Repository} from "../lib/Repository";
import {DatabaseError} from "../lib/Error";

export class PostRepository extends Repository implements PostRepoI{
    async getCommentsForPost(post_id: number) {
        try {
            let sql = "select * from comments" +
                " join topic" +
                " on topic.id = comments.topic_id" +
                " where post_id = $1";
            let comments = await this.pg.query(sql, [post_id])
            return comments.rows[0];
        } catch (e) {
            throw new DatabaseError();
        }
    }
    async getPostData(post_id: number) {
        try {
            let post = await this.pg.query(
                "select * from topics where topic_id = $1",
                [post_id]
            );
            return post.rows[0];
        } catch (e) {
            throw new DatabaseError();
        }
    }
}