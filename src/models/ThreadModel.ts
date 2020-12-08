export interface ThreadRepositoryI {
    getThreads(): Promise<Thread[]>
    getPosts(thread_id: number): Promise<any>;
}

type Thread = {
    id: number
    name: string
}

export class ThreadModel {
    threadRepo: ThreadRepositoryI;
    constructor(threadRepo: ThreadRepositoryI) {
        this.threadRepo = threadRepo;
    }

    public getAllThreads() {
        return this.threadRepo.getThreads();
    }

    public getPostsFromThread(thread_id: number) {
        return this.threadRepo.getPosts(thread_id);
    }

}