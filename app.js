const express = require("express");
const app = express();
require("express-ws")(app);
const port = 3423;
// const {uuid} = require('uuid')

let bankAmount = 20;
let connections = [];

app.use(express.static(__dirname + "/public"));
app.ws("/", (ws, req) => {
  ws.id = Math.random() + "-" + Math.random() + "-" + new Date().getTime;
  console.log(ws.id);
  connections.push(ws);
  ws.on("message", (msg) => {
    let msgObj;
    try {
      msgObj = JSON.parse(msg);
    } catch (err) {
      return ws.send("You have requested something incorrectly!");
    }
    console.log(JSON.parse(msg));

    if (msgObj.type === "deposit-amount") {
      let addAmount = parseInt(msgObj.payload);
      if (addAmount < Infinity) {
        bankAmount += addAmount;
      }
      return connections.forEach((_ws) => _ws.send(bankAmount));
    }
    if (msgObj.type === "request-amount") return ws.send(bankAmount);

    ws.send("Message Received");
  });
  ws.on("close", () => {
    console.log(ws.id);
    connections = connections.filter((con) => con.id !== ws.id);
  });
});

app.listen(port, () => console.log(`http://localhost:${port}`));
