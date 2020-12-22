import * as http from "http";
import {Request, Response, ExtendContext} from "./lib/ExtendContext";

export type handler = {
    method: string,
    path: string,
    handlerFunc: (req?: Request, res?: Response) => any | void
}

export class Bootstrap {
    controllers: any[];
    ExtendContext: ExtendContext = new ExtendContext();

    constructor(controllers: any[]) {
        this.controllers = controllers;
    }

    getAllHandlersFromControllers(): handler[] {
        let handlers = [];
        for (let i = 0; i < this.controllers.length; i++) {
            let metaKeys = Reflect.getMetadataKeys(this.controllers[i]);

            for (let k = 0; k < metaKeys.length; k++) {
                let handler: handler = Reflect.getMetadata(metaKeys[k], this.controllers[i]);
                handler.handlerFunc = handler.handlerFunc.bind(this.controllers[i]);
                handlers.push(handler);
            }
        }
        return handlers;
    }

    getHandler(url: string, method: string, handlers: handler[]): handler | undefined {
        let splitedUrl = url.substring(1).split("/");
        for (let i = 0; i < handlers.length; i++) {
            if (method != handlers[i].method) {
                continue;
            }
            let splitedHandlerPath = handlers[i].path.substring(1).split("/");
            //if pattern and url have different lengths
            if (splitedHandlerPath.length != splitedUrl.length) {
                continue;
            }
            for (let k = 0; k < splitedUrl.length + 1; k++) {
                if (k == splitedUrl.length) {
                    return handlers[i];
                }
                if (splitedHandlerPath[k][0] == ":") { continue }
                if (splitedHandlerPath[k] != splitedUrl[k]) {
                    break;
                }
            }
        }
    }

    async executeHandler(req: Request, res: Response, handler: handler) {
        try {
            let result: any = await handler.handlerFunc(req, res);
            let response = {
                statusCode: 200,
                payload: result
            };
            res.end(JSON.stringify(response));
        } catch (e) {
            res.statusCode = e.errorData.statusCode;
            res.end(JSON.stringify(e.errorData));
        }
    }

    start(port: number) {
        let handlers: handler[] = this.getAllHandlersFromControllers();
        const app = http.createServer();
        app.on("request", async (req: Request, res: Response) => {
            let handler: handler | undefined = this.getHandler(req.url, req.method, handlers);
            if (!handler) {
                res.statusCode = 404;
                res.end("<h1>Error 404!</h1>");
                return;
            }
            res.setHeader('Access-Control-Allow-Origin', '*');
            res.setHeader('Access-Control-Allow-Headers', 'origin, content-type, accept');
            await this.ExtendContext.extend(req, res, handler.path);
            await this.executeHandler(req, res, handler)
        });
        app.listen(port, () => {
            console.log(`Listening on ${port} port`);
        })
    }
}