"use client";
import Image from "next/image";
import {useEffect, useReducer } from "react";
import { Check } from 'lucide-react';
import style from './page.module.css';
import { useRouter } from "next/navigation";
import {useSession, signIn } from "next-auth/react";
import Loading from "@/components/Loading";



// Initial state for form fields and errors
const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  phoneNumber: "",
  password: "",
  wayToConnect: "Email",
  errors: {},
};

// Reducer function to update state
const formReducer = (state, action) => {
  switch (action.type) {
    case "SET_FIELD":
      return { ...state, [action.field]: action.value, errors: { ...state.errors, [action.field]: "" } };
    case "SET_ERRORS":
      return { ...state, errors: action.errors };
    case "RESET_FORM":
      return initialState;
    default:
      return state;
  }
};

export default function Signup() {
  const {  status } = useSession();
  const [state, dispatch] = useReducer(formReducer, initialState);
  const router = useRouter();
  const redirectUser = (path) => router.push(path);

  useEffect(() => {
    console.log(status);
    
    if (status === "authenticated") {
      redirectUser("/booking"); // Redirect to /booking page
    }
  }, [status, router]);

  if (status === "loading") return <Loading/>; // Show a loading state
 

  const validateForm = () => {
    let errors = {};

    // First Name validation
    if (!state.firstName.trim()) errors.firstName = "First name is required";

    // Last Name validation
    if (!state.lastName.trim()) errors.lastName = "Last name is required";

    // Email validation
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!state.email.trim()) errors.email = "Email is required";
    else if (!emailPattern.test(state.email)) errors.email = "Invalid email format";

    // Phone Number validation
    const phonePattern = /^\+?[0-9]{7,15}$/;

    if (!state.phoneNumber.trim()) {
      errors.phoneNumber = "Phone number is required";
    } else if (!phonePattern.test(state.phoneNumber)) {
      errors.phoneNumber = "Invalid phone number (should be 7-15 digits, optional +)";
    }

    // Password validation
    if (!state.password.trim()) errors.password = "Password is required";
    else if (state.password.length < 6) errors.password = "Password must be at least 6 characters long";

    dispatch({ type: "SET_ERRORS", errors });
    return Object.keys(errors).length === 0;
  };

  // --------------------------------------------------------------------------------------------
const handleSubmit = async (e) => {
  e.preventDefault();

  if (validateForm()) {
    try {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          first_name: state.firstName,
          last_name: state.lastName,
          email: state.email,
          phone: state.phoneNumber,
          password: state.password,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message);
      }

      // console.log("User registered successfully:", result);
      alert("Signup successful!");

      // Reset form
      dispatch({ type: "RESET_FORM" });

      // 🔹 Automatically log in the user
      const loginResult = await signIn("credentials", {
        email: result.email, // Email from signup API
        password: state.password,
        redirect: false, // Avoid page refresh
      });

      if (loginResult?.error) {
        throw new Error(loginResult.error);
      }

      // Redirect to /booking if login is successful
      redirectUser("/booking");
      
    } catch (error) {
      console.error("Signup error:", error.message);
      alert(error.message);
    }
  }
};
  // --------------------------------------------------------------------------------------------

  return (
    <div className="container mt-4 mb-4">
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
        <form onSubmit={handleSubmit} className="col-lg-6 p-sm-4">
          <div className="d-flex justify-content-between full-width-bg pt-4 pb-2 mb-2 bg-custom-gray">
            <div>
              <h2 className="font-size-16 text-custom-gray-blue">Booking A Service</h2>
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
         

          <div className="row">
            {[
              { label: "First Name", id: "firstName", type: "text" },
              { label: "Last Name", id: "lastName", type: "text" },
              { label: "Email", id: "email", type: "email" },
              { label: "Password", id: "password", type: "password" },
              { label: "Phone Number", id: "phoneNumber", type: "text" },
            ].map(({ label, id, type }) => (
              <div key={id} className="mb-3 font-size-14 col-lg-6">
                <label htmlFor={id} className="form-label fw-bold">{label}</label>
                <input
                  type={type}
                  className={`form-control ${state.errors[id] ? "is-invalid" : ""}`}
                  id={id}
                  value={state[id]}
                  onChange={(e) => dispatch({ type: "SET_FIELD", field: id, value: e.target.value })}
                />
                {state.errors[id] && <div className="invalid-feedback">{state.errors[id]}</div>}
              </div>
            ))}

            {/* Dropdown Selection */}
            <div className="mb-3 font-size-14 col-lg-6">
              <label htmlFor="wayToConnect" className="form-label fw-bold">Best way to connect</label>
              <select
                id="wayToConnect"
                className="form-select"
                value={state.wayToConnect}
                onChange={(e) => dispatch({ type: "SET_FIELD", field: "wayToConnect", value: e.target.value })}
              >
                <option value="email">Email</option>
                <option value="phone">Phone Number</option>
              </select>
            </div>
          </div>

          {/* Buttons */}
          <div className="py-4">
            <div className="d-flex justify-content-between gap-3">
              <button type="button" onClick={() => router.back()} className="btn bg-custom-gray-light text-white w-50 fw-bold">
                Back
              </button>
              <button className="btn bg-custom-red text-white w-50 fw-bold" type="submit">
                Continue
              </button>
            </div>
          </div>
        </form>

        {/* Image Section */}
        <div className="d-none d-lg-flex col-lg-6">
          <Image src="/frederick_signup.svg" alt="signup" width={500} height={500} className="img-fluid" />
        </div>
      </div>
    </div>
  );
}



