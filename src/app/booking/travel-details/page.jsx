"use client";
import Image from "next/image";
import { Check } from 'lucide-react';
import style from './page.module.css';
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Tabs from "@/components/Tabs";

export default function TravelDetails() {
    const [travelDate, setTravelDate] = useState('');
    const [numberOfBags, setNumberOfBags] = useState('');
    const [numberOfpassengers, setNumberOfpassengers] = useState('');
    const [typeOfReservation, setTypeOfReservation] = useState('');
    const [errors, setErrors] = useState({});
    const router = useRouter();
    const today = new Date().toISOString().slice(0, 16);

    useEffect(() => {
        console.log(today);
        
        async function checkToken() {
            const res = await fetch("/api/token");
            const data = await res.json();
            if (!data.tokenData || !data.tokenData.formData.step1   ) {
                router.push("/booking"); // Redirect if no token
            }
            const newData =  data.tokenData?.formData.step2 || null;
            if (newData) {
                setTravelDate(newData.travelDate || "");
                setNumberOfBags(newData.numberOfBags || "");
                setNumberOfpassengers(newData.numberOfpassengers || "");
                setTypeOfReservation(newData.typeOfReservation || "Email");
            }
        }
        checkToken();
    }, [router]);

    // form validation

    const validateForm = () => {
        let newErrors = {};
        if (!travelDate) newErrors.travelDate = "Travel date is required";
        if (!numberOfBags || isNaN(numberOfBags) || numberOfBags < 0) newErrors.numberOfBags = "Valid number of bags is required";
        if (!numberOfpassengers || isNaN(numberOfpassengers) || numberOfpassengers <= 0) newErrors.numberOfpassengers = "Valid number of passengers is required";
        if (!typeOfReservation.trim()) newErrors.typeOfReservation = "Reservation type is required";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    async function handleSubmit(e) {
        e.preventDefault();
        if (!validateForm()) return;
        const step2 = { travelDate, numberOfBags, numberOfpassengers, typeOfReservation };
        const result = await fetch("/api/token", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({step2}),
        });
        const data = await result.json();
        if (!result.ok) {
            alert(data.message);
            return;
        }
        alert(data.message);
        router.push("/booking/pickdrop");
    }
    return (

        <div className="container mt-4 mb-4 ">
            {/* Tabs code start*/}
            <div className="my-3 d-flex flex-nowrap justify-content-start gap-3 scrollbarDiv">
                <Tabs text="Personal info" active={false} link="/booking" />
                <Tabs text="Travel Details" active={true} link="/booking/travel-details" />
                <Tabs text="Pickup & Drop-off" active={false} link="/booking/pickdrop" />
                <Tabs text="Choose a ride" active={false} link="/booking/select-car" />
                <Tabs text="Comments" active={false} link="/booking/additional" />
            </div>
            {/* Tabs code end*/}
            {/* progress code for lg-screen start */}
            <div className="d-none d-lg-flex justify-content-start gap-3">
                <div className="d-flex gap-3 justify-content-center align-items-center"><div className="bg-custom-red rounded-circle text-center" style={{ width: "24px", height: "24px" }}> <Check color="white" size={16} /><span className="text-white d-none">1</span></div> <hr className="bg-custom-red border-0 opacity-100" style={{ width: "130px", height: "2px" }} /> </div>
                <div className="d-flex gap-3 justify-content-center align-items-center"><div className="bg-custom-red rounded-circle text-center" style={{ width: "24px", height: "24px" }}> <Check color="white" size={16} /><span className="text-white d-none">2</span></div> <hr className="bg-custom-red border-0 opacity-100" style={{ width: "130px", height: "2px" }} /> </div>
                <div className="d-flex gap-3 justify-content-center align-items-center"><div className="bg-custom-gray-light rounded-circle text-center" style={{ width: "24px", height: "24px" }}> <Check color="white" size={16} className="d-none" /><span className="text-white">3</span></div> <hr className="bg-custom-gray-light border-0 opacity-100" style={{ width: "130px", height: "2px" }} /> </div>
                <div className="d-flex gap-3 justify-content-center align-items-center"><div className="bg-custom-gray-light rounded-circle text-center" style={{ width: "24px", height: "24px" }}> <Check color="white" size={16} className="d-none" /><span className="text-white">4</span></div> <hr className="bg-custom-gray-light border-0 opacity-100" style={{ width: "130px", height: "2px" }} /> </div>
                <div className="d-flex gap-3 justify-content-center align-items-center"><div className="bg-custom-gray-light rounded-circle text-center" style={{ width: "24px", height: "24px" }}> <Check color="white" size={16} className="d-none" /><span className="text-white">5</span></div>  </div>
            </div>
            {/* progress code for lg-screen end */}
            <div className="row justify-content-center rounded">
            
                <form onSubmit={handleSubmit} className="col-lg-6 p-sm-4">
                    <div className="mb-3">
                        <label className="form-label">Travel Date</label>
                        <input type="datetime-local" className="form-control" value={travelDate} onChange={(e) => setTravelDate(e.target.value)} min={today}/>
                        {errors.travelDate && <small className="text-danger">{errors.travelDate}</small>}
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Number of Bags</label>
                        <input type="number" className="form-control" value={numberOfBags} onChange={(e) => setNumberOfBags(e.target.value)} />
                        {errors.numberOfBags && <small className="text-danger">{errors.numberOfBags}</small>}
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Number of Passengers</label>
                        <input type="number" className="form-control" value={numberOfpassengers} onChange={(e) => setNumberOfpassengers(e.target.value)} />
                        {errors.numberOfpassengers && <small className="text-danger">{errors.numberOfpassengers}</small>}
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Type of Reservation</label>
                        <select className="form-select" value={typeOfReservation} onChange={(e) => setTypeOfReservation(e.target.value)}>
                            <option value="">Select...</option>
                            <option value="per-hour">Per Hour</option>
                            <option value="per-mile">Per Mile</option>
                        {errors.typeOfReservation && <small className="text-danger">{errors.typeOfReservation}</small>}
                        </select>
                    </div>
                    <div className="py-4 d-flex justify-content-between gap-3">
                        <button type="button" onClick={() => router.back()} className="btn bg-custom-gray-light text-white w-50 fw-bold">Back</button>
                        <button type="submit" className="btn bg-custom-red text-white w-50 fw-bold">Continue</button>
                    </div>
                </form>
            
                <div className="d-none d-lg-flex col-lg-6 ">
                    <Image src="/Frederick_travel_details.svg" alt="Frederick_travel_details" width={500} height={500} className="img-fluid" />
                </div>
            </div>
        </div>

    );
}
