import { Request, Response } from 'express'


import { v4 } from "uuid";

import db from '../database/connection'
export default class ImageController {


  async getImage(req: Request, res: Response) {

    const token = req.headers.authorization
    const { userid } = req.params

    if (!token) {
      return res.status(400).json({ err: 'not permited ' })
    }

    const image = await db('user_avatar')
      .where('user_id', userid)
      .select('*')
      .orderBy('updated_at', 'DESC')

    return res.json(image)
  }



  async create(req: Request, res: Response) {
    const token = req.headers.authorization
    const user_id = req.headers.userid

    // @ts-ignore
    const { originalname: name, size, key, location: avatar_url = '' } = req.file


    if (!user_id) {
      return res.status(400).json({ err: 'not permited ' })
    }

    const user = await db('candidate')
      .column('id')
      .where('id', user_id)
      .select('id')
      .first()


    if (!token) {
      return res.status(400).json({ err: 'not permited ' })
    }

    const [userId] = await db('user_avatar').insert({
      id: v4(),
      user_id,
      avatar_url
    })

    return res.json({
      message: 'dados inseridos com sucesso',
      image: avatar_url,
      user: user.id
    })

  }
}