// "use client";
// import Image from "next/image";
// import { useState } from "react";
// import Link from "next/link";
// import { useRouter } from "next/navigation";


// export default function Signup() {
//   const [firstName, setFirstName] = useState("");
//   const [lastName, setLastName] = useState("");
//   const [email, setEmail] = useState("");
//   const [phoneNumber, setPhoneNumber] = useState("");
//   const [password, setPassword] = useState("");
//   const [wayToConnect, setWayToConnect] = useState("");
//   const router = useRouter();

//   // Error states
//   const [errors, setErrors] = useState({
//     firstName: "",
//     lastName: "",
//     email: "",
//     phoneNumber: "",
//     password: "",
//   });

//   const validateForm = () => {
//     let newErrors = { firstName: "", lastName: "", email: "", phoneNumber: "", password: "" };
//     let isValid = true;

//     // First Name validation
//     if (!firstName.trim()) {
//       newErrors.firstName = "First name is required";
//       isValid = false;
//     }

//     // Last Name validation
//     if (!lastName.trim()) {
//       newErrors.lastName = "Last name is required";
//       isValid = false;
//     }

//     // Email validation (checking format)
//     const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
//     if (!email.trim()) {
//       newErrors.email = "Email is required";
//       isValid = false;
//     } else if (!emailPattern.test(email)) {
//       newErrors.email = "Invalid email format";
//       isValid = false;
//     }

//     // Phone Number validation (ensuring only numbers and proper length)
//     // const phonePattern = /^[0-9]{10}$/;
//     const phonePattern = /^\+?[1-9]\d{1,14}$/;
//     if (!phoneNumber.trim()) {
//       newErrors.phoneNumber = "Phone number is required";
//       isValid = false;
//     } else if (!phonePattern.test(phoneNumber)) {
//       newErrors.phoneNumber = "Invalid phone number (10 digits required)";
//       isValid = false;
//     }

//     // Password validation (minimum 6 characters)
//     if (!password.trim()) {
//       newErrors.password = "Password is required";
//       isValid = false;
//     } else if (password.length < 6) {
//       newErrors.password = "Password must be at least 6 characters long";
//       isValid = false;
//     }

