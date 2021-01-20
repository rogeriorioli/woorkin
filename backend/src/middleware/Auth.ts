import { Request, Response } from 'express';
import jwt from 'jsonwebtoken'

const authConfig = require('../config/auth')

module.exports = (req: Request, res: Response, next: any) => {
  const authKey = authConfig.secretKey
  const autHeader = req.headers.authorization;
  if (!autHeader)
    return res.status(401).send({ error: 'Unauthorized' });

  const parts = autHeader.split(' ');

  // @ts-ignore
  if (!parts.length === 2)
    return res.status(401).send({ error: 'token error' })

  const [scheme, token] = parts

  if (!/^Bearer$/i.test(scheme))
    return res.status(401).send({ error: 'token malformated' })

  // @ts-ignore
  jwt.verify(token, authConfig.secret, (err, decode) => {
    if (err) return res.status(401).send({ error: 'token inalid' })

    // @ts-ignore
    req.userId = decode.id
    return next()
  })
}