"use client";
import Image from "next/image";
import { Check } from 'lucide-react';
import style from './page.module.css'
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Tabs from "@/components/Tabs";

export default function WelcomeBack() {
    const [selectCar, setSelectCar] = useState('');
    const [wayToConnect, setWayToConnect] = useState('');
    const router = useRouter();

    const handleSubmit = (e) => {
        e.preventDefault()
        // Handle login logic here
    }

    return (

        <div className="container mt-4 mb-4 ">
            {/* Tabs code start*/}
            <div className="my-3 d-flex flex-nowrap justify-content-start gap-3 scrollbarDiv">
                <Tabs text="Personal info" active={false} link="/welcome-back" />
                <Tabs text="Travel Details" active={false} link="/travel-details" />
                <Tabs text="Pickup & Drop-off" active={false} link="/pickdrop" />
                <Tabs text="Choose a ride" active={true} link="/select-car" />
                <Tabs text="Comments" active={false} link="/additional" />
            </div>
            {/* Tabs code end*/}
            {/* progress code for lg-screen start */}
            <div className="d-none d-lg-flex justify-content-start gap-3">
                <div className="d-flex gap-3 justify-content-center align-items-center"><div className="bg-custom-red rounded-circle text-center" style={{ width: "24px", height: "24px" }}> <Check color="white" size={16} /><span className="text-white d-none">1</span></div> <hr className="bg-custom-red border-0 opacity-100" style={{ width: "130px", height: "2px" }} /> </div>
                <div className="d-flex gap-3 justify-content-center align-items-center"><div className="bg-custom-red rounded-circle text-center" style={{ width: "24px", height: "24px" }}> <Check color="white" size={16} /><span className="text-white d-none">2</span></div> <hr className="bg-custom-red border-0 opacity-100" style={{ width: "130px", height: "2px" }} /> </div>
                <div className="d-flex gap-3 justify-content-center align-items-center"><div className="bg-custom-red rounded-circle text-center" style={{ width: "24px", height: "24px" }}> <Check color="white" size={16} /><span className="text-white d-none">3</span></div> <hr className="bg-custom-red border-0 opacity-100" style={{ width: "130px", height: "2px" }} /> </div>
                <div className="d-flex gap-3 justify-content-center align-items-center"><div className="bg-custom-red rounded-circle text-center" style={{ width: "24px", height: "24px" }}> <Check color="white" size={16} /><span className="text-white d-none">4</span></div> <hr className="bg-custom-red border-0 opacity-100" style={{ width: "130px", height: "2px" }} /> </div>
                <div className="d-flex gap-3 justify-content-center align-items-center"><div className="bg-custom-gray-light rounded-circle text-center" style={{ width: "24px", height: "24px" }}> <Check color="white" size={16} className="d-none" /><span className="text-white">5</span></div>  </div>
            </div>
            {/* progress code for lg-screen end */}
            <div className="row justify-content-center rounded">
                <form onSubmit={handleSubmit} className="col-lg-6 p-sm-4" >
                    <div className="d-flex justify-content-between full-width-bg pt-4 pb-2 mb-2 bg-custom-gray">
                        <div>
                            <h2 className="font-size-16 text-custom-gray-blue">Booking A Service</h2>
                            <p className="fw-bold font-size-24 text-custom-gray-dark">Choose a ride</p>
                        </div>
                        {/* <div className="d-flex justify-content-center align-items-center rounded-circle d-lg-none" style={{ width: "36px", height: "36px",border:"3px solid #000000", borderTopColor: "#FF0000" }}>
                             <span>   1/5</span>
                        </div> */}
                        <div className="d-lg-none d-flex justify-content-center align-items-center " >
                            <div className={style.circle}>
                                <span className={style.text}>4/5</span>
                            </div>
                        </div>
                    </div>
                    <div className="">
                        <div className="border border-1 rounded p-3 mb-3 d-flex justify-content-start align-items-center gap-3">
                            <div>
                                <Image src="/cars/frederick_luxury_sedan_crysler.svg" alt="frederick luxury sedan crysler" width={80} height={40} className="img-fluid car-image" style={{mixBlendMode:"darken"}} />
                            </div>
                            <div className="font-weight-500">
                                Luxury Sedan Crysler
                            </div>
                        </div>
                        <div className="border border-1 border-black rounded shadow-sm bg-custom-gray p-3 mb-3 ">
                            <div className="d-flex justify-content-start align-items-center gap-3">
                                <div>
                                    <Image src="/cars/frederick_suv_.svg" alt="frederick suv" width={120} height={80} className="img-fluid car-image" style={{mixBlendMode:"darken"}} />
                                </div>
                                <div className="font-size-16">
                                    <div className="font-weight-500"> SUV</div>
                                    <div className="font-weight-400">6 seats / Bags 6</div>
                                </div>
                            </div>
                            <hr />
                            <div className="d-flex justify-content-between align-items-center gap-3 font-size-12">
                                <div className="font-weight-600">Quote:</div>
                                <div className="font-weight-600">
                                    $ 3.50 <span className="text-custom-red">/Mile</span><span className="text-custom-gray-light px-1">|</span>
                                    $ 3.50 <span className="text-custom-red">/Hrs</span>
                                </div>
                            </div>
                        </div>
                        {/* denali */}
                        <div className="border border-1 rounded p-3 mb-3 ">
                            <div className="d-flex justify-content-start align-items-center gap-3">
                                <div>
                                    <Image src="/cars/frederick_denali.svg" alt="frederick denali" width={80} height={40} className="img-fluid car-image" style={{mixBlendMode:"darken"}} />
                                </div>
                                <div className="font-size-16">
                                    <div className="font-weight-500">Denali</div>
                                    <div className="font-weight-400 d-none">6 seats / Bags 6</div>
                                </div>
                            </div>
                            <hr className="d-none" />
                            <div className="d-flex justify-content-between align-items-center gap-3 font-size-12 d-none">
                                <div className="font-weight-600">Quote:</div>
                                <div className="font-weight-600">
                                    $ 3.50 <span className="text-custom-red">/Mile</span><span className="text-custom-gray-light px-1">|</span>
                                    $ 3.50 <span className="text-custom-red">/Hrs</span>
                                </div>
                            </div>
                        </div>
                        
                        <div className="mb-3 p-2">
                            <p className="font-size-14 font-weight-500 text-black mb-1">Estimated Cost of the travel</p>
                            <p className="font-size-14 font-weight-500 text-custom-red">Tolls, Tips and Rush hours are not included in this estimate cost</p>
                            <div className="border  border-secondary rounded px-2 py-2"><span className="text-custom-red">$ </span>253.00</div>
                        </div>
                    </div>
                    <div className="py-4">
                        <div className="d-flex justify-content-between gap-3">
                        <button type="button" onClick={() => router.back()} className="btn bg-custom-gray-light text-white w-50 fw-bold">
                Back
              </button>
                            <Link href={"/additional"} className="btn bg-custom-red text-white w-50 fw-bold" type="submit">Continue</Link>
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
