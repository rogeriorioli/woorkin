import { Request, Response } from 'express'


import { v4 } from "uuid";

import db from '../database/connection'
export default class ResumeFileController {


  async getImage(req: Request, res: Response) {

    const token = req.headers.authorization
    const { userid } = req.params

    if (!token) {
      return res.status(400).json({ err: 'Não Permitido ' })
    }

    const resume = await db('user_resume_file')
      .where('user_id', userid)
      .select('*')
      .orderBy('updated_at', 'DESC')

    return res.json(resume)
  }



  async create(req: Request, res: Response) {
    const token = req.headers.authorization
    const user_id = req.headers.userid

    // @ts-ignore
    const { originalname: name, size, key, location: file_url = '' } = req.file

    console.log(req.file)

    if (req.file.mimetype !== 'application/pdf') {
      return res.status(400).json({ err: 'Não Permitido, Obrigátorio uso de arquivo PDF ' })
    }


    if (!user_id) {
      return res.status(400).json({ err: 'Não Permitido ' })
    }

    const user = await db('candidate')
      .column('id')
      .where('id', user_id)
      .select('id')
      .first()


    if (!token) {
      return res.status(400).json({ err: 'Não Permitido ' })
    }

    const [userId] = await db('user_resume_file').insert({
      id: v4(),
      user_id,
      file_url
    })

    return res.json({
      message: 'dados inseridos com sucesso',
      image: file_url,
      user: user.id
    })

  }
}