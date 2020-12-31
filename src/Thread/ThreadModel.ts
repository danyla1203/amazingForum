import {ShortTopic, Thread} from "./types";

export interface ThreadRepositoryI {
    getThreads(): Promise<Thread[]>
    getShortPosts(thread_id: number): Promise<ShortTopic[]>
}

export interface ThreadModelI {
    getAllThreads(): Promise<Thread[]>
    getPostsFromThread(thread_id: number): Promise<ShortTopic[]>
}

export class ThreadModel implements ThreadModelI{
    threadRepo: ThreadRepositoryI;
    constructor(threadRepo: ThreadRepositoryI) {
        this.threadRepo = threadRepo;
    }

    public getAllThreads() {
        return this.threadRepo.getThreads();
    }

    public getPostsFromThread(thread_id: number) {
        return this.threadRepo.getShortPosts(thread_id);
    }

}