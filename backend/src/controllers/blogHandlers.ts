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

  for (const item of c.request.requestBody.itemIds) {
    await dbDelete(item as number);
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
