'use client'
import { Heart, Search, ShoppingCart } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useSelector } from "react-redux";

const Navbar = () => {
    const router = useRouter();
    const [search, setSearch] = useState('');
    const cartCount = useSelector(state => state.cart.total);
    const wishlistCount = useSelector(state => state.wishlist?.items?.length || 0);

    const handleSearch = (e) => {
        e.preventDefault();
        if (search.trim()) {
            router.push(`/shop?search=${encodeURIComponent(search.trim())}`);
        }
    };

    return (
        <nav className="relative bg-white sticky top-0 z-40 border-b border-slate-100 shadow-xs">
            <div className="mx-6">
                <div className="flex items-center justify-between max-w-7xl mx-auto py-3.5 transition-all">

                    {/* Brand Logo */}
                    <Link href="/" className="relative text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 flex items-center gap-2 group">
                        <span className="flex items-center justify-center w-8 h-8 rounded-xl bg-gradient-to-br from-indigo-600 to-violet-600 text-white font-black text-lg shadow-sm group-hover:scale-105 transition-transform">
                            N
                        </span>
                        <span className="font-extrabold text-slate-800">
                            nexus<span className="text-indigo-600">mart</span>
                        </span>
                        <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full text-indigo-700 bg-indigo-50 border border-indigo-200 hidden md:inline-block">
                            PRO
                        </span>
                    </Link>

                    {/* Desktop Menu */}
                    <div className="hidden sm:flex items-center gap-4 lg:gap-8 text-slate-600 font-medium text-sm">
                        <Link href="/" className="hover:text-indigo-600 transition">Home</Link>
                        <Link href="/shop" className="hover:text-indigo-600 transition">Shop</Link>
                        <Link href="/create-store" className="hover:text-indigo-600 transition">Sell on Nexus</Link>
                        <Link href="/pricing" className="hover:text-indigo-600 transition">Pricing</Link>

                        {/* Search Bar */}
                        <form onSubmit={handleSearch} className="hidden xl:flex items-center w-72 text-sm gap-2 bg-slate-100/80 hover:bg-slate-100 focus-within:bg-white focus-within:ring-2 focus-within:ring-indigo-500/20 focus-within:border-indigo-400 px-4 py-2.5 rounded-full border border-slate-200/80 transition-all">
                            <Search size={16} className="text-slate-400" />
                            <input
                                className="w-full bg-transparent outline-none placeholder-slate-400 text-slate-700 text-xs"
                                type="text"
                                placeholder="Search products, brands..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                        </form>

                        {/* Wishlist Link */}
                        <Link href="/wishlist" className="relative flex items-center gap-1.5 text-slate-600 hover:text-indigo-600 transition">
                            <Heart size={18} />
                            <span>Saved</span>
                            {wishlistCount > 0 && (
                                <span className="text-[10px] font-bold text-white bg-rose-500 px-1.5 py-0.2 rounded-full min-w-4 text-center">
                                    {wishlistCount}
                                </span>
                            )}
                        </Link>

                        {/* Cart Link */}
                        <Link href="/cart" className="relative flex items-center gap-1.5 text-slate-600 hover:text-indigo-600 transition">
                            <ShoppingCart size={18} />
                            <span>Cart</span>
                            {cartCount > 0 && (
                                <span className="text-[10px] font-bold text-white bg-indigo-600 px-1.5 py-0.2 rounded-full min-w-4 text-center">
                                    {cartCount}
                                </span>
                            )}
                        </Link>

                        <button className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 active:scale-95 transition text-white font-medium rounded-full shadow-xs text-xs">
                            Sign In
                        </button>
                    </div>

                    {/* Mobile Action Controls */}
                    <div className="flex sm:hidden items-center gap-4">
                        <Link href="/wishlist" className="relative text-slate-600 p-1">
                            <Heart size={20} />
                            {wishlistCount > 0 && (
                                <span className="absolute -top-1 -right-1.5 text-[9px] font-bold text-white bg-rose-500 w-4 h-4 rounded-full flex items-center justify-center">
                                    {wishlistCount}
                                </span>
                            )}
                        </Link>
                        <Link href="/cart" className="relative text-slate-600 p-1">
                            <ShoppingCart size={20} />
                            {cartCount > 0 && (
                                <span className="absolute -top-1 -right-1.5 text-[9px] font-bold text-white bg-indigo-600 w-4 h-4 rounded-full flex items-center justify-center">
                                    {cartCount}
                                </span>
                            )}
                        </Link>
                        <button className="px-4 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-xs font-medium transition text-white rounded-full">
                            Sign In
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;