const express = require('express');
const PostModel=require('./models')

const postRouter = express();

postRouter.post('/',async(req,res)=>{
    try {
        const postInfo=req.body;
        const newPost= await PostModel.create(postInfo);
        res.status(201).json(newPost);
    } catch (error) {
        res.status(500).end(error.message);
    }
  
});
postRouter.get('/:postId',async(req,res)=>{
    try {
        const {postId} =req.params;
        const totalRecord= await PostModel.find().countDocuments(); 
        const postInfo = await PostModel.findById(postId)
        //.populate('author','email firstName createAt')
        .populate({
            path:'author',
            select:'email firstName createAt'
        })
        .exec();
        res.status(200).json(postInfo);
    } catch (error) {
        res.status(500).end(error.message);
    }
})
postRouter.get('/',async(req,res)=>{
    try {
        const {pageNumber,pageSize}=req.query;
        const data =await PostModel.find()
        .skip(Number(pageSize*(pageNumber-1)))
        .limit(Number(pageSize))
        .exec();

        res.status(200).json(data);
    } catch (error) {
        res.status(500).end(error.message);
    }
})

module.exports= postRouter;