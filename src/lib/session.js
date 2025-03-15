export const sessionOptions = {
  password: process.env.SECRET_COOKIE_PASSWORD, // Keep it long and secure!
  cookieName: "user-session",
  cookieOptions: {
    secure: process.env.NODE_ENV === "production", // Secure in production
    httpOnly: true, // Prevents client-side access
    sameSite: "lax",
  },
};




// -----------------------------------------
// import { withIronSessionApiRoute } from "iron-session/next";

// export default withIronSessionApiRoute(handler, {
//   cookieName: "booking_session",
//   password: process.env.SESSION_SECRET, // Set this in .env.local
//   cookieOptions: {
//     secure: process.env.NODE_ENV === "production",
//   },
// });
// ----------------------------------------------------
// export const sessionOptions = {
//   password: process.env.SESSION_SECRET, // Use a strong secret key
//   cookieName: "federick_session",
//   cookieOptions: {
//     secure: process.env.NODE_ENV === "production",
//   },
// };
