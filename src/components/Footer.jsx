"use client";

// import Link from "next/link";
import Image from "next/image";
import { Facebook, Twitter, Dribbble, ChevronsRight } from "lucide-react";
import Link from "next/link";
import style from './footer.module.css';

export default function Footer() {
    return (
        <footer className="footer-bg-color footer-text-color font-size-12 pt-5">
            <div className="container">
                <div className="row justify-content-center">
                    {/* Logo & Description */}
                    <div className="col-md-3 me-2">
                        <div className="d-flex align-items-center mb-3">
                            <Image
                                src="/frederick_logo.svg"
                                alt="Frederick Sedan Service"
                                width={146}
                                height={65}
                                className="img-fluid me-2"
                            />
                           
                            {/* <h5 className="fw-bold text-danger">FREDERICK SEDAN SERVICE</h5> */}
                        </div>
                        <p className="text-light">
                            Highly motivated to bring you the highest quality of service. We
                            are serving Frederick County Maryland for more than 10 years.
                        </p>
                        <div className="d-flex align-items-center">
                            <span className="fw-bold me-2">Follow Us:</span>
                            <Link href={"#"}><Facebook className={`text-white nav-link me-2 ${style.link}`} size={14} /></Link>
                            <Link href={"#"}><Twitter className={`text-white nav-link me-2 ${style.link}`} size={14} /></Link>
                            {/* <Link href={"#"}><Pinterest className={`text-white nav-link me-2 ${style.link}`} size={14} /></Link> */}
                            <Link href={"#"}><Dribbble className={`text-white nav-link me-2 ${style.link}`} size={14} /></Link>
                        </div>
                    </div>

                    {/* Our Services */}
                    <div className="col-md-3">
                        <h5 className="fw-bold font-size-14 mb-3">Our Services</h5>
                        <ul className="list-unstyled">
                            <li><Link className={`d-flex align-items-start gap-2 mb-2 text-white nav-link ${style.link}`} href={"#"}><ChevronsRight size={14}/> <span>Ground Transportation Service</span></Link></li>
                            <li><Link className={`d-flex align-items-start gap-2 mb-2 text-white nav-link ${style.link}`} href={"#"}><ChevronsRight size={14}/> <span>Corporate and Executive Transportation</span></Link></li>
                            <li><Link className={`d-flex align-items-start gap-2 mb-2 text-white nav-link ${style.link}`} href={"#"}><ChevronsRight size={14}/> <span>Airport Transportation Service</span></Link></li>
                            <li><Link className={`d-flex align-items-start gap-2 mb-2 text-white nav-link ${style.link}`} href={"#"}><ChevronsRight size={14}/> <span>Point to Point Limo Services</span></Link></li>
                            <li><Link className={`d-flex align-items-start gap-2 mb-2 text-white nav-link ${style.link}`} href={"#"}><ChevronsRight size={14}/> <span>Personal and Event Transportation</span></Link></li>
                            <li><Link className={`d-flex align-items-start gap-2 mb-2 text-white nav-link ${style.link}`} href={"#"}><ChevronsRight size={14}/> <span>Special Night Out</span></Link></li>
                            <li><Link className={`d-flex align-items-start gap-2 mb-2 text-white nav-link ${style.link}`} href={"#"}><ChevronsRight size={14}/> <span>Wine Tour</span></Link></li>
                            <li><Link className={`d-flex align-items-start gap-2 mb-2 text-white nav-link ${style.link}`} href={"#"}><ChevronsRight size={14}/> <span>Wedding Transportation Service</span></Link></li>
                            <li><Link className={`d-flex align-items-start gap-2 mb-2 text-white nav-link ${style.link}`} href={"#"}><ChevronsRight size={14}/> <span>Golf Package</span></Link></li>
                        </ul>
                    </div>

                    {/* Our Support */}
                    <div className="col-md-2">
                        <h5 className="fw-bold font-size-14 mb-3">Our Support</h5>
                        <ul className="list-unstyled">
                            <li><Link className={`d-flex align-items-start gap-2 mb-2 text-white nav-link ${style.link}`} href={"#"}><ChevronsRight size={14}/> <span>Rates</span></Link></li>
                            <li><Link className={`d-flex align-items-start gap-2 mb-2 text-white nav-link ${style.link}`} href={"#"}><ChevronsRight size={14}/> <span>Contact</span></Link></li>
                            <li><Link className={`d-flex align-items-start gap-2 mb-2 text-white nav-link ${style.link}`} href={"#"}><ChevronsRight size={14}/> <span>Get A Quote</span></Link></li>
                        </ul>
                    </div>

                    {/* Our Fleet */}
                    <div className="col-md-3">
                        <h5 className="fw-bold font-size-14 mb-3">Our Fleet</h5>
                        <ul className="list-unstyled">
                            <li><Link className={`d-flex align-items-start gap-2 mb-2 text-white nav-link ${style.link}`} href={"#"}><ChevronsRight size={14}/> <span>SUV</span></Link></li>
                            <li><Link className={`d-flex align-items-start gap-2 mb-2 text-white nav-link ${style.link}`} href={"#"}><ChevronsRight size={14}/> <span>Sedan</span></Link></li>
                            <li><Link className={`d-flex align-items-start gap-2 mb-2 text-white nav-link ${style.link}`} href={"#"}><ChevronsRight size={14}/> <span>Cab</span></Link></li>
                            <li><Link className={`d-flex align-items-start gap-2 mb-2 text-white nav-link ${style.link}`} href={"#"}><ChevronsRight size={14}/> <span>Denali</span></Link></li>
                            <li><Link className={`d-flex align-items-start gap-2 mb-2 text-white nav-link ${style.link}`} href={"#"}><ChevronsRight size={14}/> <span>Luxury Sedan Chrysler</span></Link></li>
                        </ul>
                    </div>
                </div>

            </div>
                {/* Footer Copyright */}
                <div className="text-center mt-4 py-2 bg-black">
                    <p className="text-light my-2">
                        Copyrights &copy; 2024 All Rights Reserved. by Frederick Sedan Service
                    </p>
                </div>
        </footer>
    );
}
