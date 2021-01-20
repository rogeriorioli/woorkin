import { Request, Response } from 'express'

import db from '../database/connection'


export default class RegisterController {

  async index(req: Request, res: Response) {

    const recruites = await db('recruiter').count()
    const candidates = await db('candidate').count()
    const jobOffers = await db('job_offer').count()


    return res.json({
      recruites,
      candidates,
      jobOffers

    })

    // const jobs = await db('job_offer')
    //   .select('*')
    //   .orderBy('id', 'desc')

    // return res.json(jobs)
  }
}