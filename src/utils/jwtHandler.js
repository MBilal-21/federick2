import jwt from "jsonwebtoken";

const SECRET_KEY = process.env.NEXTAUTH_SECRET || "your_secret_key"; // Secure in .env

// Generate a JWT token
export function createToken(data) {
  return jwt.sign(data, SECRET_KEY, { expiresIn: "7d" });
}

// Update an existing token
export function updateToken(existingToken, newFormData) {
    try {
        console.log("Decoding Existing Token:", existingToken);
        const decoded = jwt.verify(existingToken, SECRET_KEY);

        const updatedPayload = {
            ...decoded,
            formData: { ...decoded.formData, ...newFormData },
            // formData: [ ...decoded.formData, ...newFormData ],
        };

        console.log("Updated Payload:", updatedPayload);

        // Remove `exp` from the payload before signing to avoid conflict
        delete updatedPayload.exp;

        return jwt.sign(updatedPayload, SECRET_KEY, { expiresIn: "1d" });
    } catch (error) {
        console.error("JWT Verification Failed:", error);
        return null; // If verification fails, return null
    }
}


// export function updateToken(existingToken, newData) {
//   try {
//     const decoded = jwt.verify(existingToken, SECRET_KEY);
//     const updatedData = { ...decoded, ...newData }; // Merge new data
//     return createToken(updatedData);
//   } catch (error) {
//     return null; // Invalid token
//   }
// }

// Retrieve token data
export function getTokenData(token) {
  try {
    return jwt.verify(token, SECRET_KEY);
  } catch (error) {
    return null;
  }
}

// Clear token (handled on frontend by deleting from localStorage/cookies)
export function clearToken() {
  return null;
}
