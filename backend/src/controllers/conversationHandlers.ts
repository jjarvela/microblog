/* eslint-disable @typescript-eslint/space-before-function-paren */
/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable padded-blocks */
/* eslint-disable @typescript-eslint/indent */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Request, Response } from "express";
import * as queries from "../services/conversationQueries";
import { Context } from "openapi-backend";

import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

export async function createConversation(
  c: Context,
  _req: Request,
  res: Response
) {
  try {
    res.status(200).json({ status: 200 });
  } catch (e) {
    console.log(e);
    res
      .status(500)
      .json({ status: 500, err: [{ message: "Unidentified error" }] });
  }
}

export async function getConversation(
  c: Context,
  _req: Request,
  res: Response
) {
  try {
    res.status(200).json({ status: 200 });
  } catch (e) {
    console.log(e);
    res
      .status(500)
      .json({ status: 500, err: [{ message: "Unidentified error" }] });
  }
}

export async function deleteConversation(
  c: Context,
  _req: Request,
  res: Response
) {
  try {
    res.status(200).json({ status: 200, itemId: "id" });
  } catch (e) {
    console.log(e);
    res
      .status(500)
      .json({ status: 500, err: [{ message: "Unidentified error" }] });
  }
}

export async function postMessage(c: Context, _req: Request, res: Response) {
  let dataError = 2;

  const dbDelete = async (item: number) => {
    try {
      await queries.deleteConversation({ id: item });

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
