import { Request, Response } from "express";
import * as queries from "../services/profileQueries";
import { Context } from "openapi-backend";

export async function getProfile(c: Context, _req: Request, res: Response) {
  const userId = c.request.params.userId;
  try {
    const result = await queries.getProfile({ uid: userId as string });
    res.status(200).json(result);
  } catch (e) {
    console.log(e);
    res
      .status(500)
      .json({ status: 500, err: [{ message: "Unidentified error" }] });
  }
}

export async function editProfile(c: Context, _req: Request, res: Response) {
  const userId = c.request.params.userId;
  const data = c.request.body;
  try {
    const result = await queries.editProfile({ uid: userId as string, data });
    res.status(200).json(result);
  } catch (e) {
    console.log(e);
    res
      .status(500)
      .json({ status: 500, err: [{ message: "Unidentified error" }] });
  }
}

export async function getProfileElements(
  c: Context,
  _req: Request,
  res: Response
) {
  const userId = c.request.params.userId;

  try {
    const result = await queries.getProfileElements({ uid: userId as string });
    res.status(200).json(result);
  } catch (e) {
    console.log(e);
    res
      .status(500)
      .json({ status: 500, err: [{ message: "Unidentified error" }] });
  }
}

export async function editProfileElements(
  c: Context,
  _req: Request,
  res: Response
) {
  const userId = c.request.params.userId;

  try {
    const result = await queries.updateProfileElements({
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
