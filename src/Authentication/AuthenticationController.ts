import {AuthModelI} from "./AuthenticationModel";
import {get, post} from "../lib/httpMethodDecorators";
import {Request, Response} from "../lib/ExtendContext";
import {UserData} from "../User/types";

export class AuthenticationController {
    authModel: AuthModelI;
    constructor(model: AuthModelI) {
        this.authModel = model;
    }

    @post("/login")
    async login(req: Request, res: Response): Promise<UserData> {
        let name = req.body.get("name");
        let password = req.body.get("password");

        let user: UserData = await this.authModel.verifyCredential(name, password);
        let session_id: string = await this.authModel.createSession(user);

        res.cookie("s_id", session_id, {httpOnly: true});
        delete user.password;
        return user;
    }

    @get("/logout")
    async logout(req: Request): Promise<string> {
        await this.authModel.logout(req.cookies.get("s_id"));
        return "Session is deleted";
    }
}