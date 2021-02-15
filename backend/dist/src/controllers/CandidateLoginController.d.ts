import { Response, Request } from "express";
export default class CandidateLoginController {
    authenticate(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
}
