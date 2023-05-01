import { Configuration, OpenAIApi } from "openai";
const configuration = new Configuration({
  organization: process.env.OPENAI_ORGANIZATION,
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

export default async function handler(req, res) {
  const response = await openai.createImage({
    prompt: "噴火する富士山",
    n: 1,
    size: "512x512",
  });

  res.status(200).json({ data: response.data.data });
}