//     setErrors(newErrors);
//     return isValid;
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (validateForm()) {
//       console.log("Form submitted successfully", { firstName, lastName, email, phoneNumber, password });
//       // Proceed with form submission (API call, etc.)
//     }
//   };

//   return (
//     <div className="container mt-4 mb-4 ">
//       <div className="row justify-content-center rounded">
//         <form onSubmit={handleSubmit} className="col-lg-6 p-sm-4">
//           <h2 className="fw-bold font-size-16 text-custom-gray-light">Booking A Service</h2>
//           <p className="fw-bold font-size-24 text-custom-gray-dark">Personal Information</p>

//           <div className="row">
//             <div className="mb-3 font-size-14 col-lg-6">
//               <label htmlFor="firstName" className="form-label fw-bold">First Name</label>
//               <input
//                 type="text"
//                 className={`form-control ${errors.firstName ? "is-invalid" : ""}`}
//                 id="firstName"
//                 value={firstName}
//                 onChange={(e) => setFirstName(e.target.value)}
//               />
//               {errors.firstName && <div className="invalid-feedback">{errors.firstName}</div>}
//             </div>

//             <div className="mb-3 font-size-14 col-lg-6">
//               <label htmlFor="lastName" className="form-label fw-bold">Last Name</label>
//               <input
//                 type="text"
//                 className={`form-control ${errors.lastName ? "is-invalid" : ""}`}
//                 id="lastName"
//                 value={lastName}
//                 onChange={(e) => setLastName(e.target.value)}
//               />
//               {errors.lastName && <div className="invalid-feedback">{errors.lastName}</div>}
//             </div>

//             <div className="mb-3 font-size-14 col-lg-6">
//               <label htmlFor="email" className="form-label fw-bold">Email address</label>
//               <input
//                 type="email"
//                 className={`form-control ${errors.email ? "is-invalid" : ""}`}
//                 id="email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//               />
//               {errors.email && <div className="invalid-feedback">{errors.email}</div>}
//             </div>

//             <div className="mb-3 font-size-14 col-lg-6">
//               <label htmlFor="password" className="form-label fw-bold">Password</label>
//               <input
//                 type="password"
//                 className={`form-control ${errors.password ? "is-invalid" : ""}`}
//                 id="password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//               />
//               {errors.password && <div className="invalid-feedback">{errors.password}</div>}
//             </div>

//             <div className="mb-3 font-size-14 col-lg-6">
//               <label htmlFor="phoneNumber" className="form-label fw-bold">Phone Number</label>
//               <input
//                 type="text"
//                 className={`form-control ${errors.phoneNumber ? "is-invalid" : ""}`}
//                 id="phoneNumber"
//                 value={phoneNumber}
//                 onChange={(e) => setPhoneNumber(e.target.value)}
//               />
//               {errors.phoneNumber && <div className="invalid-feedback">{errors.phoneNumber}</div>}
//             </div>

//             <div className="mb-3 font-size-14 col-lg-6 ">
//               <label htmlFor="wayToConnect" className="form-label fw-bold">Best way to connect</label>
//               <select
//                 name="wayToConnect"
//                 id="wayToConnect"
//                 value={wayToConnect}
//                 className="form-select"
//                 onChange={(e) => setWayToConnect(e.target.value)}
//               >
//                 <option value="Email">Email</option>
//                 <option value="phoneNumber">Phone Number</option>
//               </select>
//             </div>
//           </div>

//           <div className="py-4">
//             <div className="d-flex justify-content-between gap-3">
//               {/* <Link href={"/"} className="btn bg-custom-gray-light text-white w-50 fw-bold" >Back</Link> */}
//               <button type="button" onClick={() => router.back()} className="btn bg-custom-gray-light text-white w-50 fw-bold">Back</button>

//               <button className="btn bg-custom-red text-white w-50 fw-bold" type="submit">Continue</button>
//             </div>
//           </div>
//         </form>
//         <div className="d-none d-lg-flex col-lg-6">
//           <Image src="frederick_signup.svg" alt="signup" width={500} height={500} className="img-fluid" />
//         </div>
//       </div>
//     </div>
//   );
// }
