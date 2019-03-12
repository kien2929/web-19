const express = require("express");
const path = require("path");
const server = express();
const bodyParser = require("body-parser");
const fs = require("fs");
const randomInt = require("random-int");
const mongoose = require("mongoose");
const questionModel = require("./model"); // Model trong MongoDB

mongoose.connect("mongodb://localhost:27017/quyetde", (error) => {
  if (error) {
    throw error;
  }
  console.log("connected success to MonGoDB");
  server.use(express.static("public")); //thư mục public người dùng xem free
  server.use(bodyParser.urlencoded({ extended: false }));
  server.use(bodyParser.json());

  server.get("/", (req, res) => {
    res.status(200).sendFile(path.resolve(__dirname + "/public/homepage.html"));
  });

  // Tạo câu hỏi
  server.get("/create-question", (req, res) => {
    res
      .status(200)
      .sendFile(path.resolve(__dirname + "/public/create-question.html"));
  });
  server.post("/create-question", async (req, res) => {
    const newQuestion = {
      content: req.body.content
    };
    const result = await questionModel.create(newQuestion);
    console.log(result);
    res.status(201).json({
      id: result._id
    });
  });

  server.get('/get-random-question',async (req, res) => {
    try{
      const randomQuestion = await questionModel.aggregate([
        {
          $sample : {
            size : 1
          }
        }
      ]);
      res.status(200).json(randomQuestion[0]);
    } catch(error){
      res.status(500).end(error.message);
    }
  });

  server.get("/get-vote", (req, res) => {
    console.log(req.query);
    const questionId = req.query.questionId;
    const vote = req.query.vote;
    questionModel.findById(questionId, (err, result) => {
      if (err) {
        res.status(500).send("Internet server error!");
      } else {
        if (vote == "yes") {
          questionModel.findByIdAndUpdate(questionId, { yes: result.yes+1 },(err,newupdate)=>{
            if(err) throw err;
            res.status(200).json(newupdate);
          })
        }else{
          questionModel.findByIdAndUpdate(questionId, { no: result.no+1 },(err,newupdate)=>{
            if(err) throw err;
            res.status(200).json(newupdate);
          })
        }
       
      }
    });
  });

  server.get("/get-question-by-id", (req, res) => {
    console.log(req.query);
    const questionId = req.query.questionId;
    questionModel.findById(questionId, (err, result)=> {
      if (err) {
        res.status(500).send("err");
      }
      let selecQuestion=0;
        if (result._id == questionId) {
          selecQuestion = 1;
        }
      if (selecQuestion) {
        res.status(200).json(result);
      } else {
        res.status(200).json({ message: "question not found" });
      }
    });
  });

  server.get("/result/:questionId", (req, res) => {
    res
      .status(200)
      .sendFile(path.resolve(__dirname + "/public/vote-result.html"));
  });

  server.listen(3000, (err) => {
    if (err) throw err;
    console.log("sever listen on port 3000");
  });
});
