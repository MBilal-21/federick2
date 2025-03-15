import jwt from "jsonwebtoken";

export async function POST(req) {
    try {
        const authHeader = req.headers.get("Authorization");
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
        }

        // Extract JWT token
        const token = authHeader.split(" ")[1];

        // Verify JWT
        const decoded = jwt.verify(token, process.env.NEXTAUTH_SECRET);

        // Parse request data
        const formData = await req.json();

        // Save booking to database (Assume you have a DB function)
        const savedBooking = {
            guestId: decoded.id,
            ...formData
        };

        console.log("Saving booking:", savedBooking); // Replace with actual DB save

        return new Response(JSON.stringify({ message: "Booking saved successfully!" }), {
            headers: { "Content-Type": "application/json" },
        });
    } catch (error) {
        console.error("Error:", error);
        return new Response(JSON.stringify({ error: "Invalid token or server error" }), { status: 500 });
    }
}
