import { Request, Response } from 'express';
export default class CorporateController {
    index(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    indexByCorp(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    create(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
}
