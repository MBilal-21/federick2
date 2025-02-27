import { connectDB } from "@/lib/db";

export async function POST(req) {
  try {
    const { name, email } = await req.json();
    const db = await connectDB();
    const [result] = await db.execute("INSERT INTO users (name, email) VALUES (?, ?)", [name, email]);

    return Response.json({ message: "User added successfully!", insertId: result.insertId });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}
