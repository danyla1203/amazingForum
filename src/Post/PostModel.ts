import {Comment, IncomingComment, IncomingTopic, Topic} from "./types";
import {BadAuthor, BadCommentData, BadTopicData} from "./errors";

export interface PostModelI {
    getTopic(post_id: number): Promise<Topic>
    getComments(post_id: number): Promise<Comment[]>
    createComment(comment: IncomingComment): void
    createTopic(topic: IncomingTopic): Promise<Topic>
    updateTopic(topic_id: number, updater_id: number, newTopicData: IncomingTopic): Promise<void>
}

export interface PostRepoI {
    getTopicData(post_id: number): Promise<Topic>
    getCommentsForTopic(post_id: number): Promise<Comment[]>
    insertComment(comment: IncomingComment): void
    createTopic(topic: IncomingTopic): Promise<Topic>
    updateTopic(topic_id: number, newData: IncomingTopic): void
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
    private verifyDataForTopicUpdate(topic: IncomingTopic): boolean {
        return true;
    }
    private findUpdates(oldTopic: Topic, newTopic: IncomingTopic): IncomingTopic  {
        return {}
    }

    public async getTopic(post_id: number): Promise<Topic> {
        return this.repo.getTopicData(post_id);
    }
    public async getComments(post_id: number): Promise<Comment[]> {
        return this.repo.getCommentsForTopic(post_id);
    }
    public createComment(comment: IncomingComment): void {
        let isCommentValid = this.verifyIncomingCommentData(comment);
        if (isCommentValid) {
            this.repo.insertComment(comment)
        } else {
            throw new BadCommentData();
        }
    }
    public createTopic(newTopic: IncomingTopic): Promise<Topic> {
        let isTopicValid = this.verifyTopicData(newTopic);
        if (isTopicValid) {
            return this.repo.createTopic(newTopic);
        } else {
            throw new BadTopicData();
        }
    }

    public async updateTopic
    (
        topic_id: number,
        updater_id: number,
        newTopicData: IncomingTopic
    ): Promise<void> {
        let oldTopic = await this.repo.getTopicData(topic_id);
        if (oldTopic.author_id == updater_id) {
            let isValid = this.verifyDataForTopicUpdate(oldTopic);
            if(isValid) {
                let updatedFields = this.findUpdates(oldTopic, newTopicData);
                this.repo.updateTopic(oldTopic.topic_id, updatedFields);
            } else {
                throw new BadTopicData();
            }
        } else {
            throw new BadAuthor();
        }
    }
}