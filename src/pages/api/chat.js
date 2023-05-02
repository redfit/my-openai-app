import { Configuration, OpenAIApi } from "openai";
const configuration = new Configuration({
  organization: process.env.OPENAI_ORGANIZATION,
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

export default async function handler(req, res) {
  const completion = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [
      { role: "system", content: "あなたは親切なアシスタントです" },
      {
        role: "user",
        content: "2020年の欧州チャンピオンズリーグはどこが勝ちましたか？",
      },
      { role: "assistant", content: "チェルシーです" },
      { role: "user", content: "どこで行われましたか？" },
    ],
  });

  res.status(200).json({
    data: completion.data,
  });
}
