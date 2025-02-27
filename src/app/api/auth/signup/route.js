import db from "@/lib/db";  // ✅ Use shared MySQL connection
import bcrypt from "bcryptjs";

export async function POST(req) {
  const { first_name, last_name, email, phone, password } = await req.json();

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const [existingUser] = await db.execute(
      "SELECT * FROM users WHERE email = ?",
      [email]
    );
    if (existingUser.length) {
      return Response.json({ message: "Email already in use" }, { status: 400 });
    }

    await db.execute(
      "INSERT INTO users (first_name, last_name, email, phone, password) VALUES (?, ?, ?, ?, ?)",
      [first_name, last_name, email, phone, hashedPassword]
    );

    return Response.json({ message: "User registered successfully" }, { status: 201 });
  } catch (error) {
    return Response.json({ message: "Error registering user", error }, { status: 500 });
  }
}
