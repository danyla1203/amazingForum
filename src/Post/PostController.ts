import {get, post, put} from "../lib/httpMethodDecorators";
import {Request} from "../lib/ExtendContext";
import {PostModelI} from "./PostModel";
import {AuthModelI} from "../Authentication/AuthenticationModel";
import {IncomingComment, Topic} from "./types";

export class PostController {
    postModel: PostModelI;
    authModel: AuthModelI;
    constructor(model: PostModelI, authModel: AuthModelI) {
        this.postModel = model;
        this.authModel = authModel;
    }

    @get("/topic/:post_id")
    public getPost(req: Request): Promise<Topic> {
        let post_id = req.params.get("post_id");
        return this.postModel.getTopic(post_id);
    }

    @get("/topic/:post_id/messages")
    public getMessages(req: Request) {
        let post_id = req.params.get("post_id");
        return this.postModel.getComments(post_id);
    }

    @post("/topic/:post_id/add-comment")
    public async addComment(req: Request): Promise<void> {
        let { id } = await this.authModel.verifySession(req.cookies.get("s_id"));
        let topic_id = parseInt(req.params.get("post_id"));
        let text = req.body.get("text");

        let comment: IncomingComment = {
            author_id: id,
            topic_id: topic_id,
            text: text
        };
        console.log(comment);
        this.postModel.createComment(comment);
    }

    @post("/topic/create")
    public async createTopic(req: Request): Promise<Topic> {
        let { id } = await this.authModel.verifySession(req.cookies.get("s_id"));
        let topic = {
            author_id: id,
            thread_id: parseInt(req.body.get("thread_id")),
            title: req.body.get("title"),
            text: req.body.get("text"),
        };
        return this.postModel.createTopic(topic);
    }
    @put("/topic/:topic_id")
    public async updateTopic(req: Request): Promise<void> {
        let topic_id = parseInt(req.params.get("topic_id"));
        let { id } = await this.authModel.verifySession(req.cookies.get("s_id"));
        let newTopic = {
            author_id: id,
            title: req.body.get("title"),
            text: req.body.get("text"),
            thread_id: req.body.get("thread_id"),
        };
        this.postModel.updateTopic(topic_id, newTopic);
    }
}