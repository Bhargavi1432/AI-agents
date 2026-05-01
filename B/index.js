import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Simple tool (fake function)
async function getTime() {
  return new Date().toLocaleTimeString();
}

async function agent(userInput) {
  // STEP 1: THINK
  const decision = await client.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "system",
        content: `
        You are an AI agent.
        Decide what action to take:
        - If user asks time → say "USE_TIME"
        - Otherwise → say "RESPOND"
        `,
      },
      {
        role: "user",
        content: userInput,
      },
    ],
  });

  const action = decision.choices[0].message.content;

  // STEP 2: ACT
  if (action.includes("USE_TIME")) {
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
}

// Run agent
(async () => {
  const input = "What is the time now?";
  const result = await agent(input);
  console.log(result);
})();



OPENAI_API_KEY=your_api_key_here
