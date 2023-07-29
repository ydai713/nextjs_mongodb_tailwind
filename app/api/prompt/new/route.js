import { connectToDatabase } from "@utils/database";
import Prompt from "@models/prompt";

export const POST = async (req, res) => {
  const { userId, prompt, tag } = await req.json();
  console.log(req.json());

  try {
    await connectToDatabase();
    const newPrompt = new Prompt({
      creator: userId,
      prompt: prompt,
      tag: tag,
    });

    await newPrompt.save();

    return new Response(
      JSON.stringify(newPrompt), {
      status: 200,
    });
  } catch (err) {
    return new Response(
      JSON.stringify({ msg: err.message }), {
      status: 500,
    });
  }
};
