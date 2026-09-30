import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { couponDummyData } from '@/assets/assets'

export async function GET() {
    try {
        let coupons = []

        if (process.env.DATABASE_URL) {
            try {
                coupons = await prisma.coupon.findMany({
                    where: { expiresAt: { gt: new Date() } }
                })
            } catch (err) {
                console.warn('[API/coupons] Prisma fallback:', err.message)
            }
        }

        if (!coupons || coupons.length === 0) {
            coupons = couponDummyData
        }

        return NextResponse.json({ success: true, data: coupons })
    } catch (error) {
        return NextResponse.json(
            { success: false, error: 'Failed to retrieve coupons' },
            { status: 500 }
        )
    }
}

export async function POST(request) {
    try {
        const { code, cartTotal = 0 } = await request.json()

        if (!code) {
            return NextResponse.json(
                { success: false, error: 'Coupon code is required' },
                { status: 400 }
            )
        }

        const coupon = couponDummyData.find(c => c.code.toUpperCase() === code.trim().toUpperCase())

        if (!coupon) {
            return NextResponse.json(
                { success: false, error: 'Invalid coupon code' },
                { status: 404 }
            )
        }

        const isExpired = new Date(coupon.expiresAt) < new Date()
        if (isExpired) {
            return NextResponse.json(
                { success: false, error: 'This coupon code has expired' },
                { status: 400 }
            )
        }

        const discountAmount = ((cartTotal * coupon.discount) / 100).toFixed(2)

        return NextResponse.json({
            success: true,
            coupon,
            discountPercent: coupon.discount,
            discountAmount: parseFloat(discountAmount),
            message: `Coupon ${coupon.code} applied: ${coupon.discount}% off!`
        })
    } catch (error) {
        return NextResponse.json(
            { success: false, error: 'Failed to validate coupon' },
            { status: 500 }
        )
    }
}
