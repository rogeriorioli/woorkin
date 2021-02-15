import { Request, Response } from 'express';
export default class ProfileController {
    index(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    indexByUser(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    create(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    update(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
}
