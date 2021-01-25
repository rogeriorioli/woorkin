import { Request, Response } from 'express'


import { v4 } from "uuid";

import db from '../database/connection'

interface ResumeData {
  title: string
  resume: string,
  skills: []
}

export default class ResumeController {

  async indexByUser(req: Request, res: Response) {

    const token = req.headers.authorization
    const { userid } = req.params

    if (!token) {
      return res.status(400).json({ err: 'Não Permitido ' })
    }

    const candidateResume = await db('candidate_resume')
      .where('user_id', userid)
      .select('*')
      .orderBy('created_at', 'desc')
      .first()

    return res.json(candidateResume)
  }


  async create(req: Request, res: Response) {
    const token = req.headers.authorization
    const user_id = req.headers.userid
    const { title, resume, skills }: ResumeData = req.body

    if (!token) {
      return res.status(400).json({ err: 'Não Permitido ' })
    }

    const [id] = await db('candidate_resume').insert({
      id: v4(),
      user_id,
      title,
      resume,
      skills
    })

    return res.json({
      message: 'dados inseridos com sucesso',
      data: req.body
    })
  }
}