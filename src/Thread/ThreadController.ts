import {ThreadModelI} from "./ThreadModel";
import {get} from "../lib/httpMethodDecorators";
import {Request} from "../lib/ExtendContext";
import {ShortTopic, Thread} from "./types";

export class ThreadController {
    threadModel: ThreadModelI;
    constructor(threadModel: ThreadModelI) {
        this.threadModel = threadModel;
    }

    @get("/threads")
    async getThreads(): Promise<Thread[]>  {
        return this.threadModel.getAllThreads();
    }

    @get("/thread/:id")
    async getPosts(req: Request): Promise<ShortTopic[]> {
        let thread_id = req.params.get("id");
        return this.threadModel.getPostsFromThread(thread_id);
    }
}