import {Comment, Post} from "./types";

export interface PostModelI {
    getPost(post_id: number): Promise<Post>
    getComments(post_id: number): Promise<Comment[]>
}

export interface PostRepoI {
    getPostData(post_id: number): Promise<Post>
    getCommentsForPost(post_id: number): Promise<Comment[]>
}

export class PostModel implements PostModelI {
    repo: PostRepoI;
    constructor(repo: PostRepoI) {
        this.repo = repo;
    }

    async getPost(post_id: number) {
        return this.repo.getPostData(post_id);
    }
    async getComments(post_id: number) {
        return this.repo.getCommentsForPost(post_id);
    }

}