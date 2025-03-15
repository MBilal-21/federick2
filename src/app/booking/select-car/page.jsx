"use client";
import Image from "next/image";
import { Check } from 'lucide-react';
import style from './page.module.css'
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Tabs from "@/components/Tabs";

export default function CarSlection() {
    const [rides, setRides] = useState([]);
    const [carId, setCarId] = useState(null);
    const router = useRouter();
    const outerClasses = "border-black shadow-sm bg-custom-gray";
    const displayNone = "d-none";

    useEffect(() => {
        async function fetchRides() {
            const res = await fetch("/api/the-rides");
            const data = await res.json();
            console.log(data);
            setRides(data.rides);
        //    if (carId===null) setCarId(data.rides[0].id);
            
        }
        async function fetchToken() {
            const res = await fetch("/api/token");
            const data = await res.json();
            if (!data.tokenData || !data.tokenData.formData.step1   ) {
                router.push("/booking"); // Redirect if no token
            } else if (!data.tokenData.formData.step2) {
                router.push("/booking/travel-details"); // Redirect if no token\
            } else if (!data.tokenData.formData.step3) {
                router.push("/booking/pickdrop"); // Redirect if no token\
            }
            const newData =  data.tokenData?.formData.step4 || null;
            if (newData) {
              setCarId(newData.carId || null);
            }
            console.log(data.tokenData.formData);
            console.log(data.tokenData);
            
          }
          fetchRides();
          fetchToken();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(carId === null) {
            alert("Please select a car to continue");
            return;
        }
        const step4 = { carId};
        const response= await fetch("/api/token", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({step4}),
        });
        const result = await response.json();
        console.log(result);
        alert(result.message);
        
      if (!response.ok) {
        throw new Error(result.message);
      }
    
        // Navigate to next form
        router.push("/booking/additional");
      
    };

    return (

        <div className="container mt-4 mb-4 ">
            {/* Tabs code start*/}
            <div className="my-3 d-flex flex-nowrap justify-content-start gap-3 scrollbarDiv">
                <Tabs text="Personal info" active={false} link="/booking" />
                <Tabs text="Travel Details" active={false} link="/booking/travel-details" />
                <Tabs text="Pickup & Drop-off" active={false} link="/booking/pickdrop" />
                <Tabs text="Choose a ride" active={true} link="/booking/select-car" />
                <Tabs text="Comments" active={false} link="/booking/additional" />
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
                    {/* cars slection start*/}
                    <div className="rides-list">
                      
                        {/* <div className={`border border-1 rounded p-3 mb-3 + ${carId && outerClasses}`}>
                            <div className="d-flex justify-content-start align-items-center gap-3">
                                <div>
                                    <Image src="/cars/frederick_denali.svg" alt="frederick denali" width={80} height={40} className="img-fluid car-image" style={{ mixBlendMode: "darken" }} />
                                </div>
                                <div className="font-size-16">
                                    <div className="font-weight-500">Denali</div>
                                    <div className={`font-weight-400 ${!carId && displayNone}`}>6 seats / Bags 6</div>
                                </div>
                            </div>
                            <hr className={`${!carId && displayNone}`} />
                            <div className={`d-flex justify-content-between align-items-center gap-3 font-size-12 ${!carId && displayNone}`}>
                                <div className="font-weight-600">Quote:</div>
                                <div className="font-weight-600">
                                    $ 3.50 <span className="text-custom-red">/Mile</span><span className="text-custom-gray-light px-1">|</span>
                                    $ 3.50 <span className="text-custom-red">/Hrs</span>
                                </div>
                            </div>
                        </div> */}
                        {rides.map((ride,index) => {

                            return <div key={index} className={`border border-1 rounded p-3 mb-3 + ${carId === ride.id && outerClasses}`} onClick={() => setCarId(ride.id)}>
                                    <div className="d-flex justify-content-start align-items-center gap-3">
                                        <div>
                                            <Image src={`/cars/${"frederick_denali.svg"}`} alt="frederick denali" width={80} height={40} className="img-fluid car-image" style={{ mixBlendMode: "darken" }} />
                                        </div>
                                        <div className="font-size-16">
                                            <div className="font-weight-500">{ride?.name}</div>
                                            <div className={`font-weight-400 ${!(carId === ride.id) && displayNone}`}>{ride?.seats + " seats / Bags "+ ride?.bags}</div>
                                        </div>
                                    </div>
                                    <hr className={`${!(carId === ride.id) && displayNone}`} />
                                    <div className={`d-flex justify-content-between align-items-center gap-3 font-size-12 ${!(carId === ride?.id) && displayNone}`}>
                                        <div className="font-weight-600">Quote: <span className="font-weight-400">{ride?.quote}</span></div>
                                        <div className="font-weight-600">
                                            {"$ "+ride?.price_per_mile} <span className="text-custom-red">/Mile</span><span className="text-custom-gray-light px-1">|</span>
                                            {"$ "+ride?.price_per_hour} <span className="text-custom-red">/Hrs</span>
                                        </div>
                                    </div>
                                </div>
                           
                        })}

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
                            <button className="btn bg-custom-red text-white w-50 fw-bold" type="submit">Continue</button>
                        </div>
                    </div>

                </form>
                <div className="d-none d-lg-flex col-lg-6 ">
                    <Image src="/frederick_signup.svg" alt="login" width={500} height={500} className="img-fluid" />
                </div>
            </div>
        </div>

    );
}
