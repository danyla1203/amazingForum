import {Comment, IncomingComment, Post} from "./types";
import {BadCommentData} from "./errors";

export interface PostModelI {
    getPost(post_id: number): Promise<Post>
    getComments(post_id: number): Promise<Comment[]>
    createComment(comment: IncomingComment): void
}

export interface PostRepoI {
    getPostData(post_id: number): Promise<Post>
    getCommentsForPost(post_id: number): Promise<Comment[]>
    insertComment(comment: IncomingComment): void
}

export class PostModel implements PostModelI {
    repo: PostRepoI;
    constructor(repo: PostRepoI) {
        this.repo = repo;
    }

    private verifyIncomingCommentData(comment: IncomingComment): boolean {
        let necessaryColumns = ["author_id", "topic_id",  "text"];
        for (let i = 0; i < necessaryColumns.length; i++) {
            if (necessaryColumns[i] in comment) {
                if (comment[necessaryColumns[i]].length < 2) {
                    return false;
                }
            } else {
                return false;
            }
        }
        return true
    }

    async getPost(post_id: number) {
        return this.repo.getPostData(post_id);
    }
    async getComments(post_id: number) {
        return this.repo.getCommentsForPost(post_id);
    }

    createComment(comment: IncomingComment) {
        let isCommentValid = this.verifyIncomingCommentData(comment);
        if (isCommentValid) {
            this.repo.insertComment(comment)
        } else {
            throw new BadCommentData();
        }
    }
}