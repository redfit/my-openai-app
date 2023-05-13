require("dotenv").config({
  path: "./.env.local",
});

const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
  organization: process.env.OPENAI_ORGANIZATION,
});

const openai = new OpenAIApi(configuration);

(async function run() {
  const response = await openai.retrieveFineTune("ft-wuJfct73Keb3y58d0oG03XNI");

  console.log("response", response.data);
})();
