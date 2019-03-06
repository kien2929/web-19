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
  res
    .status(200)
    .sendFile(path.resolve(__dirname + "/public/homepage.html"));
});

server.get("get-radom-question",(req, res)=>{
  const question=RandomQuestion();
  res.status(200).json(question);
});

function RandomQuestion(){
  const arraydata = JSON.parse(fs.readFileSync("/data.json", "utf8"));
  const index = Math.floor(Math.random() * arraydata.length);
  return arraydata[index];
}
// server.get("/", (req, res) => {
//   fs.readFile("./data.json", (err, data) => {
//     if (err) res.status(500).send("err");
//     const question = JSON.parse(data);
//     const randomIndex = Math.floor(Math.random() * question.length);
//     const randomQuestion = question[randomIndex];

//     res.status(200).send(`
//     <!DOCTYPE html>
// <html lang="en">
// <head>
//     <meta charset="UTF-8">
//     <meta name="viewport" content="width=device-width, initial-scale=1.0">
//     <meta http-equiv="X-UA-Compatible" content="ie=edge">
//     <title>Buổi 4</title>
// </head>
// <body>
//     <h2>${randomQuestion.content}</h2>
//     <div>
//     <form name='yes' method='get' action='/vote/${randomQuestion.id}/yes'>
//     <input type='submit' value='yes'>
//     </input>
//     </form>
//     <form name='no' method='get' action='/vote/${randomQuestion.id}/no'>
//     <input type='submit' value='no'>

//     </input>
//     </form>
//     </div>
//     <div>
//     <button id='result'>Result</button>
//     <button id='other'>Other question</button>
//     </div>
//     <script src='./public/index.js'>
//     </script>
// </body>
// </html>
//     `);
//   });
// });


server.get("/vote/:questionId/:vote", async (req, res) => {
  const { questionId, vote } = req.params;

  console.log(questionId.vote);

  fs.readFile("./data.json", (err, data) => {
    if (err) {
      res.status(500).send("Internal sever error");
    }
    const questions = JSON.parse(data);
    for (let item of questions) {
      if (item.id === Number(questionId)) {
        vote === "yes" ? (item.yes += 1) : (item.no += 1);
        break;
      }
    }
    fs.writeFile("./data.json", JSON.stringify(questions), (err, data) => {
      if (err) {
        res.status(500).send("err");
      }
      res.status(200).send("update success");
    });
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
      if(item.id===Number(questionId)){
        selecQuestion=item;
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

server.post("/create-question", (req, res) => {
  fs.readFile("./data.json", (err, data) => {
    if (err) {
      res.status(500).send("Internal sever error");
    }
    const questions = JSON.parse(data);
    console.log(typeof questions);
    questions.push({
      id: questions.length,
      content: req.body.content,
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
  });
});

//locall host

server.listen(3000, (err) => {
  if (err) throw err;
  console.log("sever listen on port 3000");
});
