import {UserModel} from "../src/User/UserModel";
import {UserRepository} from "../src/User/UserRepository";
import * as redis from "redis-mock"
import {Pool} from "pg";
import {ComfortRedis} from "nice-redis";

const model = new UserModel(new UserRepository(new ComfortRedis(redis.createClient()), new Pool()));

describe("test methods", () => {
    test("test find updates", () => {
        let prevData = {
            id: 12,
            name: "John",
            email: "fuck.school@blya",
            country: "Ukraine"
        };
        let newData = {
            id: 12,
            name: "Joana",
            email: "fuck!.school@blya",
            country: "Ukraine",
        };
        let expected = { name: "Joana", email: "fuck!.school@blya" };
        expect(model["findUpdates"](newData, prevData)).toStrictEqual(expected);

        prevData = {
            id: 12,
            name: "John",
            email: "fuck.school@blya",
            country: "Ukraine",
        };
        newData = {
            id: 12,
            name: "Joana",
            email: "fuck.school@blya",
            country: "Ukraine",
        };
        let expectedWithoutEmail = { name: "Joana" };
        expect(model["findUpdates"](newData, prevData)).toStrictEqual(expectedWithoutEmail);

        prevData = {
            id: 12,
            name: "Joana",
            email: "fuck.school@blya",
            country: "Ukraine",
        };
        newData = {
            id: 12,
            name: "Joana",
            email: "fuck.school@blya",
            country: "USA",
        };
        let expectedCountry = { country: "USA" };
        expect(model["findUpdates"](newData, prevData)).toStrictEqual(expectedCountry);
    });

    test("no changes", () => {
        let prevData = {
            id: 12,
            name: "John",
            email: "fuck.school@blya",
        };
        let newData = {
            id: 12,
            name: "John",
            email: "fuck.school@blya",
        };
        let expected = {};
        expect(model["findUpdates"](newData, prevData)).toStrictEqual(expected);
    });

    test("test with empty columns", () => {
        let prevData = {
            id: 12,
            name: "John",
            email: "fuck.school@blya",
            country: "Ukraine"
        };
        let newData = {
            id: 12,
            name: "Joana",
            email: "fuck.school@blya",
            country: "",
        };
        let expected = { name: "Joana" };
        expect(model["findUpdates"](newData, prevData)).toStrictEqual(expected);

        prevData = {
            id: 12,
            name: "John",
            email: "fuck.school@blya",
            country: "Ukraine"
        };
        newData = {
            id: 12,
            name: "",
            email: "",
            country: "",
        };
        let expectedPrevData = {};
        expect(model["findUpdates"](newData, prevData)).toStrictEqual(expectedPrevData);
    })
});

describe("test verifyIncomingData", () => {
    test("test with miss necessary column data", () => {
        let withoutPassword = {
            nickname: "John",
            email: "dou@gmail.com",
        };
        expect(model["verifyIncomingData"](withoutPassword)).toBe(false);

        let withoutName = {
            email: "dou@gmail.com",
            password: "hello"
        };
        expect(model["verifyIncomingData"](withoutName)).toBe(false);

        let withoutEmail = {
            nickname: "John",
            password: "douuu12"
        };
        expect(model["verifyIncomingData"](withoutEmail)).toBe(false);

        let empty = {};
        expect(model["verifyIncomingData"](empty)).toBe(false);
    });
    test("test with bad value in column", () => {
        let badNickAndEmail = {
            nickname: "J",
            email: "d",
            password: "ture1234"
        };
        expect(model["verifyIncomingData"](badNickAndEmail)).toBe(false);

        let badPassword = {
            email: "dou@gmail.com",
            nickname: "correctName",
            password: "h",
        };
        expect(model["verifyIncomingData"](badPassword)).toBe(false);
    });

    test("test with correct data", () => {
        let correct1 = {
            nickname: "John",
            email: "fuck.school@blya",
            password: "Hello1234"
        };
        expect(model["verifyIncomingData"](correct1)).toBe(true);
    })
});