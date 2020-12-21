import {ThreadStore} from "./ThreadStore";
import {TopicsStore} from "./TopicsStore";
import {UserStore} from "./UserStore";

export default {
    threadStore: new ThreadStore(),
    topicStore: new TopicsStore(),
    userStore: new UserStore(),
};