import { cookies } from "next/headers";
import { createToken, updateToken, getTokenData, clearToken } from "@/utils/jwtHandler";
import { v4 as uuidv4 } from "uuid";
export async function GET(req) {
    const cookieStore = await cookies();
    const token = cookieStore.get("guest_token")?.value || null;
    const { searchParams } = new URL(req.url);
    const requestedRole = searchParams.get('role');
    console.log("role",requestedRole);
    
    if (!token) {
        // Create a new guest token
        // const guestId = `guest_${Math.random().toString(36).substring(2, 15)}`;
        const guestId = uuidv4();

        const newToken = createToken({ id: guestId, role: requestedRole || "guest", formData: {} });
        // const newToken = createToken({ id: guestId, role: "guest", formData: {} });

        cookieStore.set("guest_token", newToken, { httpOnly: true, maxAge: 604800 });
        
        return Response.json({ token: newToken, message: "Guest token created." });
    }

    // Return existing guest token
    const tokenData = getTokenData(token);
    
    return Response.json({ tokenData });
}

export async function POST(req) {
    const cookieStore = await cookies();
    const token = cookieStore.get("guest_token")?.value || null;
    console.log("Token: // Debugging Step 0", token); // Debugging Step 0
    
    const formData = await req.json();

    console.log("Existing Token:", token); // Debugging Step 1
    console.log("Received FormData:", formData); // Debugging Step 2

    if (!token) {
        return Response.json({ error: "No token found. Redirect to the first form." }, { status: 400 });
    }

    try {
        const updatedToken = updateToken(token, formData);
        console.log("Updated Token:", updatedToken); // Debugging Step 3

        cookieStore.set("guest_token", updatedToken, { httpOnly: true, maxAge: 604800 });

        return Response.json({ message: "Token updated successfully." });
    } catch (error) {
        console.error("Error updating token:", error);
        return Response.json({ error: "Failed to update token." }, { status: 500 });
    }
}


export async function DELETE(req) {
    const cookieStore = await cookies();
    cookieStore.delete("guest_token");
    return Response.json({ message: "Token cleared." });
}
