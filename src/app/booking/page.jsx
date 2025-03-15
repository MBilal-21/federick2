"use client";
import Image from "next/image";
import { Check } from 'lucide-react';
import style from './page.module.css';
import { useEffect, useState } from "react";
import Tabs from "@/components/Tabs";
import { useRouter } from "next/navigation";


export default function Booking() {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [wayToConnect, setWayToConnect] = useState('');
    const [errors, setErrors] = useState({});
    const router = useRouter();

  
    useEffect(() => {
        async function fetchToken() {
          const res = await fetch("/api/token?role=guest");
          const data = await res.json();
          console.log(data);
          
          const newData = data.tokenData?.formData.step1 || null;
          if (newData) {
            setFullName(newData.fullName || "");
            setEmail(newData.email || "");
            setPhoneNumber(newData.phoneNumber || "");
            setWayToConnect(newData.wayToConnect || "Email");
          }
          console.log("token data",data);
          
        }
        fetchToken();
      }, []);
// form validation
      function validateForm() {
        let newErrors = {};
        if (!fullName.trim()) newErrors.fullName = "Full Name is required";
        if (!email.trim()) newErrors.email = "Email is required";
        if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = "Enter a valid email address";
        if (!phoneNumber.trim()) newErrors.phoneNumber = "Phone Number is required";
        if (!/^\d+$/.test(phoneNumber)) newErrors.phoneNumber = "Enter a valid phone number";
        if (!wayToConnect.trim()) newErrors.wayToConnect = "Please select a way to connect";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    }
    

    //   form handling submition
      async function handleSubmit(e) {
        e.preventDefault();
        if (!validateForm()) return;
        const step1 = { fullName, email, phoneNumber, wayToConnect };
        // const formData = { fullName, email, phoneNumber, wayToConnect };
        const response= await fetch("/api/token", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({step1}),
        });
        const result = await response.json();
        console.log(result);
        alert(result.message);
        
      if (!response.ok) {
        throw new Error(result.message);
      }
    
        // nextStep(); // Navigate to next form
        router.push("booking/travel-details");
      }

    return (

        <div className="container mt-4 mb-4 ">
            {/* Tabs code start*/}
                <div className="my-3 d-flex flex-nowrap justify-content-start gap-3 scrollbarDiv">
                    <Tabs text="Personal info" active={true} link="/booking" />
                    <Tabs text="Travel Details" active={false} link="/booking/travel-details" />
                    <Tabs text="Pickup & Drop-off" active={false} link="/booking/pickdrop" />
                    <Tabs text="Choose a ride" active={false} link="/booking/select-car" />
                    <Tabs text="Comments" active={false} link="/booking/additional" />
                </div>
            {/* Tabs code end*/}
            {/* progress code for lg-screen start */}
            <div className="d-none d-lg-flex justify-content-start gap-3">
                <div className="d-flex gap-3 justify-content-center align-items-center"><div className="bg-custom-red rounded-circle text-center" style={{ width: "24px", height: "24px" }}> <Check color="white" size={16} /><span className="text-white d-none">1</span></div> <hr className="bg-custom-red border-0 opacity-100" style={{ width: "130px", height: "2px" }} /> </div>
                <div className="d-flex gap-3 justify-content-center align-items-center"><div className="bg-custom-gray-light rounded-circle text-center" style={{ width: "24px", height: "24px" }}> <Check color="white" size={16} className="d-none" /><span className="text-white">2</span></div> <hr className="bg-custom-gray-light border-0 opacity-100" style={{ width: "130px", height: "2px" }} /> </div>
                <div className="d-flex gap-3 justify-content-center align-items-center"><div className="bg-custom-gray-light rounded-circle text-center" style={{ width: "24px", height: "24px" }}> <Check color="white" size={16} className="d-none" /><span className="text-white">3</span></div> <hr className="bg-custom-gray-light border-0 opacity-100" style={{ width: "130px", height: "2px" }} /> </div>
                <div className="d-flex gap-3 justify-content-center align-items-center"><div className="bg-custom-gray-light rounded-circle text-center" style={{ width: "24px", height: "24px" }}> <Check color="white" size={16} className="d-none" /><span className="text-white">4</span></div> <hr className="bg-custom-gray-light border-0 opacity-100" style={{ width: "130px", height: "2px" }} /> </div>
                <div className="d-flex gap-3 justify-content-center align-items-center"><div className="bg-custom-gray-light rounded-circle text-center" style={{ width: "24px", height: "24px" }}> <Check color="white" size={16} className="d-none" /><span className="text-white">5</span></div>  </div>
            </div>
            {/* progress code for lg-screen end */}
            <div className="row justify-content-center rounded">
                <form onSubmit={handleSubmit} className="col-lg-6 p-sm-4" >
                    {/* form heading start */}
                    <div className="d-flex justify-content-between full-width-bg pt-4 pb-2 mb-2 bg-custom-gray">
                        <div>
                            <h2 className="font-size-16 text-custom-gray-blue">Booking A Service</h2>
                            <p className="fw-bold font-size-24 text-custom-gray-dark">Personal <span className="d-inline d-lg-none">Info</span> <span className="d-none d-lg-inline">Information</span></p>
                        </div>
                        <div className="d-lg-none d-flex justify-content-center align-items-center " >
                            <div className={style.circle}>
                                <span className={style.text}>1/5</span>
                            </div>
                        </div>
                    </div>
                     {/* form heading end */}
                    <div className="">
                        <div className="mb-3 font-size-14 ">
                            <label htmlFor="fullName" className="form-label fw-bold">
                                Full Name
                            </label>
                            <input
                                type="text"
                                className="form-control border-top-0 border-start-0 border-end-0 rounded-0"
                                id="fullName"
                                name="fullName"
                                placeholder="Full Name"
                                value={fullName}
                                onChange={(e) => setFullName(e.target.value)}
                            />
                            {errors.fullName && <small className="text-danger">{errors.fullName}</small>}
                        </div>
                       {/* email address */}
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
                            {errors.email && <small className="text-danger">{errors.email}</small>}
                        </div>
                       {/* phone Number */}
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
                            {errors.phoneNumber && <small className="text-danger">{errors.phoneNumber}</small>}
                        </div>
                        {/* Best way to connect */}
                        <div className="mb-3 font-size-14 ">
                            <label htmlFor="wayToConnect" className="form-label fw-bold">
                                Best way to connect
                            </label>
                            <select name="wayToConnect" id="wayToConnect" value={wayToConnect} className="pointer form-select  border-top-0 border-start-0 border-end-0 rounded-0" onChange={(e) => { setWayToConnect(e.target.value) }}>
                                <option value="" >Select...</option>
                                <option value="email" >Email</option>
                                <option value="phone">Phone Number</option>
                            </select>
                            {errors.wayToConnect && <small className="text-danger">{errors.wayToConnect}</small>}
                        </div>
                    </div>
                    <div className="py-4">
                        <div className="d-flex justify-content-between gap-3">
                            <button  className="btn bg-custom-red text-white w-50 fw-bold" type="submit">Continue</button>
                        </div>
                    </div>

                </form>
                {/* image part */}
                <div className="d-none d-lg-flex col-lg-6 ">
                    <Image src="/frederick_signup.svg" alt="frederick_signup" width={500} height={500} className="img-fluid" />
                </div>
            </div>
        </div>

    );
}
