"use client";
import Image from "next/image";
import { Check } from 'lucide-react';
import style from './page.module.css'
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Tabs from "@/components/Tabs";


export default function PickDrop() {
    const [pickup, setPickup] = useState('');
    const [dropOff, setDropOff] = useState('');
    const [errors, setErrors] = useState({});
    const router = useRouter();

    // use effect
    useEffect(() => {
            async function fetchToken() {
              const res = await fetch("/api/token");
              const data = await res.json();
              if (!data.tokenData || !data.tokenData.formData.step1   ) {
                router.push("/booking"); // Redirect if no token
            } else if (!data.tokenData.formData.step2) {
                router.push("/booking/travel-details"); // Redirect if no token\
            }
            const newData =  data.tokenData?.formData.step3 || null;
              if (newData) {
                setPickup(newData.pickup || "");
                setDropOff(newData.dropOff || "");
               
              }
              console.log(data.tokenData.formData);
              console.log(data.tokenData);
              
            }
            fetchToken();
          }, []);

    // form validation
    function validateForm() {
        let newErrors = {};
        if (!pickup.trim()) newErrors.pickup = "Pickup Address is required";
        if (!dropOff.trim()) newErrors.dropOff = "Drop-off Address is required";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    }

    // handling form submition
    async function handleSubmit(e) {
        e.preventDefault();
        if (!validateForm()) return;
        const step3 = { pickup, dropOff};
        const response= await fetch("/api/token", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({step3}),
        });
        const result = await response.json();
        console.log(result);
        alert(result.message);
        
      if (!response.ok) {
        throw new Error(result.message);
      }
    
        // Navigate to next form
        router.push("/booking/select-car");
      }

    return (

        <div className="container mt-4 mb-4 ">
            {/* Tabs code start*/}
            <div className="my-3 d-flex flex-nowrap justify-content-start gap-3 scrollbarDiv">
                <Tabs text="Personal info" active={false} link="/booking" />
                <Tabs text="Travel Details" active={false} link="/booking/travel-details" />
                <Tabs text="Pickup & Drop-off" active={true} link="/booking/pickdrop" />
                <Tabs text="Choose a ride" active={false} link="/booking/select-car" />
                <Tabs text="Comments" active={false} link="/booking/additional" />
            </div>
            {/* Tabs code end*/}
            {/* progress code for lg-screen start */}
            <div className="d-none d-lg-flex justify-content-start gap-3">
                <div className="d-flex gap-3 justify-content-center align-items-center"><div className="bg-custom-red rounded-circle text-center" style={{ width: "24px", height: "24px" }}> <Check color="white" size={16} /><span className="text-white d-none">1</span></div> <hr className="bg-custom-red border-0 opacity-100" style={{ width: "130px", height: "2px" }} /> </div>
                <div className="d-flex gap-3 justify-content-center align-items-center"><div className="bg-custom-red rounded-circle text-center" style={{ width: "24px", height: "24px" }}> <Check color="white" size={16} /><span className="text-white d-none">2</span></div> <hr className="bg-custom-red border-0 opacity-100" style={{ width: "130px", height: "2px" }} /> </div>
                <div className="d-flex gap-3 justify-content-center align-items-center"><div className="bg-custom-red rounded-circle text-center" style={{ width: "24px", height: "24px" }}> <Check color="white" size={16} /><span className="text-white d-none">3</span></div> <hr className="bg-custom-red border-0 opacity-100" style={{ width: "130px", height: "2px" }} /> </div>
                <div className="d-flex gap-3 justify-content-center align-items-center"><div className="bg-custom-gray-light rounded-circle text-center" style={{ width: "24px", height: "24px" }}> <Check color="white" size={16} className="d-none" /><span className="text-white">4</span></div> <hr className="bg-custom-gray-light border-0 opacity-100" style={{ width: "130px", height: "2px" }} /> </div>
                <div className="d-flex gap-3 justify-content-center align-items-center"><div className="bg-custom-gray-light rounded-circle text-center" style={{ width: "24px", height: "24px" }}> <Check color="white" size={16} className="d-none" /><span className="text-white">5</span></div>  </div>
            </div>
            {/* progress code for lg-screen end */}
            <div className="row justify-content-center rounded">
                <form onSubmit={handleSubmit} className="col-lg-6 p-sm-4" >
                    <div className="d-flex justify-content-between full-width-bg pt-4 pb-2 mb-2 bg-custom-gray">
                        <div>
                            <h2 className="font-size-16 text-custom-gray-blue">Booking A Service</h2>
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
                            {errors.pickup && <small className="text-danger">{errors.pickup}</small>}
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
                            {errors.dropOff && <small className="text-danger">{errors.dropOff}</small>}
                        </div>
                    </div>
                    {/* buttons */}
                    <div className="py-4">
                        <div className="d-flex justify-content-between gap-3">
                            <button type="button" onClick={() => router.back()} className="btn bg-custom-gray-light text-white w-50 fw-bold">Back</button>
                            <button className="btn bg-custom-red text-white w-50 fw-bold" type="submit" >Continue</button>
                        </div>
                    </div>

                </form>
                {/* image part */}
                <div className="d-none d-lg-flex col-lg-6 ">
                    <Image src="/Frederick_travel_details.svg" alt="Frederick_travel_details" width={500} height={500} className="img-fluid" />
                </div>
            </div>
        </div>

    );
}
