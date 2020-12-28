import {Comment, IncomingComment, IncomingTopic, Post, Topic} from "./types";
import {BadCommentData, BadTopicData} from "./errors";

export interface PostModelI {
    getPost(post_id: number): Promise<Post>
    getComments(post_id: number): Promise<Comment[]>
    createComment(comment: IncomingComment): void
    createTopic(topic: IncomingTopic): Promise<Topic>
}

export interface PostRepoI {
    getPostData(post_id: number): Promise<Post>
    getCommentsForPost(post_id: number): Promise<Comment[]>
    insertComment(comment: IncomingComment): void
    createTopic(topic: IncomingTopic): Promise<Topic>
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
    private verifyTopicData(topic: IncomingTopic): boolean {
        let necessaryColumns = ["author_id", "thread_id", "title",  "text"];
        for (let i = 0; i < necessaryColumns.length; i++) {
            if (necessaryColumns[i] in topic) {
                if (topic[necessaryColumns[i]].length < 2) {
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

    createTopic(newTopic: IncomingTopic) {
        let isTopicValid = this.verifyTopicData(newTopic);
        if (isTopicValid) {
            return this.repo.createTopic(newTopic);
        } else {
            throw new BadTopicData();
        }
    }
}