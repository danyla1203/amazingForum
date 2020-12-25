import {Pool} from "pg";
import {Redis} from "ioredis";

export class Repository {
    pg: Pool;
    redisConn: Redis;

    constructor(redisConn: Redis, pgConn: Pool) {
        this.redisConn = redisConn;
        this.pg = pgConn;
    }

    public getFieldValuesString(obj: Object) {
        let fields = Object.keys(obj).join(", ");
        let values = "";
        let arrayedObject = Object.entries(obj);

        for (let i = 0; i < arrayedObject.length; i++) {
            if (i == arrayedObject.length - 1) {
                if (typeof arrayedObject[i][1] == "string") {
                    values += `'${arrayedObject[i][1]}'`;
                } else {
                    values += `${arrayedObject[i][1]}`;
                }
            } else {
                if (typeof arrayedObject[i][1] == "string") {
                    values += `'${arrayedObject[i][1]}', `;
                } else {
                    values += `${arrayedObject[i][1]}, `;
                }
            }
        }
        return [fields, values];
    }

    //return string like "key1=val1, key2=val2, keyN=valN"
    public getSetPair(obj: Object) {
        let arrayedObj = Object.entries(obj);
        let string = "";

        for (let i = 0; i < arrayedObj.length; i++) {
            if (i == arrayedObj.length - 1) {
                if (typeof arrayedObj[i][1] == "string") {
                    string += `${arrayedObj[i][0]} = '${arrayedObj[i][1]}'`;
                } else {
                    string += `${arrayedObj[i][0]} = ${arrayedObj[i][1]}`;
                }
            } else {
                if (typeof arrayedObj[i][1] == "string") {
                    string += `${arrayedObj[i][0]} = '${arrayedObj[i][1]}', `;
                } else {
                    string += `${arrayedObj[i][0]} = ${arrayedObj[i][1]}, `;
                }
            }
        }
        return string;
    }
}