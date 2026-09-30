'use client'
import Image from "next/image";
import { DotIcon, FileText, Printer, X } from "lucide-react";
import { useSelector } from "react-redux";
import Rating from "./Rating";
import { useState } from "react";
import RatingModal from "./RatingModal";

const OrderItem = ({ order }) => {
    const currency = process.env.NEXT_PUBLIC_CURRENCY_SYMBOL || '$';
    const [ratingModal, setRatingModal] = useState(null);
    const [showInvoice, setShowInvoice] = useState(false);

    const { ratings } = useSelector(state => state.rating);

    const invoiceNumber = `INV-${order.id.slice(-8).toUpperCase()}`;

    return (
        <>
            <tr className="text-sm border-b border-slate-100 hover:bg-slate-50/50 transition">
                <td className="text-left py-4">
                    <div className="flex flex-col gap-5">
                        {order.orderItems.map((item, index) => (
                            <div key={index} className="flex items-center gap-4">
                                <div className="w-16 h-16 bg-slate-100/80 flex items-center justify-center rounded-xl p-2 shrink-0 border border-slate-200/60">
                                    <Image
                                        className="max-h-12 w-auto object-contain"
                                        src={item.product.images[0]}
                                        alt={item.product.name}
                                        width={50}
                                        height={50}
                                    />
                                </div>
                                <div className="flex flex-col justify-center text-sm">
                                    <p className="font-semibold text-slate-800 text-sm">{item.product.name}</p>
                                    <p className="text-xs text-slate-500 mt-0.5">{currency}{item.price} × {item.quantity} unit(s)</p>
                                    <p className="text-xs text-slate-400 mt-0.5">{new Date(order.createdAt).toLocaleDateString()}</p>
                                    <div className="mt-1">
                                        {ratings.find(rating => order.id === rating.orderId && item.product.id === rating.productId)
                                            ? <Rating value={ratings.find(rating => order.id === rating.orderId && item.product.id === rating.productId).rating} />
                                            : <button 
                                                onClick={() => setRatingModal({ orderId: order.id, productId: item.product.id })} 
                                                className={`text-xs text-indigo-600 hover:text-indigo-700 font-medium ${order.status !== "DELIVERED" && 'hidden'}`}
                                              >
                                                Rate Product
                                              </button>
                                        }
                                    </div>
                                    {ratingModal && <RatingModal ratingModal={ratingModal} setRatingModal={setRatingModal} />}
                                </div>
                            </div>
                        ))}
                    </div>
                </td>

                <td className="text-center font-bold text-slate-800 max-md:hidden">
                    {currency}{order.total}
                </td>

                <td className="text-left max-md:hidden text-xs text-slate-600">
                    <p className="font-medium text-slate-800">{order.address.name}</p>
                    <p>{order.address.street}, {order.address.city}</p>
                    <p>{order.address.state} {order.address.zip}, {order.address.country}</p>
                    <p className="text-slate-400 mt-0.5">{order.address.phone}</p>
                </td>

                <td className="text-center space-y-2 text-xs max-md:hidden">
                    <div
                        className={`inline-flex items-center justify-center gap-1 rounded-full px-3 py-1 font-medium ${
                            order.status.toLowerCase() === 'delivered'
                                ? 'text-emerald-700 bg-emerald-50 border border-emerald-200'
                                : order.status.toLowerCase() === 'processing'
                                    ? 'text-amber-700 bg-amber-50 border border-amber-200'
                                    : 'text-indigo-700 bg-indigo-50 border border-indigo-200'
                        }`}
                    >
                        <DotIcon size={16} className="-ml-1" />
                        {order.status.split('_').join(' ').toLowerCase()}
                    </div>

                    <div>
                        <button
                            onClick={() => setShowInvoice(true)}
                            className="inline-flex items-center gap-1 text-[11px] font-semibold text-slate-500 hover:text-indigo-600 hover:underline transition mt-1"
                        >
                            <FileText size={12} /> View Invoice
                        </button>
                    </div>
                </td>
            </tr>

            {/* Mobile Layout Row */}
            <tr className="md:hidden border-b border-slate-200">
                <td colSpan={5} className="pb-4">
                    <div className="flex items-center justify-between text-xs text-slate-600">
                        <span className="font-bold text-slate-900 text-sm">{currency}{order.total}</span>
                        <div className="flex items-center gap-3">
                            <span className="px-2.5 py-1 rounded-full text-[10px] font-semibold bg-emerald-100 text-emerald-800">
                                {order.status.replace(/_/g, ' ').toLowerCase()}
                            </span>
                            <button
                                onClick={() => setShowInvoice(true)}
                                className="text-indigo-600 font-medium inline-flex items-center gap-1"
                            >
                                <FileText size={12} /> Invoice
                            </button>
                        </div>
                    </div>
                </td>
            </tr>

            {/* Interactive Invoice Modal */}
            {showInvoice && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4">
                    <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative border border-slate-100 max-h-[90vh] overflow-y-auto">
                        <button
                            onClick={() => setShowInvoice(false)}
                            className="absolute top-5 right-5 p-1.5 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition"
                        >
                            <X size={18} />
                        </button>

                        <div className="flex items-center justify-between border-b border-slate-100 pb-5">
                            <div>
                                <h3 className="text-xl font-black text-slate-900 flex items-center gap-1.5">
                                    <span className="w-6 h-6 rounded-lg bg-indigo-600 text-white font-bold text-xs flex items-center justify-center">N</span>
                                    nexus<span className="text-indigo-600">mart</span>
                                </h3>
                                <p className="text-xs text-slate-400 mt-1">Official Purchase Invoice</p>
                            </div>
                            <div className="text-right">
                                <p className="text-xs font-bold text-slate-700">{invoiceNumber}</p>
                                <p className="text-[11px] text-slate-400">{new Date(order.createdAt).toLocaleDateString()}</p>
                            </div>
                        </div>

                        <div className="my-5 grid grid-cols-2 gap-4 text-xs">
                            <div>
                                <p className="font-semibold text-slate-700 uppercase tracking-wider text-[10px]">Billed To</p>
                                <p className="font-medium text-slate-800 mt-1">{order.address.name}</p>
                                <p className="text-slate-500">{order.address.street}</p>
                                <p className="text-slate-500">{order.address.city}, {order.address.state} {order.address.zip}</p>
                            </div>
                            <div className="text-right">
                                <p className="font-semibold text-slate-700 uppercase tracking-wider text-[10px]">Payment Details</p>
                                <p className="font-medium text-slate-800 mt-1">Method: {order.paymentMethod}</p>
                                <p className="text-slate-500">Status: {order.isPaid ? 'Paid' : 'Pending (COD)'}</p>
                            </div>
                        </div>

                        <div className="border border-slate-100 rounded-xl overflow-hidden my-4">
                            <table className="w-full text-xs">
                                <thead className="bg-slate-50 text-slate-500 font-semibold">
                                    <tr>
                                        <th className="text-left p-2.5">Item</th>
                                        <th className="text-center p-2.5">Qty</th>
                                        <th className="text-right p-2.5">Amount</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100">
                                    {order.orderItems.map((item, idx) => (
                                        <tr key={idx} className="text-slate-700">
                                            <td className="p-2.5 font-medium">{item.product.name}</td>
                                            <td className="p-2.5 text-center">{item.quantity}</td>
                                            <td className="p-2.5 text-right font-semibold">{currency}{(item.price * item.quantity).toFixed(2)}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        <div className="flex justify-between items-center pt-3 border-t border-slate-100 text-sm">
                            <span className="font-bold text-slate-800">Total Billed:</span>
                            <span className="font-black text-indigo-600 text-lg">{currency}{order.total.toFixed(2)}</span>
                        </div>

                        <div className="mt-6 flex gap-3">
                            <button
                                onClick={() => window.print()}
                                className="flex-1 inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-medium text-xs transition"
                            >
                                <Printer size={14} /> Print Receipt
                            </button>
                            <button
                                onClick={() => setShowInvoice(false)}
                                className="py-2.5 px-5 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 font-medium text-xs transition"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default OrderItem;