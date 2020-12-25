import {Repository} from "../src/lib/Repository";
import {Pool} from "pg";
import * as redis from "redis-mock"

const repo = new Repository(redis.createClient(), new Pool());
describe("test get values and column string", () => {
    test("only strings", () => {
        let obj = { name: "Name", age: 12, password: "1234", id: "1234123" };
        let expected = ["name, age, password, id", "'Name', 12, '1234', 1234123"];
        expect(repo.getFieldValuesString(obj)).toBe(expected);
    })
});