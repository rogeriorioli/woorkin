import { Response, Request } from "express";
export default class RecruiterLoginController {
    authenticate(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
}
