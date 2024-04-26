const express = require("express");
const mongoose = require("mongoose");
const app = express();
const Fact = require("./model/fact.js");
const api = require("./Api/apiRoute.js");
const cors = require("cors");
require("dotenv").config();
app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:8000", "http://172.172.29.14:3000/"],
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    credentials: true,
  })
);

app.get("/gg", async (req, res) => {
  const result = await Fact.aggregate([{ $sample: { size: 1 } }]);
  res.json(result);
});
app.use("/", api);

mongoose
  .connect(process.env.MONG_URI)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log("Server is listening on port", process.env.PORT);
    });
  })
  .catch((error) => {
    console.log(error);
  });
