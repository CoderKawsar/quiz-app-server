const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion } = require("mongodb");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.otylb.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

async function run() {
  try {
    await client.connect();

    const htmlQuizCollection = client.db("quizDB").collection("html");
    const cssQuizCollection = client.db("quizDB").collection("css");
    const jsQuizCollection = client.db("quizDB").collection("js");

    app.get("/html", async (req, res) => {
      const query = {};
      const cursor = htmlQuizCollection.find(query);
      const htmlQuizes = await cursor.toArray();
      res.send(htmlQuizes);
    });
    app.get("/css", async (req, res) => {
      const query = {};
      const cursor = cssQuizCollection.find(query);
      const cssQuizes = await cursor.toArray();
      res.send(cssQuizes);
    });
    app.get("/js", async (req, res) => {
      const query = {};
      const cursor = jsQuizCollection.find(query);
      const jsQuizes = await cursor.toArray();
      res.send(jsQuizes);
    });
  } finally {
  }
}
run().catch(console.dir);

app.listen(port, () => {
  console.log("App is listening to port: ", port);
});
