import { Request, Response } from "express";
import * as queries from "../services/portfolioQueries";
import { Context } from "openapi-backend";

export async function getPortfolio(c: Context, _req: Request, res: Response) {
  const userId = c.request.params.userId;

  try {
    const result = await queries.getPortfolio({
      uid: userId as string,
    });
    res.status(200).json(result);
  } catch (e) {
    console.log(e);
    res
      .status(500)
      .json({ status: 500, err: [{ message: "Unidentified error" }] });
  }
}

export async function editPortfolio(c: Context, req: Request, res: Response) {
  const userId = c.request.params.userId;

  try {
    const result = await queries.updatePortfolio({
      uid: userId as string,
      elements: c.request.body,
    });
    res.status(200).send();
  } catch (e) {
    console.log(e);
    res
      .status(500)
      .json({ status: 500, err: [{ message: "Unidentified error" }] });
  }
}
