const express = require("express");
require("dotenv").config();
const cors = require("cors");
const bodyParser = require("body-parser");

const PORT = process.env.PORT || 8000;
const app = express();

app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const API_KEY = process.env.API_KEY;
const IP = process.env.IP || "0.0.0.0";

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
app.get("/", (req, res) => {
  res.send("¡Hola, mundo! Este es un mensaje enviado desde el servidor.");
});

app.listen(PORT, IP, () =>
  console.log("YOUR SERVER IS RUNNING ON PORT" + PORT)
);
