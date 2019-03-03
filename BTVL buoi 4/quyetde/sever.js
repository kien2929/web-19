const express = require("express");
const path = require("path");
const server = express();
const bodyParser = require("body-parser");
const fs = require("fs");
const randomInt = require("random-int");
server.use(express.static("public")); //thư mục public người dùng xem free
server.use(bodyParser.urlencoded({ extended: false }));
server.use(bodyParser.json());

const readFileJson = () => {
  const data = JSON.parse(
    fs.readFileSync("./data.json", "utf8", (err, data) => {
      if (err) {
        res.status(500).send("error");
      }
    })
  );[]
  const index = randomInt(0, data.length - 1);
  return data[index];
};

server.get("/", (req, res) => {
  const question = readFileJson();
  const All = question.yes + question.no;
  const perYes = question.yes * 100 / All;
  const perNo = 100 - perYes;
  let home = fs.readFileSync("./public/homepage.html", "utf8");
  fs.writeFile(
    "./public/homepage.html",
    home.replace("%question", question.content),
    err => {
      if (err) {
        throw err;
      }
      console.log("no err");
    }
  );
  res.status(200).send(home);
});

server.post("/", (req, res) => {
  const data = JSON.parse(
    fs.readFileSync("./data.json", "utf8", (err, data) => {
      if (err) {
        res.status(500).send("error"); //luon luon check
      }
    })
  );
  const home = fs.readFileSync("./public/homepage.html", "utf8");
  for (const obj in data) {
    const bool = home.indexOf(data[obj].content);
    console.log(req.body.yesno);
    if (bool != -1) {
      if (req.body.yesno == "yes") {
        data[obj].yes ++;
      } else {
        data[obj].no ++;
      }
      fs.writeFile(
        "./public/homepage.html",
        home.replace(data[obj].content, '%question'),
        err => {
          if (err) {
            throw err;
          }
        }
      );
    }
    fs.writeFile("./data.json", JSON.stringify(data), err => {
      if (err) {
        res.status(500).send("error"); //luon luon check
      }
    });
  }
  res.status(200).send("ok!");
});

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

server.listen(3000, (err) => {
  if (err) throw err;
  console.log("sever listen on port 3000");
});
