'use client'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Link from 'next/link'
import Image from 'next/image'
import { Heart, ShoppingBag, Trash2, ArrowRight } from 'lucide-react'
import { removeFromWishlist, clearWishlist } from '@/lib/features/wishlist/wishlistSlice'
import { addToCart } from '@/lib/features/cart/cartSlice'
import toast from 'react-hot-toast'

export default function WishlistPage() {
    const dispatch = useDispatch()
    const currency = process.env.NEXT_PUBLIC_CURRENCY_SYMBOL || '$'
    const wishlistItems = useSelector(state => state.wishlist?.items || [])

    const handleMoveToCart = (product) => {
        dispatch(addToCart({ productId: product.id }))
        dispatch(removeFromWishlist(product.id))
        toast.success(`Moved ${product.name} to cart!`)
    }

    const handleRemove = (product) => {
        dispatch(removeFromWishlist(product.id))
        toast('Removed from wishlist', { icon: '🗑️' })
    }

    return (
        <div className="max-w-7xl mx-auto px-6 py-12 min-h-[70vh]">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-slate-200 gap-4">
                <div>
                    <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 flex items-center gap-3">
                        <Heart className="text-rose-500 fill-rose-500" size={28} />
                        Your Wishlist
                    </h1>
                    <p className="text-sm text-slate-500 mt-1">
                        {wishlistItems.length} {wishlistItems.length === 1 ? 'item' : 'items'} saved for later
                    </p>
                </div>
                {wishlistItems.length > 0 && (
                    <button
                        onClick={() => {
                            dispatch(clearWishlist())
                            toast.success('Wishlist cleared')
                        }}
                        className="text-xs font-semibold text-slate-500 hover:text-rose-600 transition flex items-center gap-1.5 self-start sm:self-auto"
                    >
                        <Trash2 size={14} /> Clear all items
                    </button>
                )}
            </div>

            {wishlistItems.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-24 text-center">
                    <div className="w-20 h-20 rounded-full bg-rose-50 flex items-center justify-center text-rose-500 mb-5">
                        <Heart size={36} />
                    </div>
                    <h2 className="text-xl font-bold text-slate-800">Your wishlist is currently empty</h2>
                    <p className="text-sm text-slate-500 max-w-sm mt-2 mb-8">
                        Explore our marketplace catalog and click the heart icon on any product to save it here for later.
                    </p>
                    <Link
                        href="/shop"
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium text-sm transition shadow-sm"
                    >
                        Explore Marketplace <ArrowRight size={16} />
                    </Link>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-8">
                    {wishlistItems.map((product) => (
                        <div
                            key={product.id}
                            className="bg-white border border-slate-200 rounded-2xl p-4 flex flex-col justify-between hover:shadow-md transition-shadow group"
                        >
                            <div>
                                <div className="relative bg-slate-50 rounded-xl h-48 flex items-center justify-center p-4 overflow-hidden">
                                    <Image
                                        src={product.images[0]}
                                        alt={product.name}
                                        width={200}
                                        height={200}
                                        className="max-h-40 w-auto object-contain group-hover:scale-105 transition-transform"
                                    />
                                    <button
                                        onClick={() => handleRemove(product)}
                                        aria-label="Remove from wishlist"
                                        className="absolute top-2 right-2 p-1.5 rounded-full bg-white/80 hover:bg-rose-50 text-slate-400 hover:text-rose-500 transition shadow-xs"
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                                <div className="mt-4">
                                    <p className="text-xs uppercase tracking-wider text-slate-400 font-semibold">
                                        {product.category}
                                    </p>
                                    <Link href={`/product/${product.id}`} className="hover:text-indigo-600 transition">
                                        <h3 className="font-semibold text-slate-800 text-base mt-1 line-clamp-1">
                                            {product.name}
                                        </h3>
                                    </Link>
                                    <div className="flex items-baseline gap-2 mt-2">
                                        <span className="text-lg font-bold text-slate-900">
                                            {currency}{product.price}
                                        </span>
                                        {product.mrp && product.mrp > product.price && (
                                            <span className="text-xs line-through text-slate-400">
                                                {currency}{product.mrp}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-2">
                                <button
                                    onClick={() => handleMoveToCart(product)}
                                    className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white font-medium text-xs transition"
                                >
                                    <ShoppingBag size={14} /> Move to Cart
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}
