"use client";
import Loading from "@/components/Loading";
import { signIn, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [googleLoading, setGoogleLoading] = useState(false);
    const [appleLoading, setAppleLoading] = useState(false);
    const { status } = useSession();
    const router = useRouter();
    const redirectUser = (path) => router.push(path);



    // Redirect to home if user is already logged in
    useEffect(() => {
        console.log(status);

        if (status === "authenticated") {
            redirectUser("/welcome-back"); // Redirect to welcome page
        }
    }, [status, router]);

    if (status === "loading") return <Loading />; // Show a loading state

    //   handle submit function for signin user start
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const result = await signIn("credentials", {
                redirect: false,
                email,
                password,
            });

            if (result?.error) {
                alert("Invalid credentials. Please try again.");
            } else {
                redirectUser("/welcome-back");
            }
        } catch (error) {
            console.error("Login error:", error);
            alert("Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    //   handle submit function for signin user end
    //   handle submit function for signin user by google and apple start

    const handleSocialLogin = async (provider) => {
        if (provider === "google") setGoogleLoading(true);
        if (provider === "apple") setAppleLoading(true);

        try {
            await signIn(provider, { callbackUrl: "/welcome-back" });
        } catch (error) {
            console.error(`${provider} login error:`, error);
            alert("Failed to login. Please try again.");
        } finally {
            if (provider === "google") setGoogleLoading(false);
            if (provider === "apple") setAppleLoading(false);
        }
    };
    //   handle submit function for signin user by google and apple end

    //  return Login page
    return (
        <div className="container mt-4 mb-4 d-lg-flex justify-content-center">
            <div className="row justify-content-center shadow-sm rounded">
                <form onSubmit={handleSubmit} className="col-lg-6 p-sm-4">
                    <div className="full-width-bg pt-4 pb-2 mb-2 bg-custom-gray">
                        <h2 className="font-size-16 text-custom-gray-blue">Booking A Service</h2>
                        <p className="fw-bold font-size-24 text-custom-gray-dark">Sign In</p>
                    </div>

                    <div className="mb-3 font-size-14">
                        <label htmlFor="email" className="form-label fw-bold">Email address</label>
                        <input
                            type="email"
                            className="form-control"
                            id="email"
                            placeholder="name@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            disabled={loading}
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="password" className="form-label fw-bold">Password</label>
                        <input
                            type="password"
                            className="form-control"
                            id="password"
                            placeholder="Enter Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            disabled={loading}
                            required
                        />
                    </div>

                    <div className="py-4">
                        <div className="d-flex justify-content-between gap-3">
                            <Link href="/signup" className="btn btn-outline-dark w-50 fw-bold">Sign Up</Link>
                            <button
                                className="btn bg-custom-red text-white w-50 fw-bold"
                                type="submit"
                                disabled={loading}
                            >
                                {loading ? "Logging in..." : "Continue"}
                            </button>
                        </div>
                    </div>
                    {/* Gust Google and Apple Button */}
                    <div className="w-100 text-md-start text-center font-size-14 mb-4 d-flex flex-column gap-3">
                        {/* Guest Button */}
                        <Link href="/guestuser" className="btn btn-dark ">Guest User</Link>
                        {/* Apple Button */}
                        <button
                            className="btn btn-outline-dark applebtn"
                            onClick={() => handleSocialLogin("apple")}
                            disabled={appleLoading}
                        >
                            <Image src="/icons/Apple.svg" alt="ap" width={16} height={16} style={{ margin: "0 8px 4px 0" }} /> {appleLoading ? "Signing in with Apple..." : "Continue with Apple"}
                        </button>
                        {/* Google button */}
                        <button
                            className="btn btn-outline-dark "
                            onClick={() => handleSocialLogin("google")}
                            disabled={googleLoading}
                        >
                            <Image src="/icons/Google.svg" alt="go" width={16} height={16} style={{ margin: "0 8px 4px 0" }} /> {googleLoading ? "Signing in with Google..." : "Continue with Google"}
                        </button>
                    </div>
                </form>

                <div className="d-none d-lg-flex col-lg-6 bg-custom-gray">
                    <Image
                        src="/frederick_login.svg"
                        alt="login"
                        width={500}
                        height={500}
                        className="img-fluid"
                    />
                </div>
            </div>
        </div>
    );
}



// "use client";
// import { signIn } from "next-auth/react";
// import Image from "next/image";
// import Link from "next/link";
// import { useState } from "react";
// export default function Login() {
//     const [email, setEmail] = useState('')
//     const [password, setPassword] = useState('')

//     const handleGoogleLogin = async () => {
//         signIn("google", { callbackUrl: "/profile" }); // Redirect to home after login
//       };
//     const handleSubmit = (e) => {
//         e.preventDefault()
//         // Handle login logic here
//     }

//     return (

//         <div className="container mt-4 mb-4 d-lg-flex justify-content-center">
//             <div className="row justify-content-center shadow-sm rounded">
//                 <form onSubmit={handleSubmit} className="col-lg-6 p-sm-4" >
//                     <h2 className="fw-bold font-size-16 text-custom-gray-light">Booking A Service</h2>
//                     <p className="fw-bold font-size-24 text-custom-gray-dark">Sign In</p>
//                     <div className="mb-3 font-size-14">
//                         <label htmlFor="email" className="form-label fw-bold">
//                             Email address
//                         </label>
//                         <input
//                             type="email"
//                             className="form-control"
//                             id="email"
//                             placeholder="name@example.com"
//                             value={email}
//                             onChange={(e) => setEmail(e.target.value)}
//                         />
//                     </div>
//                     <div className="mb-3">
//                         <label htmlFor="Password" className="form-label fw-bold">
//                             Password
//                         </label>
//                         <input
//                             type="password"
//                             className="form-control"
//                             id="Password"
//                             placeholder="Enter Password"
//                             value={password}
//                             onChange={(e) => setPassword(e.target.value)}
//                         />
//                     </div>
//                     <div className="py-4">

//                         <div className="d-flex justify-content-between gap-3">
//                             <button className="btn bg-custom-red text-white w-50 fw-bold" type="submit">Log In</button>
//                             <Link href="/signup"  className="btn btn-outline-dark w-50 fw-bold">Sign Up</Link>
//                         </div>
//                     </div>
//                     <div className="w-100 text-md-start text-center font-size-14 mb-4">
//                         <Link href="/guestuser" className="underline text-black ">Continue as guest user</Link>
//                         <button className="underline text-black "  onClick={() => signIn("google")}>Continue with Google</button>
//                     </div>
//                 </form>
//                 <div className="d-none d-lg-flex col-lg-6 bg-custom-gray">
//                     <Image src="frederick_login.svg" alt="login" width={500} height={500} className="img-fluid" />
//                 </div>
//             </div>
//         </div>

//     );
// }
