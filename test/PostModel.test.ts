import {PostModel} from "../src/Post/PostModel";
import {Pool} from "pg";
import * as redis from "redis-mock";
import {ComfortRedis} from "nice-redis/index";
import {PostRepository} from "../src/Post/PostRepository";
import {IncomingComment, IncomingTopic} from "../src/Post/types";

const model = new PostModel(new PostRepository(new ComfortRedis(redis.createClient()), new Pool()));

describe("test methods", () => {
    test("test verifyIncomingCommentData", () => {
        let comment: IncomingComment = {
            author_id: 1,
            topic_id: 2,
            text: "Helllo tests"
        };

        expect(model["verifyIncomingCommentData"](comment)).toBe(true);

        comment.text = "";
        expect(model["verifyIncomingCommentData"](comment)).toBe(false);

        comment = {
            author_id: 1,
            topic_id: undefined,
            text: "Helllo tests"
        };
        expect(model["verifyIncomingCommentData"](comment)).toBe(false);

        comment = {
            author_id: undefined,
            topic_id: 2,
            text: "Helllo tests"
        };
        expect(model["verifyIncomingCommentData"](comment)).toBe(false);
    });
    test("test verifyTopicData", () => {
        let topic: IncomingTopic = {
            author_id: 1,
            thread_id: 1,
            title: "Test",
            text: "Hello worl"
        };
        expect(model["verifyTopicData"](topic)).toBe(true);

        topic = {
            author_id: 1,
            thread_id: undefined,
            title: "Test",
            text: "Hello worl"
        };
        expect(model["verifyTopicData"](topic)).toBe(false);

        topic = {
            author_id: 1,
            thread_id: 2,
            title: "Test",
            text: "l"
        };
        expect(model["verifyTopicData"](topic)).toBe(false);

        topic = {
            author_id: 1,
            thread_id: 2,
            title: "2",
            text: "Test text"
        };
        expect(model["verifyTopicData"](topic)).toBe(false);
    });
    test("test find updates", () => {
        let prevTopic = {
            topic_id: 12,
            thread_id: 1,
            author_id: 2,
            title: "Hello",
            text: "world",
            date: "21.0.2003"
        };
        let newTopic = {
            author_id: 2,
            thread_id: 1,
            title: "TEST UPDATE",
            text: "dou dou dou",
        };
        let expected = { title: "TEST UPDATE", text: "dou dou dou" };
        expect(model["findUpdates"](newTopic, prevTopic)).toStrictEqual(expected);

        prevTopic = {
            topic_id: 12,
            author_id: 2,
            thread_id: 3,
            title: "HELLLO WORLD",
            text: "TEST METHOD",
            date: "21.0.2003",
        };
        newTopic = {
            author_id: 2,
            thread_id: 3,
            title: "HELLLO WORLD",
            text: "TEST METHOD",
        };
        let expectedWithoutEmail = {};
        expect(model["findUpdates"](newTopic, prevTopic)).toStrictEqual(expectedWithoutEmail);

        prevTopic = {
            topic_id: 12,
            author_id: 2,
            thread_id: 3,
            title: "HELLLO WORLD",
            text: "TEST METHOD",
            date: "21.0.2003",
        };
        newTopic = {
            author_id: 2,
            thread_id: 3,
            title: "NEW TITLE",
            text: "TEST METHOD",
        };
        let expectedCountry = { title: "NEW TITLE" };
        expect(model["findUpdates"](newTopic, prevTopic)).toStrictEqual(expectedCountry);
    });
});