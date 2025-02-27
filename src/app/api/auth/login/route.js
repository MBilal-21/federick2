import db from "@/lib/db";  // ✅ Use shared MySQL connection
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function POST(req) {
  const { email, password } = await req.json();

  try {
    const [rows] = await db.execute("SELECT * FROM users WHERE email = ?", [
      email,
    ]);

    if (rows.length === 0) return Response.json({ message: "User not found" }, { status: 400 });

    const user = rows[0];

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) return Response.json({ message: "Invalid password" }, { status: 400 });

    const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    return Response.json({ token, user: { id: user.id, email: user.email, phone: user.phone } });
  } catch (error) {
    return Response.json({ message: "Login error", error }, { status: 500 });
  }
}
