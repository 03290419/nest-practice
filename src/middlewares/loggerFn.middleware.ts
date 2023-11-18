import { NextFunction } from 'express';

export function loggerFn(req: Request, res: Response, next: NextFunction) {
  console.log('Request By loggerFn');
  next();
}
