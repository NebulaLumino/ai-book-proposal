import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
function getClient() { return new OpenAI({ apiKey: process.env.OPENAI_API_KEY || "", baseURL: "https://api.deepseek.com/v1" }); }

export async function POST(req: NextRequest) {
  try {
    const { bookTitle, genre, targetReader, uniqueAngle, compTitles } = await req.json();
    const prompt = `Write a professional book proposal:\nBook Title: ${bookTitle || "Untitled"}\nGenre: ${genre || "Non-fiction"}\nTarget Reader: ${targetReader || "Adult professionals"}\nUnique Angle: ${uniqueAngle || "What makes this book stand out"}\nComparable Titles: ${compTitles || "Similar successful books"}\n\nInclude: Overview, target market analysis, competitive landscape, author bio, chapter outline, sample chapter, and marketing hook.`;
    const completion = await getClient().chat.completions.create({ model: "deepseek-chat", messages: [{ role: "user", content: prompt }], max_tokens: 2000, temperature: 0.6 });
    return NextResponse.json({ result: completion.choices[0]?.message?.content || "No output." });
  } catch (e) { return NextResponse.json({ error: "Failed" }, { status: 500 }); }
}
