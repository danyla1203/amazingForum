import {PostBody} from "./PostBody";
import {handler} from "../bootstrap";
import * as http from "http";

export interface Request extends http.IncomingMessage {
    url: string;
    method: string
    params: any,
    body: Map<string, any>,
    cookies: Map<string, any>
}
export interface Response extends http.ServerResponse{}

export class ExtendContext {
    PostBody: PostBody = new PostBody();

    private setParamsFromUri(url: string, pattern: string, req: Request) {
        let splitedUrl = url.substring(1).split("/");
        let splitedPattern = pattern.substring(1).split("/");
        req.params = {};
        for (let i = 0; i < splitedPattern.length; i++) {
            if (splitedPattern[i][0] == ":") {
                let paramName = splitedPattern[i].substring(1);
                let value = splitedUrl[i].substring(0);
                req.params[paramName] = value;
            }
        }
    }

    private parseCookie(req: Request) {
        const cookieString = req.headers["cookie"];
        let parsedCookies = new Map();
        let splitedCookieString = cookieString.split(";");
        for (let i = 0; i < splitedCookieString.length; i++) {
            let [cookieName, value] = splitedCookieString[i].split("=");
            parsedCookies.set(cookieName, value);
        }
        req.cookies = parsedCookies;
    }

    public async extend(req: Request, res: Response, handler: handler) {
        await this.setParamsFromUri(req.url, handler.path, req);
        await this.PostBody.handle(req);
    }
}