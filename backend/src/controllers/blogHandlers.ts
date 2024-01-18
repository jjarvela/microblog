
import { Request, Response, query} from "express";
import queries from "../services/prismaqueries";
import { Context } from "openapi-backend";
import type {
BlogPost,
BlogAddReqParams,
BlogUpdateParams
} from "./types"
import { forEach } from "lodash";

export async function addBlogPost(
    c: Context,
    _req: Request,
    res: Response
) {
   const params = c.request.params;
    const blogObj = c.request.requestBody;
    const post = {user_uuid: params.userId as string, text: blogObj.text as string, timestamp: new Date(), hashtags: blogObj.hashtags as string[]};
   
    try {
    const result = await queries.insertPost(post);
    res.status(200).json({status:200,itemId: result.id});     
}
    catch(e) {
        console.log(e);
        console.log(post);
        res.status(500).json({status:500,err:[{message: "Unidentified error"}]});
    }
       
}

export async function getBlogPost(
    c: Context,
    _req: Request,
    res: Response
) {
    const params = c.request.params;
    const query = c.request.query;
    const userId = c.request.params.user_id;
    const postId = Number(query.postId); // Convert params.id to a number
    if (postId !== undefined) {
    try {
        const result = await queries.selectOnePost({blog_post_id: postId,user_uuid: userId as string});
        res.status(200).json(result);
    } catch (e) {
        console.log(e);
        res.status(500).json({status:500,err:[{message: "Unidentified error"}]});
    }
    } else {

        try {
            const result = await queries.selectPostsByUser({user_uuid: userId as string});
            res.status(200).json(result);
        } catch (e) {
            console.log(e);
            res.status(500).json({status:500,err:[{message: "Unidentified error"}]});
        }
    
    }
}

export async function getBlogEntries(c: Context, _req: Request, res: Response) {
    const params = c.request.params;
    
    if (params.startdate !== undefined && params.enddate !== undefined) {
    
    const startdate = new Date(params.startdate[0]); // Convert startdate to a Date object
    const enddate = new Date(params.enddate[0]); // Convert enddate to a Date object
    try {
        const result = await queries.selectPostsbyDate({user_uuid: params.userId as string, startdate, enddate});
        res.status(200).json(result);
    } catch (e) {
        console.log(e);
        res.status(500).json({status:500,err:[{message: "Unidentified error"}]});
    }
    } else {
        try {
        const result = await queries.selectPostsByUser({user_uuid: params.userId as string});
        res.status(200).json(result);
        } catch(e) {
            console.log(e);
            res.status(400).json({status:500,err:[{message: "Unidentified error"}]});    
        }
    }
}

export async function updateBlogPost(
    c: Context,
    _req: Request,
    res: Response
){

//const params = c.request.query.up;
const blogObj:BlogPost = c.request.requestBody;
const params = c.request.params;


try {
    const postId = Number(params.postId); // Convert params.id to a number
    const result = await queries.updatePost({id: postId, blogtext: blogObj.text});
    res.status(200).json({status:200,itemId: result.id});
} catch (e) {
    console.log(e);
    res.status(500).json({status:500,err:[{message: "Unidentified error"}]});
}

}

export async function deleteBlogPost(
    c: Context,
    _req: Request,
    res: Response
) {
    
    c.request.requestBody.itemIds.forEach(async (item:number) => {            
    try {
        await queries.deletePost({id: item});
        res.status(200).json({status:200});
    } catch (e) {
        console.log(e);
        res.status(500).json({status:500,err:[{message: "Unidentified error"}]});
    }
    });  


}
