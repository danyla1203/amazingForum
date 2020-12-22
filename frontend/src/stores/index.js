import {ThreadStore} from "./ThreadStore";
import {TopicsStore} from "./TopicsStore";
import {UserStore} from "./UserStore";
import {CurrentTopicStore} from "./CurrentTopicStore";

export default {
    threadStore: new ThreadStore(),
    topicStore: new TopicsStore(),
    userStore: new UserStore(),
    currentTopicStore: new CurrentTopicStore()
}