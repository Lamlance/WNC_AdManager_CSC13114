import z, { ZodType } from "zod";
import { RequestHandler, Request, Response, NextFunction } from "express";

type ValiDatorMwBuilder<
  Q extends ZodType | undefined = undefined,
  B extends ZodType | undefined = undefined,
> = (
  query: Q,
  body: B,
  handler: RequestHandler<any, any, any, { query: Q; body: B }>
) => RequestHandler;

interface ValidatorRespond<
  Q extends ZodType | undefined = undefined,
  B extends ZodType | undefined = undefined,
> extends Response<
    any,
    {
      query: Q extends ZodType ? z.infer<Q> : undefined;
      body: B extends ZodType ? z.infer<B> : undefined;
    } & Record<string, any>
  > {}

function ValidatorMwBuilder<
  Q extends ZodType | undefined = undefined,
  B extends ZodType | undefined = undefined,
>(
  query: Q,
  body: B,
  handler: (
    req: Request,
    res: ValidatorRespond<Q, B>,
    next: NextFunction
  ) => void
): (req: Request, res: Response, next: NextFunction) => void {
  return function (req, res, next) {
    let q: any;
    let b: any;
    if (query) {
      const data = query.safeParse(req.query);
      if (data.success == false) {
        console.log(data.error);
        return res.status(400).json({ error: data.error });
      }
      q = data.data;
    }

    if (body) {
      const data = body.safeParse(req.body);
      if (data.success == false) {
        console.log(data.error, req.body);
        return res.status(400).json({ error: data.error });
      }
      b = data.data;
    }

    res.locals = { query: q, body: b };
    return handler(req, res as any, next);
  };
}

export { ValidatorMwBuilder };
