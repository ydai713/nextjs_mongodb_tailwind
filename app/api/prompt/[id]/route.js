import { connectToDatabase } from "@utils/database";
import Prompt from "@models/prompt";

// GET
export const GET = async (req, { params }) => {
  try {
    await connectToDatabase();
    console.log(params);
    const prompt = await Prompt.findById(params.id);

    if (!prompt) {
      return new Response(
        JSON.stringify("Prompt not found"), {
        status: 404,
      });
    }
    return new Response(
      JSON.stringify(prompt), {
      status: 200,
    });
  } catch (err) {
    console.log(err);
    return new Response(
      JSON.stringify("Failed to fetch prompt"), {
      status: 500,
    });
  }
}

// PATCH
export const PATCH = async (req, { params }) => {
  const { prompt, tag } = await req.json();

  try {
    await connectToDatabase();
    const existingPrompt = await Prompt.findById(params.id);

    if (!existingPrompt) {
      return new Response(
        JSON.stringify("Prompt not found"), {
        status: 404,
      });
    }
    existingPrompt.prompt = prompt;
    existingPrompt.tag = tag;

    await existingPrompt.save();

    return new Response(
      JSON.stringify(existingPrompt), {
      status: 200,
    });
  } catch (err) {
    console.log(err);
    return new Response(
      JSON.stringify("Failed to update prompt"), {
      status: 500,
    });
  }
}

// DELETE
export const DELETE = async (request, { params }) => {
  try {
    await connectToDatabase();

    // Find the prompt by ID and remove it
    await Prompt.findByIdAndRemove(params.id);

    return new Response("Prompt deleted successfully", { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("Error deleting prompt", { status: 500 });
  }
};
