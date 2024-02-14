/* eslint-disable @typescript-eslint/space-before-function-paren */
/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable padded-blocks */
/* eslint-disable @typescript-eslint/indent */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Request, Response } from "express";
import * as queries from "../services/reactionQueries";
import { Context } from "openapi-backend";
import { reactions } from "@prisma/client";

export const getPostReactions = async (
  c: Context,
  _req: Request,
  res: Response
) => {
  const postId = c.request.params.postId;
  try {
    if (c.request.query.type && c.request.query.type) {
      const type: string[] = [];
      if (typeof c.request.query.type === "string")
        type.push(c.request.query.type);
      else if (c.request.query.type instanceof Array)
        type.concat(c.request.query.type);
      else throw new Error("Query parameter is invalid");

      const results = await queries.selectReactions(
        { blogpost_id: postId },
        type
      );
      res.status(200).json(results);
    } else {
      const results = await queries.selectReactions({ blogpost_id: postId });
      res.status(200).json(results);
    }
  } catch (e) {
    console.log((e as Error).message);
    res.status(500).send("Internal server error");
  }
};

export const addReaction = async (c: Context, _req: Request, res: Response) => {
  //the post or media Id should already be present in the request body
  const reaction = c.request.body;
  try {
    const result = await queries.insertReaction(reaction);
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
      reaction_id: parseInt(reactionId)
    });
    res.status(201).json(result);
  } catch (e) {
    console.log((e as Error).message);
    res.status(500).send("Internal server error");
  }
};

export const getUserNotifications = async (
  c: Context,
  _req: Request,
  res: Response
) => {
  const userId = c.request.params.userId.toString();
  const unread = c.request.query.unread;
  if (unread === "true") {
    try {
      if (c.request.query.type && c.request.query.type) {
        const type: string[] = [];
        if (typeof c.request.query.type === "string")
          type.push(c.request.query.type);
        else if (c.request.query.type instanceof Array)
          type.concat(c.request.query.type);
        else throw new Error("Query parameter is invalid");

        const results = await queries.selectUnread({
          user_id: userId,
          type: type
        });
        res.status(200).json(results);
      } else {
        const results = await queries.selectUnread({ user_id: userId });
        res.status(200).json(results);
      }
    } catch (e) {
      console.log((e as Error).message);
      res.status(500).send("Internal server error");
    }
  } else {
    try {
      if (c.request.query.type && c.request.query.type) {
        const type: string[] = [];
        if (typeof c.request.query.type === "string")
          type.push(c.request.query.type);
        else if (c.request.query.type instanceof Array)
          type.concat(c.request.query.type);
        else throw new Error("Query parameter is invalid");

        const results = await queries.selectReactions(
          { recipient_uid: userId },
          type
        );
        res.status(200).json(results);
      } else {
        const results = await queries.selectReactions({
          recipient_uid: userId
        });
        res.status(200).json(results);
      }
    } catch (e) {
      console.log((e as Error).message);
      res.status(500).send("Internal server error");
    }
  }
};

export const updateReadStatus = async (
  c: Context,
  _req: Request,
  res: Response
) => {
  const userId = c.request.params.userId.toString();
  const reactions = c.request.params.reactionId;
  const status = c.request.query.readStatus;

  const reactionArray: number[] = [];

  if (typeof reactions === "string") reactionArray.push(parseInt(reactions));
  else reactions.forEach((reaction) => reactionArray.push(parseInt(reaction)));

  try {
    if (status === "true") {
      //mark selected as read
      const updated = await queries.updateReadStatus(
        reactionArray,
        userId,
        true
      );
      res.status(200).json(updated);
    } else if (status === "false") {
      //mark selected as unread
      const updated = await queries.updateReadStatus(
        reactionArray,
        userId,
        false
      );
      res.status(200).json(updated);
    } else throw new Error("Invalid query");
  } catch (e) {
    console.log((e as Error).message);
    res.status(500).send("Internal server error");
  }
};
