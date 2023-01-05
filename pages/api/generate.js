import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const basePromptPrefix =
`
Write a detailed story with three sections, intro, content and end covering the following subject: 
`

const openai = new OpenAIApi(configuration);
const generateAction = async (req, res) => {
  // Run first prompt
  console.log(`API: ${basePromptPrefix}${req.body.userInput}`)

  const baseCompletion = await openai.createCompletion({
    model: 'text-davinci-003',
    prompt: `${basePromptPrefix}${req.body.userInput}`,
    temperature: 0.7,
    max_tokens: 250,
  });
  
  const basePromptOutput = baseCompletion.data.choices.pop();

  res.status(200).json({ output: basePromptOutput });
};

export default generateAction;