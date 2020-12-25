import {Request as CustomRequest} from "../src/lib/ExtendContext";
import { IncomingMessage } from "http";
import {Socket} from "net";

export class RequestMock extends IncomingMessage implements CustomRequest {
    url: string;
    method: string;
    params: Map<string, any>;
    body: Map<string, any>;
    cookies: Map<string, any>;

    constructor() {
        super(new Socket());
    }
}
