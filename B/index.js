import import OpenAI from "openai";
import dotenv from "dotenv";
import readline from "readline";

dotenv.config();

// 🔐 Create OpenAI client
const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// 🛠️ Simple tool: Get current time
async function getTime() {
  return new Date().toLocaleTimeString();
}

// 🤖 Agent function
async function agent(userInput) {
  try {
    // STEP 1: THINK (decide what to do)
    const decision = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: `
You are an AI agent.
Decide what action to take:
- If user asks time → reply exactly: USE_TIME
- Otherwise → reply exactly: RESPOND
`,
        },
        {
          role: "user",
          content: userInput,
        },
      ],
    });

    const action = decision.choices[0].message.content.trim();

    // STEP 2: ACT
    if (action === "USE_TIME") {
      const time = await getTime();
      return `🕒 Current time is: ${time}`;
    }

    // STEP 3: NORMAL RESPONSE
    const reply = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "user", content: userInput },
      ],
    });

    return reply.choices[0].message.content;

  } catch (error) {
    console.error("❌ Error:", error.message);
    return "Something went wrong. Check your API key or setup.";
  }
}

// 🧪 Interactive input from terminal
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question("💬 Ask something: ", async (input) => {
  const result = await agent(input);
  console.log("🤖", result);
  rl.close();
});



OPENAI_API_KEY=your_api_key_heresk-proj-6glvqlty_rUDzTfE-CrYDfQtqSYi4PTbQstRnfe9cba4aTxSprD53RgSkzHOaH5CG5MeNc_LtFT3BlbkFJMMb0grKl8uPRsV2E99VFcoUqTamtthUBxQGfvUyNSIEgSjHmDhc1KcELaSUawIYmrNFVwJ0eQAhellirgg
