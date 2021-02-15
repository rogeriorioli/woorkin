import { Request, Response } from 'express';
export default class ImageController {
    getImage(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    create(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
}
