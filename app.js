const express = require("express");
const app = express();

const port = 3000;
const Router = require("./routes");

const connect = require("./schemas");
connect();
app.use(express.json());

app.use("/", Router);

app.get("/", (req, res) => {
  console.log(req.body);
  res.send("실행");
});

app.listen(port, () => {
  console.log(port, "server open");
});
