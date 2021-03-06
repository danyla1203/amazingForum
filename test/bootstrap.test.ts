import {Bootstrap, handler} from "../src/bootstrap";
import {Request} from "../src/lib/ExtendContext";
import {RequestMock} from "./RequestMock";

const bootstrapTest = new Bootstrap([]);
describe("testing get handler func", () => {
    let handlerFunc = jest.fn();
    let handlers: handler[] = [
        {
            method: "GET",
            path: "/articles/:user_id",
            handlerFunc: handlerFunc
        },
        {
            method: "GET",
            path: "/articles",
            handlerFunc: handlerFunc
        },
        {
            method: "GET",
            path: "/",
            handlerFunc: handlerFunc
        },
        {
            method: "GET",
            path: "/test/:id/:user_id",
            handlerFunc: handlerFunc
        },
        {
            method: "POST",
            path: "/article/:path",
            handlerFunc: handlerFunc
        }
    ];
    test("test simple rout", () => {
        expect(bootstrapTest.getHandler("/", "GET", handlers)).toBe(handlers[2]);
        expect(bootstrapTest.getHandler("/articles", "GET", handlers)).toBe(handlers[1]);
    });
    test("test routs with pattern", () => {
        expect(bootstrapTest.getHandler("/article/12", "POST", handlers)).toBe(handlers[4]);
        expect(bootstrapTest.getHandler("/test/12/23", "GET", handlers)).toBe(handlers[3]);
        expect(bootstrapTest.getHandler("/articles/1", "GET", handlers)).toBe(handlers[0]);
    });
});

describe("testing set params func", () => {
    let request: Request = new RequestMock();
    test("test without pattern", () => {
        request.url = "/";
        request.method = "GET";
        bootstrapTest.ExtendContext["setParamsFromUri"](request.url, "/", request);
        expect(request.params).toStrictEqual(new Map());

        request.method = "POST";
        bootstrapTest.ExtendContext["setParamsFromUri"](request.url, "/", request);
        expect(request.params).toStrictEqual(new Map());
    });
    test("test with pattern", () => {
        request.url = "/articles/12";
        request.method = "GET";
        bootstrapTest.ExtendContext["setParamsFromUri"](request.url, "/articles/:article_id", request);
        expect(request.params).toStrictEqual(new Map([["article_id", "12"]]));

        request.url = "/test/1/2";
        bootstrapTest.ExtendContext["setParamsFromUri"](request.url, "/test/:var1/:var2", request);
        expect(request.params).toStrictEqual(new Map([["var1", "1"], ["var2", "2"]]));
    })
});
