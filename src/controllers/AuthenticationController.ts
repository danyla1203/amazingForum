import {AuthenticationModel, UserData} from "../models/AuthenticationModel";
import {get, post} from "../lib/httpMethodDecorators";
import {Request, Response} from "../lib/ExtendContext";

export class AuthenticationController {
    authModel: AuthenticationModel;
    constructor(model: AuthenticationModel) {
        this.authModel = model;
    }

    @post("/login")
    async login(req: Request, res: Response) {
        let name = req.body.get("name");
        let password = req.body.get("password");

        let user: UserData = await this.authModel.verifyCredential(name, password);
        let session_id: string = await this.authModel.createSession(user);

        res.cookie("s_id", session_id);
        delete user.password;
        return user;
    }

    @get("/logout")
    async logout(req: Request, res: Response) {
        this.authModel.logout(req.cookies.get("s_id"));
    }
}