import jwt from "jsonwebtoken";

export async function GET(req) {
    // Generate a unique Guest ID (or use a UUID library)
    const guestId = `guest_${Math.random().toString(36).substring(2, 15)}`;
    const newFormData = await req.json();
    console.log(newFormData);
    

    // Sample form data (Modify this to fetch real data)
    const formData = {
        fullName: "John Doe",
        email: "johndoe@example.com",
        phoneNumber: "1234567890",
        wayToConnect: "email"
    };

    // Create a JWT token containing guest info and form data
    const token = jwt.sign(
        { id: guestId, role: "guest", formData }, 
        process.env.NEXTAUTH_SECRET, // Keep it secure
        { expiresIn: "7d" } // Token validity
    );

    return new Response(JSON.stringify({ token }), {
        headers: { "Content-Type": "application/json" },
    });
}


// import jwt from "jsonwebtoken";

// export async function GET(req) {
//   // Generate a unique Guest ID (or use a UUID library)
//   const guestId = `guest_${Math.random().toString(36).substring(2, 15)}`;

//   // Create a JWT token for the guest
//   const token = jwt.sign(
//     { id: guestId, role: "guest" },
//     process.env.NEXTAUTH_SECRET, // Keep it secure
//     { expiresIn: "7d" } // Token validity
//   );

//   return new Response(JSON.stringify({ token }), {
//     headers: { "Content-Type": "application/json" },
//   });
// }
