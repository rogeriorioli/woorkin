import { Response, Request } from "express"
import jwt from 'jsonwebtoken'
import db from '../database/connection'

const authConfig = require('../config/auth');
interface LoginData {
    username?: string
    email?: string,
    password: string,
}
export default class RecruiterLoginController {
    async authenticate(req: Request, res: Response) {
        const { email, password }: LoginData = req.body;

        const user = await db('recruiter')
            .where('email', email)
            .where('password', password)
            .select('email', 'password', 'user_type', 'id', 'first_session')
            .first()


        if (!user) {
            return res.status(400).json({ err: 'user or password wrong' })
        }

        if (user.first_session === null) {
            user.first_session = 'complete your profile'
        }

        user.password = undefined
        const token = jwt.sign({ email: user.email }, authConfig.secret, {
            expiresIn: 86400
        })
        return res.json({ permissions: { token: token, user: user.id, user_type: user.user_type, first_session: user.first_session } })
    }
}
