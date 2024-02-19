/* eslint-disable @typescript-eslint/space-before-function-paren */
/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable padded-blocks */
/* eslint-disable @typescript-eslint/indent */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Request, Response } from "express";
import * as queries from "../services/blogQueries";
import { Context } from "openapi-backend";
import type { BlogPost } from "./types";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

export async function getAllPosts(c: Context, _req: Request, res: Response) {
  const hashtags = c.request.query.hashtags || undefined;
  const usernames = c.request.query.usernames || undefined;
  const keyword = c.request.query.keyword || undefined;
  const startDate = c.request.query.startDate || undefined;
  const endDate = c.request.query.endDate || undefined;

  console.log(hashtags);

  if (!hashtags && !usernames && !keyword && !startDate && !endDate) {
    try {
      const posts = await queries.queryPosts();

      if (!posts) return res.status(404).send([]);
      else res.status(200).send(posts);
    } catch (e) {
      console.log((e as Error).message);
      return res.status(500).send("Internal server error");
    }
  }

  try {
    const posts = await queries.queryPosts({
      hashtags,
      usernames,
      keyword: keyword ? keyword.toString() : undefined,
      startDate: startDate ? startDate.toString() : undefined,
      endDate: endDate ? endDate.toString() : undefined
    });

    if (!posts) return res.status(200).send([]);
    else res.status(200).send(posts);
  } catch (e) {
    console.log((e as Error).message);
    return res.status(500).send("Internal server error");
  }
}

export async function addBlogPost(c: Context, _req: Request, res: Response) {
  const params = c.request.params;
  const blogObj = c.request.requestBody;
  const post = {
    user_uuid: params.userId as string,
    original_poster_id: params.userId as string,
    text: blogObj.text as string,
    timestamp: new Date(),
    hashtags: blogObj.hashtags as string[]
  };

  try {
    const result = await queries.insertPost(post);
    return res.status(200).json({ status: 200, itemId: result.id });
  } catch (e) {
    console.log(e);
    console.log(post);
    return res
      .status(500)
      .json({ status: 500, err: [{ message: "Unidentified error" }] });
  }
}

export async function getBlogPost(c: Context, _req: Request, res: Response) {
  console.log("Get post");

  const query = c.request.query;
  const userId = c.request.params.userId;
  let startDate = new Date("2023-01-01"); // Set default date range start.
  let endDate = new Date(Date.now()); // Set default date range end.

  if (query.postId !== undefined) {
    const postId = Number(query.postId); // Convert params.id to a number
    try {
      const result = await queries.selectOnePost({ blog_post_id: postId });
      return res.status(200).json(result);
    } catch (e) {
      console.log(e);
      return res
        .status(500)
        .json({ status: 500, err: [{ message: "Unidentified error" }] });
    }
  } else {
    try {
      if (query.startDate !== undefined && query.endDate !== undefined) {
        startDate = new Date(query.startDate as string); // Convert startdate to a Date object
        endDate = new Date(query.endDate as string); // Convert enddate to a Date object
        console.log(
          `Start date: ${startDate.toDateString()} End date: ${endDate.toDateString()}`
        );
      }

      const result = await queries.selectPosts({
        user_uuid: userId as string,
        startdate: startDate,
        enddate: endDate
      });
      return res.status(200).json(result);
    } catch (e) {
      console.log(e);
      return res
        .status(500)
        .json({ status: 500, err: [{ message: "Unidentified error" }] });
    }
  }
}

export async function updateBlogPost(c: Context, _req: Request, res: Response) {
  const params = c.request.params;
  const blogObj: BlogPost = c.request.requestBody;
  const post = {
    user_uuid: params.userId as string,
    text: blogObj.text as string,
    timestamp: new Date(),
    hashtags: blogObj.hashtags as string[]
  };

  try {
    const postId = Number(params.postId); // Convert params.id to a number
    const result = await queries.updatePost({ id: postId, post: post });
    res.status(200).json({ status: 200, itemId: result.id });
  } catch (e) {
    console.log(e);
    res
      .status(500)
      .json({ status: 500, err: [{ message: "Unidentified error" }] });
  }
}

export async function deleteBlogPost(c: Context, _req: Request, res: Response) {
  let dataError = 2;

  const dbDelete = async (item: number) => {
    try {
      await queries.deletePost({ id: item });

      dataError = 0;
    } catch (e: unknown) {
      console.log(e);
      if (e instanceof PrismaClientKnownRequestError && e.code === "P2025") {
        dataError = 1;
      } else {
        dataError = 2;
      }
    }
  };

  const itemArray = c.request.requestBody.itemIds;

  if (!itemArray) return res.status(404).send([]);

  for (const item of itemArray) {
    console.log(item);
    if (!item) return res.status(404).send([]);
    await dbDelete(parseInt(item.toString()));
    const reposts = await queries.selectReposts({ original_post_id: item });
    if (reposts.length > 0) {
      reposts.forEach(async (post) => await dbDelete(post.id));
    }
  }

  if (dataError === 2) {
    res
      .status(500)
      .json({ status: 500, err: [{ message: "Unidentified error" }] });
  } else if (dataError === 1) {
    res
      .status(400)
      .json({ status: 400, err: [{ message: "Items not found." }] });
  } else {
    res.status(200).json({ status: 200, err: [{ message: "Items deleted." }] });
  }
}
