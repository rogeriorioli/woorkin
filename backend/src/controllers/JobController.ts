import { Request, Response } from 'express'


import { v4 } from "uuid";

import db from '../database/connection'

interface JobData {
  title: string
  job_description: string,
  number_offers: number
  locale: string
  type_contract: string
  tags: []
}


export default class JobController {

  async index(req: Request, res: Response) {

    const token = req.headers.authorization
    const user_id = req.headers.userid

    if (!token) {
      return res.status(400).json({ err: 'Não Permitido ' })
    }

    const session = await db('candidate_profile')
      .where('user_id', user_id)
      .select('user_id')
      .first()

    if (!session) {
      res.status(400).json({ message: 'complete seu perfil para visualizar as vagas ' })
    }

    const jobs = await db('job_offer')
      .select('*')
      .orderBy('id', 'desc')

    return res.json(jobs)
  }

  async indexByCorp(req: Request, res: Response) {

    const token = req.headers.authorization
    const { userid } = req.params

    if (!token) {
      return res.status(400).json({ err: 'Não Permitido ' })
    }



    const jobs = await db('job_offer')
      .where('user_id', userid)
      .select('*')
      .orderBy('created_at', 'desc')

    return res.json(jobs)
  }


  async create(req: Request, res: Response) {
    const token = req.headers.authorization
    const user_id = req.headers.userid
    const { title, job_description, number_offers, locale, type_contract, tags }: JobData = req.body

    if (!token) {
      return res.status(400).json({ err: 'Não Permitido ' })
    }

    const [id] = await db('job_offer').insert({
      id: v4(),
      user_id,
      title,
      job_description,
      number_offers,
      locale,
      type_contract,
      tags
    })

    return res.json({
      message: 'dados inseridos com sucesso',
      data: req.body
    })
  }
  async delete(req: Request, res: Response) {
    const { id } = req.params;
    const token = req.headers.authorization

    if (!token) {
      return res.status(400).json({ err: 'Não Permitido ' })
    }

    const job = await db('job_offer')
      .where({ id }).delete()

    if (!job) {
      return res.status(400).json({ message: "job not found" })
    }


    return res.json({ message: `vaga :  ${id}  deleted susseful`, })
  }
}