'use client'
import { Heart, Search, ShoppingCart, User, LogOut, Package, Store, ChevronDown } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { openAuthModal, logout } from "@/lib/features/auth/authSlice";
import toast from "react-hot-toast";

const Navbar = () => {
    const router = useRouter();
    const dispatch = useDispatch();

    const [search, setSearch] = useState('');
    const [userMenuOpen, setUserMenuOpen] = useState(false);
    const userMenuRef = useRef(null);

    const cartCount = useSelector(state => state.cart.total);
    const wishlistCount = useSelector(state => state.wishlist?.items?.length || 0);
    const { user, isAuthenticated } = useSelector(state => state.auth);

    // Close menu when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
                setUserMenuOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleSearch = (e) => {
        e.preventDefault();
        if (search.trim()) {
            router.push(`/shop?search=${encodeURIComponent(search.trim())}`);
        }
    };

    const handleLogout = () => {
        dispatch(logout());
        setUserMenuOpen(false);
        toast.success('Signed out successfully');
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
                    <div className="hidden sm:flex items-center gap-4 lg:gap-7 text-slate-600 font-medium text-sm">
                        <Link href="/" className="hover:text-indigo-600 transition">Home</Link>
                        <Link href="/shop" className="hover:text-indigo-600 transition">Shop</Link>
                        <Link href="/create-store" className="hover:text-indigo-600 transition">Sell on Nexus</Link>
                        <Link href="/pricing" className="hover:text-indigo-600 transition">Pricing</Link>

                        {/* Search Bar */}
                        <form onSubmit={handleSearch} className="hidden xl:flex items-center w-64 text-sm gap-2 bg-slate-100/80 hover:bg-slate-100 focus-within:bg-white focus-within:ring-2 focus-within:ring-indigo-500/20 focus-within:border-indigo-400 px-4 py-2.5 rounded-full border border-slate-200/80 transition-all">
                            <Search size={16} className="text-slate-400" />
                            <input
                                className="w-full bg-transparent outline-none placeholder-slate-400 text-slate-700 text-xs"
                                type="text"
                                placeholder="Search products..."
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

                        {/* User Authentication Control */}
                        {isAuthenticated && user ? (
                            <div className="relative" ref={userMenuRef}>
                                <button
                                    onClick={() => setUserMenuOpen(prev => !prev)}
                                    className="flex items-center gap-2 py-1.5 px-3 rounded-full hover:bg-slate-100 transition border border-slate-200"
                                >
                                    <span className="w-7 h-7 rounded-full bg-indigo-600 text-white font-bold text-xs flex items-center justify-center">
                                        {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                                    </span>
                                    <span className="text-xs font-semibold text-slate-800 max-w-24 truncate">
                                        {user.name.split(' ')[0]}
                                    </span>
                                    <ChevronDown size={14} className="text-slate-400" />
                                </button>

                                {userMenuOpen && (
                                    <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-slate-100 py-2 z-50 animate-in fade-in zoom-in-95 duration-150">
                                        <div className="px-4 py-2 border-b border-slate-100">
                                            <p className="text-xs font-bold text-slate-800 truncate">{user.name}</p>
                                            <p className="text-[11px] text-slate-400 truncate">{user.email}</p>
                                        </div>

                                        <div className="py-1 text-xs">
                                            <Link
                                                href="/orders"
                                                onClick={() => setUserMenuOpen(false)}
                                                className="flex items-center gap-2.5 px-4 py-2 hover:bg-slate-50 text-slate-700 transition"
                                            >
                                                <Package size={15} className="text-indigo-600" /> My Orders
                                            </Link>
                                            <Link
                                                href="/wishlist"
                                                onClick={() => setUserMenuOpen(false)}
                                                className="flex items-center gap-2.5 px-4 py-2 hover:bg-slate-50 text-slate-700 transition"
                                            >
                                                <Heart size={15} className="text-rose-500" /> My Wishlist
                                            </Link>
                                            <Link
                                                href="/store"
                                                onClick={() => setUserMenuOpen(false)}
                                                className="flex items-center gap-2.5 px-4 py-2 hover:bg-slate-50 text-slate-700 transition"
                                            >
                                                <Store size={15} className="text-emerald-600" /> Vendor Dashboard
                                            </Link>
                                        </div>

                                        <div className="border-t border-slate-100 pt-1">
                                            <button
                                                onClick={handleLogout}
                                                className="w-full flex items-center gap-2.5 px-4 py-2 text-xs text-rose-600 hover:bg-rose-50 transition font-medium"
                                            >
                                                <LogOut size={15} /> Sign Out
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={() => dispatch(openAuthModal('signin'))}
                                    className="px-4 py-2 text-slate-700 hover:text-indigo-600 text-xs font-semibold transition"
                                >
                                    Sign In
                                </button>
                                <button
                                    onClick={() => dispatch(openAuthModal('signup'))}
                                    className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 active:scale-95 transition text-white font-semibold rounded-full shadow-xs text-xs"
                                >
                                    Sign Up
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Mobile Action Controls */}
                    <div className="flex sm:hidden items-center gap-3">
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

                        {isAuthenticated && user ? (
                            <button
                                onClick={handleLogout}
                                aria-label="Sign out"
                                className="w-8 h-8 rounded-full bg-indigo-600 text-white font-bold text-xs flex items-center justify-center"
                            >
                                {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                            </button>
                        ) : (
                            <button
                                onClick={() => dispatch(openAuthModal('signup'))}
                                className="px-3.5 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-xs font-semibold transition text-white rounded-full"
                            >
                                Sign Up
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;