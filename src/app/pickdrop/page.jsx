"use client";
import Image from "next/image";
import { Check } from 'lucide-react';
import style from './page.module.css'
import { useState } from "react";
import Link from "next/link";
export default function PickDrop() {
    const [pickup, setPickup] = useState('')
    const [dropOff, setDropOff] = useState('')


    const handleSubmit = (e) => {
        e.preventDefault()
        // Handle login logic here
    }

    return (

        <div className="container mt-4 mb-4 ">
            <div className="d-none d-lg-flex justify-content-start gap-3">

                <div className="d-flex gap-3 justify-content-center align-items-center"><div className="bg-custom-red rounded-circle text-center" style={{ width: "24px", height: "24px" }}> <Check color="white" size={16} /><span className="text-white d-none">1</span></div> <hr className="bg-custom-red border-0 opacity-100" style={{ width: "130px", height: "2px" }} /> </div>
                <div className="d-flex gap-3 justify-content-center align-items-center"><div className="bg-custom-red rounded-circle text-center" style={{ width: "24px", height: "24px" }}> <Check color="white" size={16} /><span className="text-white d-none">2</span></div> <hr className="bg-custom-red border-0 opacity-100" style={{ width: "130px", height: "2px" }} /> </div>
                <div className="d-flex gap-3 justify-content-center align-items-center"><div className="bg-custom-red rounded-circle text-center" style={{ width: "24px", height: "24px" }}> <Check color="white" size={16} /><span className="text-white d-none">3</span></div> <hr className="bg-custom-red border-0 opacity-100" style={{ width: "130px", height: "2px" }} /> </div>
                <div className="d-flex gap-3 justify-content-center align-items-center"><div className="bg-custom-gray-light rounded-circle text-center" style={{ width: "24px", height: "24px" }}> <Check color="white" size={16} className="d-none" /><span className="text-white">4</span></div> <hr className="bg-custom-gray-light border-0 opacity-100" style={{ width: "130px", height: "2px" }} /> </div>
                <div className="d-flex gap-3 justify-content-center align-items-center"><div className="bg-custom-gray-light rounded-circle text-center" style={{ width: "24px", height: "24px" }}> <Check color="white" size={16} className="d-none" /><span className="text-white">5</span></div>  </div>
            </div>
            <div className="row justify-content-center rounded">
                <form onSubmit={handleSubmit} className="col-lg-6 p-sm-4" >
                    <div className="d-flex justify-content-between">
                        <div>
                            <h2 className="fw-bold font-size-16 text-custom-gray-light">Booking A Service</h2>
                            <p className="fw-bold font-size-24 text-custom-gray-dark">Pickup & Drop-off</p>
                        </div>
                        {/* <div className="d-flex justify-content-center align-items-center rounded-circle d-lg-none" style={{ width: "36px", height: "36px",border:"3px solid #000000", borderTopColor: "#FF0000" }}>
                             <span>   1/5</span>
                        </div> */}
                        <div className="d-lg-none d-flex justify-content-center align-items-center " >
                            <div className={style.circle}>
                                <span className={style.text}>3/5</span>
                            </div>
                        </div>
                    </div>
                    <div >
                        <div className="mb-3 font-size-14">
                            <label htmlFor="Pickup" className="form-label fw-bold">
                            Pickup Address
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="Pickup"
                                name="Pickup"
                                placeholder="Pickup Address"
                                value={pickup}
                                onChange={(e) => setPickup(e.target.value)}
                            />
                        </div>
                        <div className="mb-3 font-size-14">
                            <label htmlFor="dropOff" className="form-label fw-bold">
                            Drop-off Address
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="dropOff"
                                name="dropOff"
                                placeholder="Drop-off Address"
                                value={dropOff}
                                onChange={(e) => setDropOff(e.target.value)}
                            />
                        </div>
                       
                        
                        {/* <div className="mb-3 font-size-14 col-lg-6 ">
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

                        </div> */}
                    </div>
                    <div className="py-4">
                        <div className="d-flex justify-content-between gap-3">
                            <Link href={"/"} className="btn bg-custom-gray-light text-white w-50 fw-bold" type="submit">Back</Link>
                            <Link href={"/select-car"} className="btn bg-custom-red text-white w-50 fw-bold" type="submit">Continue</Link>
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
