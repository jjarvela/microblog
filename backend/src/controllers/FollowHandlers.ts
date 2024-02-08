import { Request, Response } from "express";
import * as queries from "../services/followingQueries";
import { Context } from "openapi-backend";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

export async function addFollowing(c: Context, _req: Request, res: Response) {
    const query = c.request.query;
    const params = c.request.params;
    
    if (query.followsUser !== undefined && query.followsGroup === undefined) {
        try {
            const result = await queries.insertFollowing({ user_id: params.userId as string, follows_user: query.followsUser as string});
            res.status(200).json({ status: 200, itemId: result.id });
        }
        catch (e) {
            console.log(e);
            res.status(500).json({ status: 500, err: [{ message: "Unidentified error" }] });
        }
    } else if (query.followsUser === undefined && query.followsGroup !== undefined) {
        const followsGroupId = Number(query.followsGroup);
        try {
            const result = await queries.insertFollowing({ user_id: params.userId as string, follows_group: followsGroupId });
            res.status(200).json({ status: 200, itemId: result.id });
        }
        catch (e) {
            console.log(e);
            res.status(500).json({ status: 500, err: [{ message: "Unidentified error" }] });
        }
    } else {
        res.status(404).json({ status: 404, err: [{ message: "Missing or too many parameters" }] });
    }
}

export async function getFollowings(c: Context, _req: Request, res: Response) {
    const userId = c.request.params.userId;

    try {
        const result = await queries.selectFollowingUsers({ user_id: userId as string});
        res.status(200).json(result);
    } catch (e) {
        console.log(e);
        res.status(500).json({ status: 500, err: [{ message: "Unidentified error" }] });
    }
} 

export async function getGroupFollowings(c: Context, _req: Request, res: Response) {
    const userId = c.request.params.userId;

    try {
        const result = await queries.selectFollowingGroups({ user_id: userId as string});
        res.status(200).json(result);
    } catch (e) {
        console.log(e);
        res.status(500).json({ status: 500, err: [{ message: "Unidentified error" }] });
    }
} 

export async function getFollowers(c: Context, _req: Request, res: Response) {
    const userId = c.request.params.userId;

    try {
        const result = await queries.selectFollowers({ user_id: userId as string});
        res.status(200).json(result);
    } catch (e) {
        console.log(e);
        res.status(500).json({ status: 500, err: [{ message: "Unidentified error" }] });
    }
} 

export async function deleteFollowing(c: Context, _req: Request, res: Response) {
    const followId = c.request.requestBody.id;
    
    try {
        const result = await queries.deleteFollowing({ id: followId as number });
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