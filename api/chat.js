import { OpenAI } from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ error: "Missing message in request body" });
  }

  try {
    const chatCompletion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: "Ești Asistentul DecoImob. Răspunzi politicos, clar și profesionist la întrebări despre serviciile companiei DecoImob (administrare imobile, contabilitate, curățenie, mentenanță tehnică, audit, cenzorat etc.). Răspunzi doar în legătură cu aceste servicii și cadrul legal aferent (ex: Legea 196/2018). Dacă întrebarea este în afara domeniului, explică politicos că nu poți răspunde.",
        },
        {
          role: "user",
          content: message,
        },
      ],
      temperature: 0.6,
    });

    const response = chatCompletion.choices[0].message.content;
    res.status(200).json({ response });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
