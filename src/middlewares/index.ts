import jwt from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';

export function authenticateToken(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET!, (err) => {
    if (err) {
      console.log(err);
      return res.sendStatus(403);
    }

    next();
  });
}
