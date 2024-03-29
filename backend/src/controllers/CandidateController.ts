import { hash } from 'bcryptjs';
import { Request, Response } from 'express'

import { v4 } from "uuid";

import db from '../database/connection'
import welcome from '../emailTemplates/welcome';


import Mail from '../services/sendemail'
interface LoginData {
    email: string,
    password: string,
    username: string
}

export default class CandidateController {


    async create(req: Request, res: Response) {
        const id = v4()
        const user_type: string = 'candidate'
        const {
            email,
            password,
            username
        }: LoginData = req.body
        const message = welcome(req.body.username)

        const hashedPassword = await hash(password, 8)

        const user = await db('candidate')
            .column('id')
            .where('email', email)
            .select('email')
            .first()


        if (!user) {
            await db('candidate').insert({
                id,
                email,
                password: hashedPassword,
                username,
                user_type,
            })

            Mail.to = email;
            Mail.subject = 'Bem Vindo(as) a Woorkin';
            Mail.message = message
            Mail.sendMail()

            return res.status(201).json({
                message: "user successfully create",
                id: id,
                user_type


            })
        }
        return res.status(400).json({ err: "user exist in our base" })
    }

    async delete(req: Request, res: Response) {
        const { id } = req.params;

        const candidate = await db('candidate')
            .where({ id }).delete()

        if (!candidate) {
            throw new Error("user not found");

        }


        return res.json({ message: `candidate :  ${id}  deleted susseful`, })
    }
}