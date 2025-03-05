"use client";

import Link from "next/link";
import './tabs.css';

export default function Tabs({text, active, link}) {
    return (
        <div className="tabdiv">
            <Link href={link} className={active ? "btn tab active" : "btn tab"}>{text}</Link>
        </div>
    );
}