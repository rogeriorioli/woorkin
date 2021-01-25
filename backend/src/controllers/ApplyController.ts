import { Request, Response } from 'express'
import db from '../database/connection'
import { v4 } from 'uuid'


export default class ApplyController {

  public async create(req: Request, res: Response) {

    const token = req.headers.authorization
    const candidate_id = req.headers.userid
    const job_id = req.params.id

    if (!token) {
      return res.status(400).json({ err: 'Não Permitido ' })
    }

    const applyJob = await db('apply_job').insert({
      id: v4(),
      job_id,
      candidate_id
    })

    return res.json({ applyJob, message: 'Aplicado com sucesso! te desejamos boa sorte ' })
  }

  public async getUserApply(req: Request, res: Response) {
    const token = req.headers.authorization
    const { userid } = req.params

    if (!token) {
      return res.status(400).json({ err: 'Não Permitido ' })
    }

    const jobs = await db('apply_job')
      .where('candidate_id', userid)
      .select('*')
      .orderBy('updated_at', 'DESC')

    return res.json(jobs)
  }

  public async getUsersApply(req: Request, res: Response) {
    const token = req.headers.authorization
    const { userid } = req.headers

    if (!token) {
      return res.status(400).json({ err: 'Não Permitido ' })
    }

    const jobs = await db('apply_job')
      .where('candidate_id', userid)
      .select('*')
      .orderBy('updated_at', 'DESC')
    //@ts-ignore

    const { candidate_id } = jobs

    const image = await db('user_avatar')
      .where('user_id', candidate_id)
      .select('*')
      .orderBy('updated_at', 'DESC')


    const candidate_profile = await db('candidate_profile')
      .where('user_id', candidate_id)
      .select('*')
      .orderBy('created_at', 'desc')
      .first()


    return res.json({ jobs, candidate_profile, image })
  }


}


