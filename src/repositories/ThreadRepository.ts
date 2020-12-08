import {ThreadRepositoryI} from "../models/ThreadModel";

export class ThreadRepository implements ThreadRepositoryI {
    async getThreads() {}
    async getPosts(thread_id: number) {}
}