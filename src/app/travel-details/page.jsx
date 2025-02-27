"use client";
import Image from "next/image";
import { Check } from 'lucide-react';
import style from './page.module.css'
import { useState } from "react";
import Link from "next/link";
export default function Signup() {
    const [travelDate, setTravelDate] = useState('')
    const [numberOfBags, setNumberOfBags] = useState('')
    const [numberOfpassengers, setNumberOfpassengers] = useState('')
    const [typeOfReservation, setTypeOfReservation] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()
        // Handle login logic here
    }

    return (

        <div className="container mt-4 mb-4 ">
            <div className="d-none d-lg-flex justify-content-start gap-3">

                <div className="d-flex gap-3 justify-content-center align-items-center"><div className="bg-custom-red rounded-circle text-center" style={{ width: "24px", height: "24px" }}> <Check color="white" size={16} /><span className="text-white d-none">1</span></div> <hr className="bg-custom-red border-0 opacity-100" style={{ width: "130px", height: "2px" }} /> </div>
                <div className="d-flex gap-3 justify-content-center align-items-center"><div className="bg-custom-red rounded-circle text-center" style={{ width: "24px", height: "24px" }}> <Check color="white" size={16} /><span className="text-white d-none">2</span></div> <hr className="bg-custom-red border-0 opacity-100" style={{ width: "130px", height: "2px" }} /> </div>
                <div className="d-flex gap-3 justify-content-center align-items-center"><div className="bg-custom-gray-light rounded-circle text-center" style={{ width: "24px", height: "24px" }}> <Check color="white" size={16} className="d-none" /><span className="text-white">3</span></div> <hr className="bg-custom-gray-light border-0 opacity-100" style={{ width: "130px", height: "2px" }} /> </div>
                <div className="d-flex gap-3 justify-content-center align-items-center"><div className="bg-custom-gray-light rounded-circle text-center" style={{ width: "24px", height: "24px" }}> <Check color="white" size={16} className="d-none" /><span className="text-white">4</span></div> <hr className="bg-custom-gray-light border-0 opacity-100" style={{ width: "130px", height: "2px" }} /> </div>
                <div className="d-flex gap-3 justify-content-center align-items-center"><div className="bg-custom-gray-light rounded-circle text-center" style={{ width: "24px", height: "24px" }}> <Check color="white" size={16} className="d-none" /><span className="text-white">5</span></div>  </div>
            </div>
            <div className="row justify-content-center rounded">
                <form onSubmit={handleSubmit} className="col-lg-6 p-sm-4" >
                    <div className="d-flex justify-content-between">
                        <div>
                            <h2 className="fw-bold font-size-16 text-custom-gray-light">Booking A Service</h2>
                            <p className="fw-bold font-size-24 text-custom-gray-dark">Travel Details</p>
                        </div>
                        {/* <div className="d-flex justify-content-center align-items-center rounded-circle d-lg-none" style={{ width: "36px", height: "36px",border:"3px solid #000000", borderTopColor: "#FF0000" }}>
                             <span>   1/5</span>
                        </div> */}
                        <div className="d-lg-none d-flex justify-content-center align-items-center " >
                            <div className={style.circle}>
                                <span className={style.text}>2/5</span>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="mb-3 font-size-14 col-lg-6">
                            <label htmlFor="travelDate" className="form-label fw-bold">
                                Travel Date
                            </label>
                            <input
                                type="date"
                                className="form-control"
                                id="travelDate"
                                name="travelDate"
                                placeholder="00/00/0000"
                                value={travelDate}
                                onChange={(e) => setTravelDate(e.target.value)}
                            />
                        </div>
                        <div className="mb-3 font-size-14 col-lg-6">
                            <label htmlFor="numberOfBags" className="form-label fw-bold">
                                Number of bags/luggage
                            </label>
                            <input
                                type="number"
                                className="form-control"
                                id="numberOfBags"
                                name="numberOfBags"
                                placeholder="1"
                                value={numberOfBags}
                                onChange={(e) => setNumberOfBags(e.target.value)}
                            />
                        </div>
                        <div className="mb-3 font-size-14 col-lg-6">
                            <label htmlFor="numberOfpassenger" className="form-label fw-bold">
                            Number of Passengers
                            </label>
                            <input
                                type="number"
                                className="form-control"
                                id="numberOfpassenger"
                                placeholder="1"
                                value={numberOfpassengers}
                                onChange={(e) => setNumberOfpassengers(e.target.value)}
                            />
                        </div>
                        
                        <div className="mb-3 font-size-14 col-lg-6 ">
                            <label htmlFor="reservation" className="form-label fw-bold">
                                Best way to connect
                            </label>
                            <select name="typeOfReservation" id="reservation" value={typeOfReservation} className="form-select" onChange={(e) => {
                                console.log(e.target.value);

                                setTypeOfReservation(e.target.value)
                            }}>
                                <option value="one-way" >One Way</option>
                                <option value="round-trip">Round Trip</option>
                            </select>

                        </div>
                    </div>
                    <div className="py-4">
                        <div className="d-flex justify-content-between gap-3">
                            <Link href={"/"} className="btn bg-custom-gray-light text-white w-50 fw-bold" type="submit">Back</Link>
                            <Link href={"/pickdrop"} className="btn bg-custom-red text-white w-50 fw-bold" type="submit">Continue</Link>
                        </div>
                    </div>

                </form>
                <div className="d-none d-lg-flex col-lg-6 ">
                    <Image src="Frederick_travel_details.svg" alt="Frederick_travel_details" width={500} height={500} className="img-fluid" />
                </div>
            </div>
        </div>

    );
}
