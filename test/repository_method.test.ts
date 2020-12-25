import {Repository} from "../src/lib/Repository";
import {dbConnection, redisClient} from "../src";

const repo = new Repository(redisClient, dbConnection);
describe("test get values and column string", () => {
    test("only strings", () => {
        let obj = { name: "Name", age: 12, password: "1234", id: "1234123" };
        let expected = ["name, age, password, id", "'Name', 12, '1234', 1234123"];
        expect(repo.getFieldValuesString(obj)).toBe(expected);
    })
});