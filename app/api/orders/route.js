import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { orderDummyData } from '@/assets/assets'

export async function GET(request) {
    try {
        const { searchParams } = new URL(request.url)
        const userId = searchParams.get('userId')

        let orders = []

        if (process.env.DATABASE_URL) {
            try {
                orders = await prisma.order.findMany({
                    where: userId ? { userId } : undefined,
                    include: {
                        orderItems: { include: { product: true } },
                        address: true,
                        store: true
                    },
                    orderBy: { createdAt: 'desc' }
                })
            } catch (err) {
                console.warn('[API/orders] Prisma query fallback:', err.message)
            }
        }

        if (!orders || orders.length === 0) {
            orders = [...orderDummyData]
            if (userId) {
                orders = orders.filter(o => o.userId === userId)
            }
        }

        return NextResponse.json({
            success: true,
            count: orders.length,
            data: orders
        })
    } catch (error) {
        return NextResponse.json(
            { success: false, error: error.message || 'Failed to fetch orders' },
            { status: 500 }
        )
    }
}

export async function POST(request) {
    try {
        const body = await request.json()
        const { items, total, address, paymentMethod = 'COD', couponCode } = body

        if (!items || !items.length || !total) {
            return NextResponse.json(
                { success: false, error: 'Invalid order payload. Missing items or total.' },
                { status: 400 }
            )
        }

        const newOrder = {
            id: `ord_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
            total: parseFloat(total),
            status: 'ORDER_PLACED',
            userId: 'user_current',
            storeId: 'cmemkb98v0001tat8r1hiyxhn',
            addressId: address?.id || 'addr_default',
            isPaid: paymentMethod === 'STRIPE',
            paymentMethod,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            isCouponUsed: !!couponCode,
            coupon: couponCode ? { code: couponCode } : {},
            orderItems: items.map(item => ({
                orderId: `ord_${Date.now()}`,
                productId: item.productId,
                quantity: item.quantity,
                price: item.price,
                product: item.product
            })),
            address: address || {
                street: '123 Tech Way',
                city: 'San Francisco',
                state: 'CA',
                zip: '94105',
                country: 'USA'
            }
        }

        return NextResponse.json({
            success: true,
            data: newOrder,
            message: 'Order placed successfully'
        }, { status: 201 })
    } catch (error) {
        return NextResponse.json(
            { success: false, error: error.message || 'Failed to process order' },
            { status: 500 }
        )
    }
}
