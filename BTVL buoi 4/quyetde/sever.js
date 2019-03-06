const express = require("express");
const path = require("path");
const server = express();
const bodyParser = require("body-parser");
const fs = require("fs");
const randomInt = require("random-int");
server.use(express.static("public")); //thư mục public người dùng xem free
server.use(bodyParser.urlencoded({ extended: false }));
server.use(bodyParser.json());

server.get("/", (req, res) => {
  res.status(200).sendFile(path.resolve(__dirname + "/public/homepage.html"));
});

server.get("/get-random-question", (req, res) => {
  const question = RandomQuestion();
  res.status(200).json(question);
});

function RandomQuestion() {
  const arraydata = JSON.parse(fs.readFileSync("data.json", "utf8"));
  const index = Math.floor(Math.random() * arraydata.length);
  return arraydata[index];
}
server.get("/get-vote", (req, res) => {
  console.log(req.query);
  const questionId = req.query.questionId;
  const vote = req.query.vote;
  let questions;

  fs.readFile("./data.json", (err, data) => {
    if (err) {
      res.status(500).send("Internet server error!");
    }

    questions = JSON.parse(data);
    if (vote == "yes") {
      questions[Number(questionId)].yes += 1;
    } else questions[Number(questionId)].no += 1;

    if (questions) {
      fs.writeFile("./data.json", JSON.stringify(questions), (err, data) => {
        if (err) {
          res.status(500).send("Internet server error!");
        }
        res.status(200).json(questions);
      });
    }
    res.status(200).json(questions[Number(questionId) - 1]);
  });
});

server.get("/get-question-by-id", (req, res) => {
  console.log(req.query);
  const questionId = req.query.questionId;
  fs.readFile("./data.json", (err, data) => {
    if (err) {
      res.status(500).send("err");
    }
    const questions = JSON.parse(data);
    let selecQuestion;
    for (let item of questions) {
      if (item.id === Number(questionId)) {
        selecQuestion = item;
        break;
      }
    }
    if (selecQuestion) {
      res.status(200).json(selecQuestion);
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

//Create question

server.get("/create-question", (req, res) => {
  res
    .status(200)
    .sendFile(path.resolve(__dirname + "/public/create-question.html"));
});

server.get("/get-create", (req, res) => {
  fs.readFile("./data.json", (err, data) => {
    if (err) {
      res.status(500).send("Internal sever error");
    }
    if (req.query.content) {
      const questions = JSON.parse(data);
      console.log(typeof questions);
      questions.push({
        id: questions.length,
        content: req.query.content,
        yes: 0,
        no: 0,
        createdAt: new Date().toLocaleString()
      });
      fs.writeFile("./data.json", JSON.stringify(questions), (err) => {
        if (err) {
          res.status(500).send("Internal sever error");
        }
        res.status(201).end("Success");
      });
    }
  });
});

//locall host

server.listen(3000, (err) => {
  if (err) throw err;
  console.log("sever listen on port 3000");
});
