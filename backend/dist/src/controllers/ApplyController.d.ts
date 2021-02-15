import { Request, Response } from 'express';
export default class ApplyController {
    create(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    getUserApply(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    getUsersApply(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
}
