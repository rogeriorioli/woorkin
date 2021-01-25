import { Request, Response } from 'express'

import { v4 } from "uuid";

import db from '../database/connection'


interface CandidateProfile {
  name: string,
  born_date: Date,
  phone: string,
  avatar: {},
  description: string,
  website?: string,
  linkedin?: string,
  github?: string,
}

export default class ProfileController {

  async index(req: Request, res: Response) {

    const token = req.headers.authorization


    if (!token) {
      return res.status(400).json({ err: 'Não Permitido ' })
    }

    const candidateProfile = await db('candidate_profile')
      .select('*')
      .orderBy('created_at', 'desc')

    return res.json(candidateProfile)
  }

  async indexByUser(req: Request, res: Response) {

    const token = req.headers.authorization
    const { id } = req.params

    if (!token) {
      return res.status(400).json({ err: 'Não Permitido ' })
    }


    const candidate_profile = await db('candidate_profile')
      .where('user_id', id)
      .select('*')
      .orderBy('created_at', 'desc')
      .first()

    return res.json([candidate_profile])
  }

  public async create(req: Request, res: Response) {
    const token = req.headers.authorization
    const user_id = req.headers.userid
    const date = new Date

    const candidate = await db('candidate_profile')
      .where('user_id', user_id)
      .select('user_id')
      .first()


    if (candidate) {
      return res.status(400).json({ err: 'profile já preenchido' })
    }

    const {
      name,
      born_date,
      phone,
      description,
      website,
      linkedin,
      github

    }: CandidateProfile = req.body

    if (!token) {
      return res.status(400).json({ err: 'Não Permitido ' })
    }

    await db('candidate')
      .where('id', user_id)
      .select('id')
      .select('first_session')
      .first()
      .update({
        'first_session': date
      })


    const [id] = await db('candidate_profile').insert({
      id: v4(),
      user_id,
      name,
      born_date,
      phone,
      description,
      website,
      linkedin,
      github,
    })

    return res.json({
      message: 'dados inseridos com sucesso',
      data: req.body,
      user_id: user_id,
    })
  }

  public async update(req: Request, res: Response) {
    const token = req.headers.authorization
    const id = req.headers.userid
    const {
      name,
      born_date,
      phone,
      description,
      website,
      linkedin,
      github,
    } = req.body

    if (!token) {
      return res.status(400).json({ err: 'Não Permitido ' })
    }
    const user = await db('candidate_profile')
      .where('user_id', id)
      .update({
        name,
        born_date,
        phone,
        description,
        website,
        linkedin,
        github,
      })


    return res.json({ message: 'Pefil editado com sucesso', })
  }
}