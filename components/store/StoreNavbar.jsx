'use client'
import Link from "next/link"

const StoreNavbar = () => {


    return (
        <div className="flex items-center justify-between px-12 py-3 border-b border-slate-200 transition-all">
            <Link href="/" className="relative text-3xl font-bold tracking-tight text-slate-800 flex items-center gap-1.5">
                <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-indigo-600 text-white font-black text-lg">N</span>
                <span>nexus<span className="text-indigo-600">mart</span></span>
                <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full text-white bg-indigo-600 ml-2">
                    Vendor
                </span>
            </Link>
            <div className="flex items-center gap-3">
                <p>Hi, Seller</p>
            </div>
        </div>
    )
}

export default StoreNavbar