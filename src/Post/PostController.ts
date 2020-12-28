import {get, post} from "../lib/httpMethodDecorators";
import {Request} from "../lib/ExtendContext";
import {PostModelI} from "./PostModel";
import {AuthModelI} from "../Authentication/AuthenticationModel";

export class PostController {
    postModel: PostModelI;
    authModel: AuthModelI;
    constructor(model: PostModelI, authModel: AuthModelI) {
        this.postModel = model;
        this.authModel = authModel;
    }

    @get("/topic/:post_id")
    public getPost(req: Request) {
        let post_id = req.params.get("post_id");
        return this.postModel.getPost(post_id);
    }

    @get("/topic/:post_id/messages")
    public getMessages(req: Request) {
        let post_id = req.params.get("post_id");
        return this.postModel.getComments(post_id);
    }

    @post("/topic/:post_id/add-comment")
    public async addComment(req: Request) {
        let { user_id } = await this.authModel.verifySession(req.body.get("s_id"));
        let topic_id = req.params.get("post_id");
        let text = req.body.get("text");

        let comment = {
            author_id: user_id,
            topic_id: topic_id,
            text: text
        };
        this.postModel.createComment(comment);
    }

    @post("/topic/create")
    public async createTopic(req: Request) {
        let { user_id } = await this.authModel.verifySession(req.body.get("s_id"));
        let topic = {
            author_id: user_id,
            thread_id: req.body.get("thread_id"),
            title: req.body.get("title"),
            text: req.body.get("text"),
        };
        return this.postModel.createTopic(topic);
    }
}