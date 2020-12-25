import {Repository} from "../src/lib/Repository";
import {Pool} from "pg";
import * as redis from "redis-mock"

const repo = new Repository(redis.createClient(), new Pool());
describe("test get values and column string", () => {
    test("test get values and column string", () => {
        let obj = {
            name: "Name",
            age: 12,
            password: "1234",
            id: "1234123" };
        let expected = [
            "name, age, password, id",
            "'Name', 12, '1234', '1234123'"
        ];
        expect(repo.getFieldValuesString(obj)).toStrictEqual(expected);
    });
});

describe("test getSetPair", () => {
    test("test getSetPair", () => {
        let obj = {
            id: 123,
            name: "TestName",
            age: 13,
            password: "t123"
        };
        let expected = "id = 123, name = 'TestName', age = 13, password = 't123'";
        expect(repo.getSetPair(obj)).toStrictEqual(expected);
    });
});