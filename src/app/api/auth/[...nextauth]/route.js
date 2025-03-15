import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import AppleProvider from "next-auth/providers/apple";
import CredentialsProvider from "next-auth/providers/credentials";
import db from "@/lib/db";  // ✅ Use shared MySQL pool
import bcrypt from "bcryptjs";
import { cookies } from "next/headers";
// import { signOut } from "next-auth/react";

function clearToken(tokenName) {
  console.log("clearing token", tokenName);

  const cookieStore = cookies();
  cookieStore.delete(tokenName);
}

export const authOptions = {
  session: { strategy: "jwt" },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const [rows] = await db.execute("SELECT * FROM users_data WHERE email = ?", [
          credentials.email,
        ]);

        if (rows.length === 0) throw new Error("User not found");

        const user = rows[0];

        const isValidPassword = await bcrypt.compare(
          credentials.password,
          user.password
        );
        if (!isValidPassword) throw new Error("Invalid password");

        return { id: user.id, email: user.email, phone: user.phone };
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    AppleProvider({
      clientId: process.env.APPLE_CLIENT_ID,
      clientSecret: process.env.APPLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      if (account.provider === "google" || account.provider === "apple") {
        // Check if user exists in database
        const [existingUser] = await db.execute(
          "SELECT * FROM users_data WHERE email = ?",
          [user.email]
        );

        if (existingUser.length === 0) {
          // If new user, insert into the database
          await db.execute(
            "INSERT INTO users_data (first_name, last_name, email, provider, provider_id, email_verified) VALUES (?, ?, ?, ?, ?, NOW())",
            [
              user.name?.split(" ")[0] || "",
              user.name?.split(" ")[1] || "",
              user.email,
              account.provider,
              user.id,
            ]
          );
        }
      }
      clearToken("guest_token");
      return true;
    },
    async jwt({ token, user }) {
      if (user) token.user = user;
      return token;
    },
    async session({ session, token }) {
      session.user = token.user || { id: "guest", role: "guest" };
      return session;
    },

  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };



// import NextAuth from "next-auth";
// import GoogleProvider from "next-auth/providers/google";
// import AppleProvider from "next-auth/providers/apple";
// import CredentialsProvider from "next-auth/providers/credentials";
// import db from "@/lib/db";  // ✅ Use the shared DB pool
// import bcrypt from "bcryptjs";

// export const authOptions = {
//   session: { strategy: "jwt" },
//   providers: [
//     CredentialsProvider({
//       name: "Credentials",
//       credentials: {
//         email: { label: "Email", type: "text" },
//         password: { label: "Password", type: "password" },
//       },
//       async authorize(credentials) {
//         const [rows] = await db.execute("SELECT * FROM users WHERE email = ?", [
//           credentials.email,
//         ]);

//         if (rows.length === 0) throw new Error("User not found");

//         const user = rows[0];

//         const isValidPassword = await bcrypt.compare(
//           credentials.password,
//           user.password
//         );
//         if (!isValidPassword) throw new Error("Invalid password");

//         return { id: user.id, email: user.email, phone: user.phone };
//       },
//     }),
//     GoogleProvider({
//       clientId: process.env.GOOGLE_CLIENT_ID,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//     }),
//     AppleProvider({
//       clientId: process.env.APPLE_CLIENT_ID,
//       clientSecret: process.env.APPLE_CLIENT_SECRET,
//     }),
//   ],
//   callbacks: {
//     async jwt({ token, user }) {
//       if (user) token.user = user;
//       return token;
//     },
//     async session({ session, token }) {
//       session.user = token.user;
//       return session;
//     },
//   },
// };

// const handler = NextAuth(authOptions);
// export { handler as GET, handler as POST };


// import NextAuth from "next-auth";
// import CredentialsProvider from "next-auth/providers/credentials";
// import GoogleProvider from "next-auth/providers/google";
// import AppleProvider from "next-auth/providers/apple";
// import mysql from "mysql2/promise";
// import bcrypt from "bcryptjs";

// const db = await mysql.createConnection({
//     host: process.env.DB_HOST,
//     user: process.env.DB_USER,
//     password: process.env.DB_PASS,
//     database: process.env.DB_NAME,
// });

// export const authOptions = {
//     providers: [
//         // Email & Password Login
//         CredentialsProvider({
//             name: "Email & Password",
//             credentials: {
//                 email: { label: "Email", type: "email", required: true },
//                 password: { label: "Password", type: "password", required: true },
//             },
//             async authorize(credentials) {
//                 const [rows] = await db.execute("SELECT * FROM users WHERE email = ?", [credentials.email]);

//                 if (rows.length === 0) {
//                     throw new Error("User not found");
//                 }

//                 const user = rows[0];

//                 const isValid = await bcrypt.compare(credentials.password, user.password);
//                 if (!isValid) {
//                     throw new Error("Invalid password");
//                 }

//                 return { id: user.id, name: user.name, email: user.email };
//             },
//         }),

//         // Google Login
//         GoogleProvider({
//             clientId: process.env.GOOGLE_CLIENT_ID,
//             clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//         }),

//         // Apple Login
//         AppleProvider({
//             clientId: process.env.APPLE_CLIENT_ID,
//             clientSecret: process.env.APPLE_CLIENT_SECRET,
//         }),
//     ],
//     secret: process.env.NEXTAUTH_SECRET,
//     callbacks: {
//         async signIn({ user, account }) {
//             if (account.provider === "credentials") {
//                 return true;
//             }

//             const [rows] = await db.execute("SELECT * FROM users WHERE email = ?", [user.email]);

//             if (rows.length === 0) {
//                 await db.execute(
//                     "INSERT INTO users (name, email, provider, provider_id) VALUES (?, ?, ?, ?)",
//                     [user.name, user.email, account.provider, user.id]
//                 );
//             }

//             return true;
//         },
//         async session({ session, token }) {
//             if (token) session.user.id = token.sub;
//             return session;
//         },
//     },
// };

// const handler = NextAuth(authOptions);
// export { handler as GET, handler as POST };
