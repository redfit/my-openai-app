import { Configuration, OpenAIApi } from "openai";
const configuration = new Configuration({
  organization: process.env.OPENAI_ORGANIZATION,
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function handler(req, res) {
  const { prompt } = JSON.parse(req.body);

  const shape = {
    title: "Sports Title",
    content: "<p>A blog post about current Sports</p>",
  };

  const completion = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "system",
        content: `
          You are an assistant that creates new blog posts on a given topic.
          You should provide a title and HTML content in JSON format.
        `,
      },
      {
        role: "user",
        content: "sports",
      },
      {
        role: "assistant",
        content: JSON.stringify(shape),
      },
      {
        role: "user",
        content: `Create a blog post with the following topic: ${prompt}`,
      },
    ],
  });

  console.log(completion.data.choices);

  const data = JSON.parse(completion.data.choices[0].message.content);

  res.status(200).json({
    data,
  });
}
