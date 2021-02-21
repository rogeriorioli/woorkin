import { Request, Response } from 'express'
import db from '../database/connection'
import { v4 } from 'uuid'


export default class SkillController {

  async index(req: Request, res: Response) {

    const token = req.headers.authorization

    if (!token) {
      return res.status(400).json({ err: 'Não Permitido ' })
    }

    const skills = await db('skills')
      .select('*')
      .orderBy('created_at', 'desc')

    return res.json(skills)
  }

  public async create(req: Request, res: Response) {
    const token = req.headers.authorization
    const user_id = req.headers.userid
    const { skillname } = req.body

    if (!token) {
      return res.status(400).json({ err: 'Não Permitido ' })
    }

    const skill = await db('skills')
      .column('id')
      .where('skillname', skillname)
      .select('skillname')
      .first()


    if (!skill) {
      await db('skills').insert({
        id: v4(),
        user_id,
        skillname
      })

      return res.json({
        message: "Compentencia criada com sucesso",
        user_id: user_id,
        skill: skillname
      })

    }

    return res.status(400).json({ err: "Compontecencia Já criada" })


  }
}