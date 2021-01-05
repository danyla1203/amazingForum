import {PostBody} from "./PostBody";
import {handler} from "../bootstrap";
import * as http from "http";

type Params = {
    httpOnly?: boolean
    secure?: boolean
}

export interface Request extends http.IncomingMessage {
    url: string
    method: string
    params: Map<string, any>,
    body: Map<string, any>,
    cookies: Map<string, any>
}
export interface Response extends http.ServerResponse{
    cookie: (name: string, value: any, params?: Params) => void
}

export class ExtendContext {
    PostBody: PostBody = new PostBody();

    private setParamsFromUri(url: string, pattern: string, req: Request) {
        let splitedUrl = url.substring(1).split("/");
        let splitedPattern = pattern.substring(1).split("/");
        req.params = new Map();

        for (let i = 0; i < splitedPattern.length; i++) {
            if (splitedPattern[i][0] == ":") {
                let paramName = splitedPattern[i].substring(1);
                let value = splitedUrl[i].substring(0);
                req.params.set(paramName, value);
            }
        }
    }

    private parseCookie(req: Request) {
        const cookieString = req.headers["cookie"];
        let parsedCookies = new Map();
        if (cookieString) {
            let splitedCookieString = cookieString.split(";");
            for (let i = 0; i < splitedCookieString.length; i++) {
                let [cookieName, value] = splitedCookieString[i].split("=");
                parsedCookies.set(`${cookieName}`.trim(), value);
            }
        }
        req.cookies = parsedCookies;
    }

    private setCookies(res: Response) {
        res.cookie = function (name: string, value: any, params?: Params) {
            let cookieString = `${name}=${value}; Path=/; `;
            if (params) {
                params.httpOnly ? cookieString += "HttpOnly": "";
                params.secure ? cookieString += "; Secure": "";
            }
            this.setHeader("Set-Cookie", [cookieString]);
        }
    }

    public async extend(req: Request, res: Response, pattern: string) {
        await this.setParamsFromUri(req.url, pattern, req);
        await this.parseCookie(req);
        await this.setCookies(res);
        await this.PostBody.handle(req);
    }
}