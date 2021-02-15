import { Request, Response } from 'express';
export default class RegisterController {
    index(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
}
