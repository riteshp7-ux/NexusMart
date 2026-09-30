'use client'
import { Heart, StarIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toggleWishlist } from '@/lib/features/wishlist/wishlistSlice'
import toast from 'react-hot-toast'

const ProductCard = ({ product }) => {
    const dispatch = useDispatch()
    const currency = process.env.NEXT_PUBLIC_CURRENCY_SYMBOL || '$'

    const wishlistItems = useSelector(state => state.wishlist?.items || [])
    const isWishlisted = wishlistItems.some(item => item.id === product.id)

    // calculate the average rating of the product
    const rating = product.rating?.length 
        ? Math.round(product.rating.reduce((acc, curr) => acc + curr.rating, 0) / product.rating.length) 
        : 5

    const handleWishlistToggle = (e) => {
        e.preventDefault()
        e.stopPropagation()
        dispatch(toggleWishlist(product))
        if (!isWishlisted) {
            toast.success(`Saved ${product.name} to wishlist`)
        } else {
            toast('Removed from wishlist', { icon: '🗑️' })
        }
    }

    return (
        <div className='relative group max-xl:mx-auto max-w-60'>
            {/* Wishlist Heart Button */}
            <button
                type="button"
                onClick={handleWishlistToggle}
                aria-label="Save to wishlist"
                className={`absolute top-2.5 right-2.5 z-10 p-2 rounded-full backdrop-blur-xs transition-all duration-200 ${
                    isWishlisted 
                        ? 'bg-rose-50 text-rose-500 shadow-sm scale-110' 
                        : 'bg-white/80 text-slate-400 hover:text-rose-500 hover:bg-white shadow-xs'
                }`}
            >
                <Heart size={16} fill={isWishlisted ? "currentColor" : "none"} />
            </button>

            <Link href={`/product/${product.id}`} className='block'>
                <div className='bg-[#F8FAFC] border border-slate-100 h-40 sm:w-60 sm:h-68 rounded-2xl flex items-center justify-center p-4 overflow-hidden group-hover:border-indigo-100 transition-colors'>
                    <Image 
                        width={500} 
                        height={500} 
                        className='max-h-30 sm:max-h-40 w-auto object-contain group-hover:scale-108 transition duration-300' 
                        src={product.images[0]} 
                        alt={product.name} 
                    />
                </div>
                <div className='flex justify-between items-start gap-3 text-sm text-slate-800 pt-3'>
                    <div className='flex-1 min-w-0'>
                        <p className='font-medium text-slate-800 truncate group-hover:text-indigo-600 transition-colors'>
                            {product.name}
                        </p>
                        <div className='flex items-center gap-0.5 mt-1'>
                            {Array(5).fill('').map((_, index) => (
                                <StarIcon 
                                    key={index} 
                                    size={13} 
                                    className='text-transparent' 
                                    fill={rating >= index + 1 ? "#F59E0B" : "#E2E8F0"} 
                                />
                            ))}
                            <span className='text-[11px] text-slate-400 ml-1.5 font-medium'>
                                ({product.rating?.length || 0})
                            </span>
                        </div>
                    </div>
                    <p className='font-bold text-slate-900 shrink-0'>{currency}{product.price}</p>
                </div>
            </Link>
        </div>
    )
}

export default ProductCard