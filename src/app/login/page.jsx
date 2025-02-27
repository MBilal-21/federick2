"use client";
// import { signIn } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
export default function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleGoogleLogin = async () => {
        signIn("google", { callbackUrl: "/profile" }); // Redirect to home after login
      };
    const handleSubmit = (e) => {
        e.preventDefault()
        // Handle login logic here
    }

    return (

        <div className="container mt-4 mb-4 d-lg-flex justify-content-center">
            <div className="row justify-content-center shadow-sm rounded">
                <form onSubmit={handleSubmit} className="col-lg-6 p-sm-4" >
                    <h2 className="fw-bold font-size-16 text-custom-gray-light">Booking A Service</h2>
                    <p className="fw-bold font-size-24 text-custom-gray-dark">Sign In</p>
                    <div className="mb-3 font-size-14">
                        <label htmlFor="email" className="form-label fw-bold">
                            Email address
                        </label>
                        <input
                            type="email"
                            className="form-control"
                            id="email"
                            placeholder="name@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="Password" className="form-label fw-bold">
                            Password
                        </label>
                        <input
                            type="password"
                            className="form-control"
                            id="Password"
                            placeholder="Enter Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div className="py-4">

                        <div className="d-flex justify-content-between gap-3">
                            <button className="btn bg-custom-red text-white w-50 fw-bold" type="submit">Log In</button>
                            <Link href="/signup"  className="btn btn-outline-dark w-50 fw-bold">Sign Up</Link>
                        </div>
                    </div>
                    <div className="w-100 text-md-start text-center font-size-14 mb-4">
                        <Link href="/guestuser" className="underline text-black ">Continue as guest user</Link>
{/*                         <button className="underline text-black "  onClick={() => signIn("google")}>Continue with Google</button> */}
                    </div>
                </form>
                <div className="d-none d-lg-flex col-lg-6 bg-custom-gray">
                    <Image src="frederick_login.svg" alt="login" width={500} height={500} className="img-fluid" />
                </div>
            </div>
        </div>

    );
}
