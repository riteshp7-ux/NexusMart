'use client'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { X, Lock, Mail, User, ArrowRight, ShieldCheck } from 'lucide-react'
import { closeAuthModal, setAuthMode, setUser } from '@/lib/features/auth/authSlice'
import toast from 'react-hot-toast'

export default function AuthModal() {
    const dispatch = useDispatch()
    const { isAuthModalOpen, authMode } = useSelector(state => state.auth)

    const [loading, setLoading] = useState(false)
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    })

    if (!isAuthModalOpen) return null

    const handleChange = (e) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }

    const handleSwitchMode = (mode) => {
        dispatch(setAuthMode(mode))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (authMode === 'signup') {
            if (!formData.name.trim()) {
                toast.error('Please enter your full name')
                return
            }
            if (formData.password.length < 6) {
                toast.error('Password must be at least 6 characters')
                return
            }
            if (formData.password !== formData.confirmPassword) {
                toast.error('Passwords do not match')
                return
            }
        }

        setLoading(true)
        const endpoint = authMode === 'signup' ? '/api/auth/signup' : '/api/auth/signin'

        try {
            const res = await fetch(endpoint, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: formData.name,
                    email: formData.email,
                    password: formData.password
                })
            })

            const data = await res.json()

            if (!res.ok || !data.success) {
                throw new Error(data.error || 'Authentication failed')
            }

            dispatch(setUser(data.user))
            toast.success(data.message || (authMode === 'signup' ? 'Account created!' : 'Signed in!'))
            dispatch(closeAuthModal())
        } catch (err) {
            toast.error(err.message || 'Something went wrong')
        } finally {
            setLoading(false)
        }
    }

    const handleDemoLogin = (role) => {
        const demoUser = role === 'seller' ? {
            id: 'usr_nexus_seller_01',
            name: 'Alex Morgan (Merchant)',
            email: 'seller@nexusmart.io',
            image: '/assets/profile_pic1.jpg',
            role: 'merchant'
        } : {
            id: 'usr_demo_customer_01',
            name: 'Demo Customer',
            email: 'customer@nexusmart.io',
            image: '/assets/profile_pic2.jpg',
            role: 'customer'
        }

        dispatch(setUser(demoUser))
        toast.success(`Logged in as ${demoUser.name}`)
        dispatch(closeAuthModal())
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in duration-200">
            <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl relative border border-slate-100 max-h-[95vh] overflow-y-auto">
                {/* Close Button */}
                <button
                    onClick={() => dispatch(closeAuthModal())}
                    aria-label="Close modal"
                    className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition"
                >
                    <X size={18} />
                </button>

                {/* Brand Header */}
                <div className="text-center mb-6">
                    <div className="inline-flex items-center justify-center w-11 h-11 rounded-2xl bg-gradient-to-br from-indigo-600 to-violet-600 text-white font-black text-xl mb-3 shadow-sm">
                        N
                    </div>
                    <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
                        {authMode === 'signup' ? 'Create your account' : 'Welcome back'}
                    </h2>
                    <p className="text-xs text-slate-500 mt-1">
                        {authMode === 'signup'
                            ? 'Join NexusMart to shop, track orders, and save favorites'
                            : 'Sign in to access your orders, wishlist, and store'}
                    </p>
                </div>

                {/* Tabs */}
                <div className="grid grid-cols-2 p-1 bg-slate-100 rounded-xl mb-6 text-xs font-semibold">
                    <button
                        type="button"
                        onClick={() => handleSwitchMode('signup')}
                        className={`py-2 rounded-lg transition-all ${
                            authMode === 'signup'
                                ? 'bg-white text-slate-900 shadow-xs'
                                : 'text-slate-500 hover:text-slate-700'
                        }`}
                    >
                        Sign Up
                    </button>
                    <button
                        type="button"
                        onClick={() => handleSwitchMode('signin')}
                        className={`py-2 rounded-lg transition-all ${
                            authMode === 'signin'
                                ? 'bg-white text-slate-900 shadow-xs'
                                : 'text-slate-500 hover:text-slate-700'
                        }`}
                    >
                        Sign In
                    </button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-3.5">
                    {authMode === 'signup' && (
                        <div>
                            <label className="block text-xs font-semibold text-slate-700 mb-1">Full Name</label>
                            <div className="relative flex items-center">
                                <User size={16} className="absolute left-3.5 text-slate-400" />
                                <input
                                    name="name"
                                    type="text"
                                    required
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="e.g. Alex Morgan"
                                    className="w-full pl-10 pr-4 py-2.5 text-xs text-slate-800 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:bg-white focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100 transition"
                                />
                            </div>
                        </div>
                    )}

                    <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">Email Address</label>
                        <div className="relative flex items-center">
                            <Mail size={16} className="absolute left-3.5 text-slate-400" />
                            <input
                                name="email"
                                type="email"
                                required
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="name@example.com"
                                className="w-full pl-10 pr-4 py-2.5 text-xs text-slate-800 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:bg-white focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100 transition"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">Password</label>
                        <div className="relative flex items-center">
                            <Lock size={16} className="absolute left-3.5 text-slate-400" />
                            <input
                                name="password"
                                type="password"
                                required
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="At least 6 characters"
                                className="w-full pl-10 pr-4 py-2.5 text-xs text-slate-800 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:bg-white focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100 transition"
                            />
                        </div>
                    </div>

                    {authMode === 'signup' && (
                        <div>
                            <label className="block text-xs font-semibold text-slate-700 mb-1">Confirm Password</label>
                            <div className="relative flex items-center">
                                <Lock size={16} className="absolute left-3.5 text-slate-400" />
                                <input
                                    name="confirmPassword"
                                    type="password"
                                    required
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    placeholder="Repeat your password"
                                    className="w-full pl-10 pr-4 py-2.5 text-xs text-slate-800 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:bg-white focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100 transition"
                                />
                            </div>
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-3 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 active:scale-98 text-white font-semibold text-xs transition shadow-sm flex items-center justify-center gap-2 mt-4 disabled:opacity-60"
                    >
                        {loading ? 'Please wait...' : authMode === 'signup' ? 'Create Free Account' : 'Sign In'}
                        {!loading && <ArrowRight size={14} />}
                    </button>
                </form>

                {/* Demo Quick Logins */}
                <div className="mt-6 pt-5 border-t border-slate-100">
                    <p className="text-[11px] font-semibold text-slate-400 text-center uppercase tracking-wider mb-2.5">
                        Or explore with 1-click demo accounts
                    </p>
                    <div className="grid grid-cols-2 gap-2">
                        <button
                            type="button"
                            onClick={() => handleDemoLogin('customer')}
                            className="py-2 px-3 rounded-xl border border-slate-200 hover:border-indigo-300 hover:bg-indigo-50/50 text-slate-700 text-xs font-medium transition flex items-center justify-center gap-1.5"
                        >
                            <User size={13} className="text-indigo-600" /> Demo Buyer
                        </button>
                        <button
                            type="button"
                            onClick={() => handleDemoLogin('seller')}
                            className="py-2 px-3 rounded-xl border border-slate-200 hover:border-indigo-300 hover:bg-indigo-50/50 text-slate-700 text-xs font-medium transition flex items-center justify-center gap-1.5"
                        >
                            <ShieldCheck size={13} className="text-indigo-600" /> Demo Merchant
                        </button>
                    </div>
                </div>

                {/* Footer Switch */}
                <p className="text-center text-xs text-slate-500 mt-5">
                    {authMode === 'signup' ? (
                        <>
                            Already have an account?{' '}
                            <button
                                type="button"
                                onClick={() => handleSwitchMode('signin')}
                                className="font-semibold text-indigo-600 hover:underline"
                            >
                                Sign In
                            </button>
                        </>
                    ) : (
                        <>
                            Don't have an account?{' '}
                            <button
                                type="button"
                                onClick={() => handleSwitchMode('signup')}
                                className="font-semibold text-indigo-600 hover:underline"
                            >
                                Sign Up
                            </button>
                        </>
                    )}
                </p>
            </div>
        </div>
    )
}
