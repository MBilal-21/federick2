"use client";
import Image from "next/image";
import { Check } from 'lucide-react';
import style from './page.module.css'
import { useState } from "react";
import Link from "next/link";
export default function WelcomeBack() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [wayToConnect, setWayToConnect] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault()
        // Handle login logic here
    }

    return (

        <div className="container mt-4 mb-4 ">
            <div className="d-none d-lg-flex justify-content-start gap-3">

                <div className="d-flex gap-3 justify-content-center align-items-center"><div className="bg-custom-red rounded-circle text-center" style={{ width: "24px", height: "24px" }}> <Check color="white" size={16} /><span className="text-white d-none">1</span></div> <hr className="bg-custom-red border-0 opacity-100" style={{ width: "130px", height: "2px" }} /> </div>
                <div className="d-flex gap-3 justify-content-center align-items-center"><div className="bg-custom-gray-light rounded-circle text-center" style={{ width: "24px", height: "24px" }}> <Check color="white" size={16} className="d-none" /><span className="text-white">2</span></div> <hr className="bg-custom-gray-light border-0 opacity-100" style={{ width: "130px", height: "2px" }} /> </div>
                <div className="d-flex gap-3 justify-content-center align-items-center"><div className="bg-custom-gray-light rounded-circle text-center" style={{ width: "24px", height: "24px" }}> <Check color="white" size={16} className="d-none" /><span className="text-white">3</span></div> <hr className="bg-custom-gray-light border-0 opacity-100" style={{ width: "130px", height: "2px" }} /> </div>
                <div className="d-flex gap-3 justify-content-center align-items-center"><div className="bg-custom-gray-light rounded-circle text-center" style={{ width: "24px", height: "24px" }}> <Check color="white" size={16} className="d-none" /><span className="text-white">4</span></div> <hr className="bg-custom-gray-light border-0 opacity-100" style={{ width: "130px", height: "2px" }} /> </div>
                <div className="d-flex gap-3 justify-content-center align-items-center"><div className="bg-custom-gray-light rounded-circle text-center" style={{ width: "24px", height: "24px" }}> <Check color="white" size={16} className="d-none" /><span className="text-white">5</span></div>  </div>
            </div>
            <div className="row justify-content-center rounded">
                <form onSubmit={handleSubmit} className="col-lg-6 p-sm-4" >
                    <div className="d-flex justify-content-between">
                        <div>
                            <h2 className="fw-bold font-size-16 text-custom-gray-light">Booking A Service</h2>
                            <p className="fw-bold font-size-24 text-custom-gray-dark">Personal <span className="d-inline d-lg-none">Info</span> <span className="d-none d-lg-inline">Information</span></p>
                        </div>
                        {/* <div className="d-flex justify-content-center align-items-center rounded-circle d-lg-none" style={{ width: "36px", height: "36px",border:"3px solid #000000", borderTopColor: "#FF0000" }}>
                             <span>   1/5</span>
                        </div> */}
                        <div className="d-lg-none d-flex justify-content-center align-items-center " >
                            <div className={style.circle}>
                                <span className={style.text}>1/5</span>
                            </div>
                        </div>
                    </div>
                    <div className="">
                        <div className="mb-3 font-size-14 ">
                            <label htmlFor="firstName" className="form-label fw-bold">
                                First Name
                            </label>
                            <input
                                type="text"
                                className="form-control border-top-0 border-start-0 border-end-0 rounded-0"
                                id="firstName"
                                name="firstName"
                                placeholder="First Name"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                            />
                        </div>
                        {/* <div className="mb-3 font-size-14 ">
                            <label htmlFor="lastName" className="form-label fw-bold">
                                Last Name
                            </label>
                            <input
                                type="text"
                                className="form-control  border-top-0 border-start-0 border-end-0 rounded-0"
                                id="lastName"
                                name="lastName"
                                placeholder="Last Name"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                            />
                        </div> */}
                        <div className="mb-3 font-size-14">
                            <label htmlFor="email" className="form-label fw-bold">
                                Email address
                            </label>
                            <input
                                type="email"
                                className="form-control  border-top-0 border-start-0 border-end-0 rounded-0"
                                id="email"
                                placeholder="name@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        {/* <div className="mb-3 font-size-14 ">
                            <label htmlFor="password" className="form-label fw-bold">
                                Password
                            </label>
                            <input
                                type="password"
                                className="form-control"
                                id="password"
                                name="password"
                                placeholder="Enter Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div> */}
                        <div className="mb-3 font-size-14 ">
                            <label htmlFor="phoneNumber" className="form-label fw-bold">
                                Phone Number
                            </label>
                            <input
                                type="text"
                                className="form-control  border-top-0 border-start-0 border-end-0 rounded-0"
                                id="phoneNumber"
                                name="phoneNumber"
                                placeholder="Phone Number"
                                value={phoneNumber}
                                onChange={(e) => setPhoneNumber(e.target.value)}
                            />
                        </div>
                        <div className="mb-3 font-size-14 ">
                            <label htmlFor="wayToConnect" className="form-label fw-bold">
                                Best way to connect
                            </label>
                            <select name="wayToConnect" id="wayToConnect" value={wayToConnect} className="pointer form-select  border-top-0 border-start-0 border-end-0 rounded-0" onChange={(e) => {
                                console.log(e.target.value);

                                setWayToConnect(e.target.value)
                            }}>
                                <option value="Email" >Email</option>
                                <option value="phoneNumber">Phone Number</option>
                            </select>

                        </div>
                    </div>
                    <div className="py-4">
                        <div className="d-flex justify-content-between gap-3">
                            <Link href={"/travel-details"} className="btn bg-custom-red text-white w-50 fw-bold" type="submit">Continue</Link>
                        </div>
                    </div>

                </form>
                <div className="d-none d-lg-flex col-lg-6 ">
                    <Image src="frederick_signup.svg" alt="login" width={500} height={500} className="img-fluid" />
                </div>
            </div>
        </div>

    );
}
