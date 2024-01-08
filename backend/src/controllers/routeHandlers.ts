
import { Request, Response} from "express";
import queries from "../services/prismaqueries";
import { Context } from "openapi-backend";
import type {
BlogEntry,
BlogAddReqParams
} from "./types"

export async function addBlogEntry(
    c: Context,
    _req: Request,
    res: Response
) {
   const params = c.request.params;
    const blogObj = c.request.requestBody;
    const post = {user_uuid: params.userId as string, text: blogObj.text as string, timestamp: new Date(), hashtags: blogObj.hashtags as string[]};
   
    try {
    const result = await queries.insertPost(post);
    res.json(result);     
}
    catch(e) {
        console.log(e);
        res.status(500).json({status:500,err:[{message: "Unidentified error"}]});
    }
       
}

export async function getBlogEntry(
    c: Context,
    _req: Request,
    res: Response
) {
    //const userId = c.request.params.
    console.log(c.request.params);
    console.log(c.request.query);
    res.status(200).json({response: "OK"});

}

export async function updateBlogEntry(
    c: Context,
    _req: Request,
    res: Response
) {
    //const userId = c.request.params.
    console.log(c.request.params);
    console.log(c.request.query);
    res.status(200).json({response: "OK"});

}

export async function deleteBlogEntry(
    c: Context,
    _req: Request,
    res: Response
) {
    //const userId = c.request.params.
    console.log(c.request.params);
    console.log(c.request.query);
    res.status(200).json({response: "OK"});

}



