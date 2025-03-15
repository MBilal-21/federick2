import db from "@/lib/db";

export async function GET(req) {
  try {
    const rides = await db.execute("SELECT * FROM cars_data");

    if (!rides[0].length) {
      return Response.json({ message: "No rides found" }, { status: 404 });
    }

    return Response.json({ rides: rides[0] });
  } catch (error) {
    console.error("rides error:", error);
    return Response.json(
      { message: "Something is wrong try later", error: error.message }, 
      { status: 500 }
    );
  }
}

// export async function post(req) {
//   const { first_name, last_name, email, phone, password } = await req.json();


//   try {
//     const [existingUser] = await db.execute("SELECT * FROM users_data WHERE email = ?", [email]);

//     if (existingUser.length) {
//       return Response.json({ message: "Email already in use" }, { status: 400 });
//     }
    

//     // Insert new user
//     await db.execute(
//       "INSERT INTO users_data (first_name, last_name, email, phone, password) VALUES (?, ?, ?, ?, ?)",
//       [first_name, last_name, email, phone, hashedPassword]
//     );

//     // Return email so frontend can log in the user
//     return Response.json({ message: "User registered successfully", email }, { status: 201 });
//   } catch (error) {
//     console.error("Signup Error:", error);
//     return Response.json({ message: "Error registering user", error: error.message }, { status: 500 });
//   }
// }


