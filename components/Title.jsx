'use client'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const Title = ({ title, description, visibleButton = true, href = '' }) => {

    return (
        <div className='flex flex-col items-center'>
            <h2 className='text-2xl font-semibold text-slate-800'>{title}</h2>
            <Link href={href} className='flex items-center gap-5 text-sm text-slate-600 mt-2'>
                <p className='max-w-lg text-center'>{description}</p>
                {visibleButton && <button className='text-indigo-600 hover:text-indigo-700 font-medium flex items-center gap-1 transition'>View more <ArrowRight size={14} /></button>}
            </Link>
        </div>
    )
}

export default Title