import { connectToDatabase } from "@utils/database";
import Prompt from "@models/prompt";

export const GET = async (req, {params}) => {
  try {
    await connectToDatabase();
    console.log(params);
    const prompts = await Prompt.find({
      creator: params.id,
    }).populate("creator");
    return new Response(
      JSON.stringify(prompts), {
      status: 200,
    });
  } catch (err) {
    console.log(err);
    return new Response(
      JSON.stringify({ msg: err.message }), {
      status: 500,
    });
  }
}
