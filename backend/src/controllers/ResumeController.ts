import { Request, Response } from 'express'


import { v4 } from "uuid";

import db from '../database/connection'

interface ResumeData {
  title: string
  resume: string,
  description: string
  skills: []
}

export default class ResumeController {

  async indexByUser(req: Request, res: Response) {

    const token = req.headers.authorization
    const { id } = req.params

    if (!token) {
      return res.status(400).json({ err: 'Não Permitido ' })
    }

    const candidateResume = await db('candidate_resume')
      .where('user_id', id)
      .select('*')
      .orderBy('created_at', 'desc')
      .first()

    return res.json(candidateResume)
  }


  async create(req: Request, res: Response) {
    const token = req.headers.authorization
    const user_id = req.headers.userid
    const { title, skills }: ResumeData = req.body


    if (!token) {
      return res.status(400).json({ err: 'Não Permitido ' })
    }


    const candidate = await db('candidate_profile')
      .where('user_id', user_id)
      .select('user_id', 'description')
      .first()



    if (!candidate.description) {
      return res.status(400).json({ err: ' complete seu perfil ' })
    }


    const resume = await db('candidate_resume')
      .where('user_id', user_id)
      .select('user_id')
      .first()


    if (resume) {
      return res.status(400).json({ err: 'profile já preenchido' })
    }

    const [id] = await db('candidate_resume').insert({
      id: v4(),
      user_id,
      title,
      resume: candidate.description,
      skills
    })

    return res.json({
      message: 'dados inseridos com sucesso',
      data: req.body
    })
  }
}