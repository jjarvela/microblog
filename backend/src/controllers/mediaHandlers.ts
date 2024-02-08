import { Request, Response } from "express";
import * as queries from "../services/mediaQueries";
import { Context } from "openapi-backend";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";



export async function getUserMedia(c: Context, _req: Request, res: Response) {
    const userId = c.request.params.userId;
    const query = c.request.query;

    if (query.postId !== undefined ) {
        const postId = Number(query.postId);
        try {
            const result = await queries.selectMediaByPost({ blogpost_id: postId as number});
            res.status(200).json(result);
        } catch (e) {
            console.log(e);
            res.status(500).json({ status: 500, err: [{ message: "Unidentified error" }] });
        }
    } else if (query.mediaId !== undefined ) {
        const mediaId = Number(query.mediaId);
        try {
            const result = await queries.selectOneMedia({ media_id: mediaId as number});
            res.status(200).json(result);
        } catch (e) {
            console.log(e);
            res.status(500).json({ status: 500, err: [{ message: "Unidentified error" }] });
        }
    } else {
        try {
            const result = await queries.selectMediaByUser({ user_id: userId as string});
            res.status(200).json(result);
        } catch (e) {
            console.log(e);
            res.status(500).json({ status: 500, err: [{ message: "Unidentified error" }] });
        }
    }
}



export async function delUserMedia(c: Context, _req: Request, res: Response) {
    const mediaId = Number(c.request.params.mediaId);
    
    try {
        const result = await queries.deleteMedia({ id: mediaId as number });
        res.status(200).json(result);
    } catch (e) {
        console.log(e)
        if (e instanceof PrismaClientKnownRequestError) {
            if (e.code === "P2015") {
                res.status(400).send("Record was not found.");
            }
        } else {
            console.log(e);
            res.status(500).json({ status: 500, err: [{ message: "Unidentified error" }] });
        }
    }
}