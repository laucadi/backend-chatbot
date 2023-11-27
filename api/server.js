import express, { json } from "express";
import "dotenv/config";
import cors from "cors";

const PORT = 8000;
const app = express();

app.use(json());
app.use(cors());
const API_KEY = process.env.API_KEY;

app.post("/completions", async (req, res) => {
  const options = {
    method: "POST",
    headers: {
      Authorization: `Bearer ${API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: req.body.message }],
      max_tokens: 100,
    }),
  };
  console.log(req);
  try {
    const response = await fetch(
      "https://api.openai.com/v1/chat/completions",
      options
    );
    const data = await response.json();
    res.send(data);
  } catch (e) {
    console.log(e);
  }
});

app.listen(PORT, () => console.log("YOUR SERVER IS RUNNING ON PORT" + PORT));

console.log("hola ya entre");
