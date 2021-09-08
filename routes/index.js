var express = require("express");
var router = express.Router();
const async = require("async");
require("dotenv").config();
//list data for send mail
const tasks = [
  "dinhvanluan0123@gmail.com",
  "duy12a4zzz@gmail.com",
  "quangduy8801@gmail.com",
  "hvtransco@gmail.com",
];
const { sendMail } = require("../models/sendmail.js");
/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index");
});

router.post("/send-email", (req, res) => {
  const queue = async.queue((task, complete) => {
    // console.log("sending mail to" + task);
    setTimeout(() => {
      const remaining = queue.length();
      complete(null, { task, remaining });
    }, 1500);
  }, 1);
  tasks.forEach((task) => {
    queue.push(task, (error, { task, remaining }) => {
      if (error) {
        console.log(`error send to  ${task}`);
      } else {
        sendMail(task, req.body.subject, req.body.body);
      }
    });
  });
  queue.drain(() => {
    res.render("success", { data: tasks });
  });
});

module.exports = router;
