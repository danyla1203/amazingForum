import {Pool} from "pg";
import {Redis} from "ioredis";

export class Repository {
    pg: Pool;
    redisConn: Redis;

    constructor(redisConn: Redis, pgConn) {
        this.redisConn = redisConn;
        this.pg = pgConn;
    }

    protected getFieldValuesString(obj: Object) {
        let fields = Object.keys(obj).join(", ");
        let values = "";
        for (let key in obj) {
            if (typeof obj[key] == "string") {
                values += `'${obj[key]}'`;
            } else {
                values += obj[key];
            }
        }
        return [fields, values];
    }

    //return string like "key1=val1, key2=val2, keyN=valN"
    protected getSetPair(obj: Object) {
        let string = "";
        for (let key in obj) {
            if (typeof obj[key] == "string") {
                string += `${key} = '${obj[key]}', `;
            } else {
                string += `${key} = ${obj[key]}, `;
            }
        }
        return string;
    }
}