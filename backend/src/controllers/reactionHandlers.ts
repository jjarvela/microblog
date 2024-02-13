/* eslint-disable @typescript-eslint/space-before-function-paren */
/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable padded-blocks */
/* eslint-disable @typescript-eslint/indent */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Request, Response } from "express";
import * as queries from "../services/reactionQueries";
import { Context } from "openapi-backend";

export const addReaction = async (c: Context, _req: Request, res: Response) => {
  const reaction = c.request.body;
  try {
    const result = await queries.insertReactions(reaction);
    res.status(201).json(result);
  } catch (e) {
    console.log((e as Error).message);
    res.status(500).send("Internal server error");
  }
};

export const deleteReaction = async (
  c: Context,
  _req: Request,
  res: Response
) => {
  const reactionId = c.request.params.reactionId.toString();

  try {
    const result = await queries.deleteReaction({
      reaction_id: parseInt(reactionId),
    });
    res.status(201).json(result);
  } catch (e) {
    console.log((e as Error).message);
    res.status(500).send("Internal server error");
  }
};
