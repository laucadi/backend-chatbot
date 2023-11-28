const express = require("express");
require("dotenv").config();
const cors = require("cors");

const PORT = 8000;
const app = express();

app.use(express.json());
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

  try {
    const response = await fetch(
      "https://api.openai.com/v1/chat/completions",
      options
    );
    const data = await response.json();
    res.send(data);
  } catch (error) {
    console.log(error);
    res.status(500).send("Error en la solicitud a OpenAI");
  }
});

app.listen(PORT, () => console.log("YOUR SERVER IS RUNNING ON PORT" + PORT));

console.log("hola ya entre");
