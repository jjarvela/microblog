/* eslint-disable @typescript-eslint/space-before-function-paren */
/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable padded-blocks */
/* eslint-disable @typescript-eslint/indent */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Request, Response } from "express";
import * as queries from "../services/reactionQueries";
import * as postQueries from "../services/blogQueries";
import { Context } from "openapi-backend";

export const getPostReactions = async (
  c: Context,
  _req: Request,
  res: Response
) => {
  const postId = c.request.params.postId.toString();
  try {
    const results = await queries.selectReactions({
      blogpost_id: parseInt(postId)
    });
    res.status(200).json(results);
  } catch (e) {
    console.log((e as Error).message);
    res.status(500).send("Internal server error");
  }
};

type BlogPostFromServer = {
  id: number;
  original_post_id?: number;
  original_poster_id: string;
  user_id: string;
  blog_text: string;
  timestamp: Date;
  original_created: Date;
  reposter_id?: string;
  commenter_id?: string;
  item_properties: { blogpost_id: number; context_id: number; value: string }[];
};

export const addReaction = async (c: Context, _req: Request, res: Response) => {
  //the post or media Id should already be present in the request body
  const reaction = c.request.body;
  try {
    const result = await queries.insertReaction(reaction);
    if (!result) throw new Error("Could not add reaction");
    if (reaction.type === "repost" && result.blogpost_id) {
      const post = await postQueries.selectOnePost({
        blog_post_id: result.blogpost_id
      });
      if (!post) throw new Error("No post data");
      const repost = await postQueries.insertPost({
        user_uuid: result.sender_userid,
        original_post_id:
          (post as BlogPostFromServer).original_post_id ||
          (post as BlogPostFromServer).id,
        original_poster_id: (post as BlogPostFromServer).original_poster_id,
        text: (post as BlogPostFromServer).blog_text,
        timestamp: new Date(),
        original_created: (post as BlogPostFromServer).original_created,
        hashtags: (post as BlogPostFromServer).item_properties.map(
          (item) => item.value
        ),
        reposter_id: result.sender_userid
      });
      console.log(repost);
    }
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
  const blogpost_id = c.request.params.postId.toString();
  const user_id = c.request.query.userId.toString();
  const type = c.request.query.type.toString();
  try {
    const result = await queries.deleteReaction({
      blogpost_id: parseInt(blogpost_id),
      sender_userid: user_id,
      type
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
  const readStatus = c.request.query.readStatus;
  if (readStatus === "false") {
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
          { recipient_userid: userId },
          type
        );
        res.status(200).json(results);
      } else {
        const results = await queries.selectReactions({
          recipient_userid: userId
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
  const reactions = c.request.query.reactionId;
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
