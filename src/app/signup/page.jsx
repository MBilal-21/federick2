"use client";
import Image from "next/image";
import { Check } from "lucide-react";
import style from "./page.module.css";
import { useState } from "react";
import Link from "next/link";

export default function Signup() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [wayToConnect, setWayToConnect] = useState("");

  // Error states
  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    password: "",
  });

  const validateForm = () => {
    let newErrors = { firstName: "", lastName: "", email: "", phoneNumber: "", password: "" };
    let isValid = true;

    // First Name validation
    if (!firstName.trim()) {
      newErrors.firstName = "First name is required";
      isValid = false;
    }

    // Last Name validation
    if (!lastName.trim()) {
      newErrors.lastName = "Last name is required";
      isValid = false;
    }

    // Email validation (checking format)
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!email.trim()) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!emailPattern.test(email)) {
      newErrors.email = "Invalid email format";
      isValid = false;
    }

    // Phone Number validation (ensuring only numbers and proper length)
    const phonePattern = /^[0-9]{10}$/;
    if (!phoneNumber.trim()) {
      newErrors.phoneNumber = "Phone number is required";
      isValid = false;
    } else if (!phonePattern.test(phoneNumber)) {
      newErrors.phoneNumber = "Invalid phone number (10 digits required)";
      isValid = false;
    }

    // Password validation (minimum 6 characters)
    if (!password.trim()) {
      newErrors.password = "Password is required";
      isValid = false;
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters long";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("Form submitted successfully", { firstName, lastName, email, phoneNumber, password });
      // Proceed with form submission (API call, etc.)
    }
  };

  return (
    <div className="container mt-4 mb-4 ">
      <div className="row justify-content-center rounded">
        <form onSubmit={handleSubmit} className="col-lg-6 p-sm-4">
          <h2 className="fw-bold font-size-16 text-custom-gray-light">Booking A Service</h2>
          <p className="fw-bold font-size-24 text-custom-gray-dark">Personal Information</p>

          <div className="row">
            <div className="mb-3 font-size-14 col-lg-6">
              <label htmlFor="firstName" className="form-label fw-bold">First Name</label>
              <input
                type="text"
                className={`form-control ${errors.firstName ? "is-invalid" : ""}`}
                id="firstName"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
              {errors.firstName && <div className="invalid-feedback">{errors.firstName}</div>}
            </div>

            <div className="mb-3 font-size-14 col-lg-6">
              <label htmlFor="lastName" className="form-label fw-bold">Last Name</label>
              <input
                type="text"
                className={`form-control ${errors.lastName ? "is-invalid" : ""}`}
                id="lastName"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
              {errors.lastName && <div className="invalid-feedback">{errors.lastName}</div>}
            </div>

            <div className="mb-3 font-size-14 col-lg-6">
              <label htmlFor="email" className="form-label fw-bold">Email address</label>
              <input
                type="email"
                className={`form-control ${errors.email ? "is-invalid" : ""}`}
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {errors.email && <div className="invalid-feedback">{errors.email}</div>}
            </div>

            <div className="mb-3 font-size-14 col-lg-6">
              <label htmlFor="password" className="form-label fw-bold">Password</label>
              <input
                type="password"
                className={`form-control ${errors.password ? "is-invalid" : ""}`}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {errors.password && <div className="invalid-feedback">{errors.password}</div>}
            </div>

            <div className="mb-3 font-size-14 col-lg-6">
              <label htmlFor="phoneNumber" className="form-label fw-bold">Phone Number</label>
              <input
                type="text"
                className={`form-control ${errors.phoneNumber ? "is-invalid" : ""}`}
                id="phoneNumber"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
              {errors.phoneNumber && <div className="invalid-feedback">{errors.phoneNumber}</div>}
            </div>

            <div className="mb-3 font-size-14 col-lg-6 ">
              <label htmlFor="wayToConnect" className="form-label fw-bold">Best way to connect</label>
              <select
                name="wayToConnect"
                id="wayToConnect"
                value={wayToConnect}
                className="form-select"
                onChange={(e) => setWayToConnect(e.target.value)}
              >
                <option value="Email">Email</option>
                <option value="phoneNumber">Phone Number</option>
              </select>
            </div>
          </div>

          <div className="py-4">
            <div className="d-flex justify-content-between gap-3">
              <Link href={"/"} className="btn bg-custom-gray-light text-white w-50 fw-bold" type="submit">Back</Link>
              <Link href={"/welcome-back"} className="btn bg-custom-red text-white w-50 fw-bold" type="submit">Continue</Link>
            </div>
          </div>
        </form>
        <div className="d-none d-lg-flex col-lg-6">
          <Image src="frederick_signup.svg" alt="signup" width={500} height={500} className="img-fluid" />
        </div>
      </div>
    </div>
  );
}
