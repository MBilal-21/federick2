import db from "@/lib/db";
import bcrypt from "bcryptjs";
// import { signIn } from "next-auth/react";

export async function POST(req) {
  const { first_name, last_name, email, phone,wayToConnect, password } = await req.json();
  const validwayToConnect = wayToConnect?.toLowerCase() || "email";
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const [existingUser] = await db.execute("SELECT email FROM users_data WHERE email = ?", [email]);
    const [existingUserNumber] = await db.execute("SELECT phone FROM users_data WHERE phone = ?", [phone]);

    if (existingUser.length) {
      return Response.json({ message: "Email already in use" }, { status: 400 });
    }
    if (existingUserNumber.length) {
      return Response.json({ message: "Phone Number already in use" }, { status: 400 });
    }

    // Insert new user
    await db.execute(
      "INSERT INTO users_data (first_name, last_name, email, phone,best_way_to_connect, password) VALUES (?, ?, ?, ?, ?,?)",
      [first_name, last_name, email, phone,validwayToConnect, hashedPassword]
    );

    // Return email so frontend can log in the user
    return Response.json({ message: "User registered successfully", email }, { status: 201 });
  } catch (error) {
    console.error("Signup Error:", error);
    return Response.json({ message: "Error registering user", error: error.message }, { status: 500 });
  }
}


