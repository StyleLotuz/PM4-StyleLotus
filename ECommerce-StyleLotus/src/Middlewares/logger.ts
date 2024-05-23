import { Request, Response, NextFunction } from 'express';

export function logger(req: Request, res: Response, next: NextFunction) {
  console.log(
    `Se hizo una peticion de tipo ${req.method} a la ruta ${req.url}`,
  );
  next();
}
