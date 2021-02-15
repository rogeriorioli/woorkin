import { Request, Response } from 'express';
export default class JobController {
    index(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    indexByCorp(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    create(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    delete(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
}
