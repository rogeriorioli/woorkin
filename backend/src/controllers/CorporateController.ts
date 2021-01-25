import { Request, Response } from 'express'


import { v4 } from "uuid";

import db from '../database/connection'

interface CorpData {
  name_company: string,
  description_company: string,
  site_company: string,
  logo_company: string,
  linked_in: string,
  adress_company: string,
}


export default class CorporateController {

  async index(req: Request, res: Response) {

    const token = req.headers.authorization

    if (!token) {
      return res.status(400).json({ err: 'Não Permitido ' })
    }

    const corpProfile = await db('corp_data')
      .select('*')
      .orderBy('created_at', 'desc')

    return res.json(corpProfile)
  }

  async indexByCorp(req: Request, res: Response) {

    const token = req.headers.authorization
    const { userid } = req.params

    if (!token) {
      return res.status(400).json({ err: 'Não Permitido ' })
    }

    const logo_url = await db('logo_corp')
      .where('user_id', userid)
      .select('logo_url')
      .first()

    const corpProfile = await db('corp_data')
      .where('user_id', userid)
      .select('*')
      .orderBy('created_at', 'desc')
      .first()

    return res.json([corpProfile, logo_url])
  }
  async create(req: Request, res: Response) {
    const token = req.headers.authorization
    const user_id = req.headers.userid
    const date = new Date()
    const {
      name_company,
      description_company,
      site_company,
      logo_company,
      linked_in,
      adress_company }: CorpData = req.body

    if (!token) {
      return res.status(400).json({ err: 'Não Permitido ' })
    }

    await db('recruiter')
      .where('id', user_id)
      .select('id')
      .select('first_session')
      .first()
      .update({
        'first_session': date
      })

    const [id] = await db('corp_data').insert({
      id: v4(),
      user_id,
      name_company,
      description_company,
      site_company,
      logo_company,
      linked_in,
      adress_company,
    })

    return res.json({
      message: 'dados inseridos com sucesso',
      data: req.body
    })
  }
}