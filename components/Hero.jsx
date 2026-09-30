'use client'
import { assets } from '@/assets/assets'
import { ArrowRightIcon, ChevronRightIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import CategoriesMarquee from './CategoriesMarquee'

const Hero = () => {
    const currency = process.env.NEXT_PUBLIC_CURRENCY_SYMBOL || '$'

    return (
        <div className='mx-6'>
            <div className='flex max-xl:flex-col gap-8 max-w-7xl mx-auto my-10'>
                {/* Main Hero Card */}
                <div className='relative flex-1 flex flex-col bg-gradient-to-br from-indigo-100/80 via-slate-50 to-violet-100/70 border border-indigo-100/80 rounded-3xl xl:min-h-100 group overflow-hidden shadow-xs'>
                    <div className='p-6 sm:p-14 z-10'>
                        <div className='inline-flex items-center gap-3 bg-indigo-100 text-indigo-700 pr-4 p-1 rounded-full text-xs sm:text-sm font-medium'>
                            <span className='bg-indigo-600 px-3 py-1 rounded-full text-white text-xs font-semibold'>NEW</span>
                            Free Express Shipping on Orders Above $50! 
                            <ChevronRightIcon className='group-hover:ml-1 transition-all' size={16} />
                        </div>
                        <h2 className='text-3xl sm:text-5xl leading-[1.18] my-4 font-extrabold tracking-tight bg-gradient-to-r from-slate-900 via-indigo-950 to-indigo-600 bg-clip-text text-transparent max-w-xs sm:max-w-md'>
                            Next-gen tech gear for modern builders.
                        </h2>
                        <div className='text-slate-700 text-sm font-medium mt-3 sm:mt-6'>
                            <p className='text-xs uppercase tracking-wider text-slate-500 font-semibold'>Starting from</p>
                            <p className='text-3xl font-black text-slate-900 mt-0.5'>{currency}4.90</p>
                        </div>
                        <Link href="/shop" className='inline-block bg-slate-900 hover:bg-indigo-600 text-white text-xs font-semibold py-3.5 px-8 sm:py-4 sm:px-10 mt-6 sm:mt-8 rounded-full shadow-md hover:shadow-lg hover:scale-102 active:scale-95 transition-all'>
                            EXPLORE MARKETPLACE
                        </Link>
                    </div>
                    <Image 
                        className='sm:absolute bottom-0 right-0 md:right-8 w-full sm:max-w-sm object-contain pointer-events-none' 
                        src={assets.hero_model_img} 
                        alt="NexusMart showcase model" 
                        priority 
                    />
                </div>

                {/* Sub Promo Cards */}
                <div className='flex flex-col md:flex-row xl:flex-col gap-5 w-full xl:max-w-sm text-sm text-slate-600'>
                    <Link href="/shop" className='flex-1 flex items-center justify-between w-full bg-gradient-to-br from-amber-50 to-orange-100/70 border border-amber-200/60 rounded-3xl p-6 px-8 group hover:shadow-md transition-all'>
                        <div>
                            <p className='text-2xl font-bold text-slate-900'>Curated Picks</p>
                            <p className='text-xs text-slate-500 mt-1'>Hand-tested essentials</p>
                            <p className='flex items-center gap-1 mt-4 text-xs font-bold text-amber-700'>
                                View collection <ArrowRightIcon className='group-hover:ml-1.5 transition-all' size={14} />
                            </p>
                        </div>
                        <Image className='w-32 object-contain group-hover:scale-105 transition-transform' src={assets.hero_product_img1} alt="Product featured" />
                    </Link>

                    <Link href="/shop" className='flex-1 flex items-center justify-between w-full bg-gradient-to-br from-sky-50 to-indigo-100/70 border border-sky-200/60 rounded-3xl p-6 px-8 group hover:shadow-md transition-all'>
                        <div>
                            <p className='text-2xl font-bold text-slate-900'>Flash Deals</p>
                            <p className='text-xs text-slate-500 mt-1'>Up to 20% member savings</p>
                            <p className='flex items-center gap-1 mt-4 text-xs font-bold text-indigo-700'>
                                Unlock offers <ArrowRightIcon className='group-hover:ml-1.5 transition-all' size={14} />
                            </p>
                        </div>
                        <Image className='w-32 object-contain group-hover:scale-105 transition-transform' src={assets.hero_product_img2} alt="Product discount" />
                    </Link>
                </div>
            </div>
            <CategoriesMarquee />
        </div>
    )
}

export default Hero