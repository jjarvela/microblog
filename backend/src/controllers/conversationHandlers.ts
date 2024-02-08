/* eslint-disable @typescript-eslint/space-before-function-paren */
/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable padded-blocks */
/* eslint-disable @typescript-eslint/indent */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Request, Response } from "express";
import * as queries from "../services/conversationQueries";
import { Context } from "openapi-backend";

export async function getUserConversations(
  c: Context,
  _req: Request,
  res: Response
) {
  const userId = c.request.params.userId;

  if (typeof userId !== "string") {
    res.status(401).json({ message: "Invalid parametres" });
    return;
  }

  try {
    const conversations = await queries.selectConversations({
      user_id: userId
    });
    res.status(200).json(conversations);
  } catch (e) {
    console.log(e);
    res
      .status(500)
      .json({ status: 500, err: [{ message: "Unidentified error" }] });
  }
}

export async function createConversation(
  c: Context,
  _req: Request,
  res: Response
) {
  const newConversation = c.request.body;
  const date = new Date(Date.now()).toISOString();
  console.log(newConversation);
  try {
    const responseConversation = await queries.createConversation({
      ...newConversation,
      timestamp: date
    });
    res.status(200).json(responseConversation);
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
  const conversationId = c.request.params.conversationId;

  if (typeof conversationId !== "string") {
    res.status(401).json({ message: "Invalid parametres" });
    return;
  }

  try {
    const conversation = await queries.selectConversation({
      id: parseInt(conversationId)
    });
    console.log(conversation);
    res.status(200).json(conversation);
  } catch (e) {
    console.log(e);
    res
      .status(500)
      .json({ status: 500, err: [{ message: "Unidentified error" }] });
  }
}

export async function getConversationMessages(
  c: Context,
  _req: Request,
  res: Response
) {
  const conversationId = c.request.params.conversationId;

  console.log("Get conversation messages");

  if (typeof conversationId !== "string") {
    res.status(401).json({ message: "Invalid parametres" });
    return;
  }

  try {
    const messages = await queries.selectMessages({
      conversation_id: parseInt(conversationId)
    });
    console.log("***********************MESSAGES**************************");
    console.log(messages);
    console.log("***********************MESSAGES**************************");
    res.status(200).json(messages);
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
  const conversationId = c.request.params.conversationId;

  if (typeof conversationId !== "string") {
    res.status(401).json({ message: "Invalid parametres" });
    return;
  }

  try {
    const messages = await queries.selectMessages({
      conversation_id: parseInt(conversationId)
    });
    messages.length > 0 &&
      messages.forEach(
        async (message) => await queries.deleteMessage({ id: message.id })
      );
    await queries.deleteConversation({ id: parseInt(conversationId) });
    res.status(200).json({ status: 200, itemId: conversationId });
  } catch (e) {
    console.log(e);
    res
      .status(500)
      .json({ status: 500, err: [{ message: "Unidentified error" }] });
  }
}

export async function postMessage(c: Context, _req: Request, res: Response) {
  const conversationId = c.request.params.conversationId;
  const newMessage = c.request.body;

  if (typeof conversationId !== "string") {
    res.status(401).json({ message: "Invalid parametres" });
    return;
  }

  try {
    const newEntry = await queries.createMessage({...newMessage, timestamp: new Date(Date.now()).toISOString()});
    res.status(201).json(newEntry);
  } catch (e){
    console.log(e);
    res
      .status(500)
      .json({ status: 500, err: [{ message: "Unidentified error" }] });
  }

}

export async function editMessage(c: Context, _req: Request, res: Response) {
  res.json({ status: 201 });
}

export async function deleteMessage(c: Context, _req: Request, res: Response) {
  res.json({ status: 201 });
}
