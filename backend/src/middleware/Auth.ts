import { Request, Response } from 'express';
import jwt from 'jsonwebtoken'

import authconfig from '../config/auth'

module.exports = (req: Request, res: Response, next: any) => {
  const authKey = authconfig.jwt.secret
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
  jwt.verify(token, authKey, (err, decode) => {
    if (err) return res.status(401).send({ error: 'token inalid' })

    // @ts-ignore
    req.userId = decode.id
    return next()
  })
}